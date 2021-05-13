import React, { useEffect, useMemo, useRef, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  MiniEditorWithState,
  StatefulEditorProps,
} from "@code-hike/mini-editor";
import { InView } from "react-intersection-observer";
import Layout from "./Layout";
import Container from "./Container";
import dynamic from "next/dynamic";
import blogPostStyles from "../styles/BlogPostLayout.module.css";

const components = {};

export default function BlogCodeWalkthrough({ children }) {
  const steps = useMemo(
    () => divideIntoSteps(children).map(extractCodeBlock),
    [children]
  );
  const [isInPresentationMode, setPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key == "p") {
        event.preventDefault();

        if (!isInPresentationMode) {
          rootRef.current?.requestFullscreen();

          // Some global fixes to make presentation mode look better. (TODO: make it revertable)
          const $metaViewport = document.querySelector("meta[name='viewport']");
          $metaViewport.setAttribute("content", "width=600");
          if (window.innerWidth > 1000) {
            document.documentElement.style.fontSize = "18px";
          }
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
          window.location.reload();
        }
        setPresentationMode(!isInPresentationMode);
      }

      if (event.key == "ArrowRight" || event.key == "Right") {
        if (currentSlide + 1 == steps.length) {
          setPresentationMode(false);
          setCurrentSlide(0);

          if (document.fullscreenElement) {
            document.exitFullscreen();
            window.location.reload();
          }
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }

      if (
        (event.key == "ArrowLeft" || event.key == "Left") &&
        currentSlide - 1 !== -1
      ) {
        setCurrentSlide(currentSlide - 1);
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isInPresentationMode, currentSlide, steps]);

  return (
    <Layout>
      <div ref={rootRef} style={{ backgroundColor: "var(--bg)" }}>
        <MDXProvider components={components}>
          {!isInPresentationMode ? (
            steps.map((step, i) => {
              return <Step currentStep={i} steps={steps} key={i} />;
            })
          ) : (
            <Step
              currentStep={currentSlide}
              steps={steps}
              isInPresentationMode={true}
            />
          )}
        </MDXProvider>
      </div>
    </Layout>
  );
}

/**
 * Divides a series of mdx children in steps,
 * each step being determined by an <hr/> (or three dashes in markdown ---)
 * that acts as a separator.
 */
function divideIntoSteps(
  children: React.ReactChildren
): React.ReactElement[][] {
  const c = React.Children.toArray(children);

  let currentStep = 0;

  let result = [];

  c.forEach((child: React.ReactElement) => {
    if (child.props.mdxType === "hr") {
      currentStep++;
      return;
    }

    (result[currentStep] = result[currentStep] || []).push(child);
  });

  return result;
}

interface StepProps {
  currentStep: number;
  steps: ReturnType<typeof extractCodeBlock>[];
  isInPresentationMode?: bool;
}

const Step = dynamic(
  Promise.resolve(({ currentStep, steps, isInPresentationMode }: StepProps) => {
    const { restOfChildren, codeBlock } = steps[currentStep];

    const getEditorProps = (
      codeBlock: React.ReactElement
    ): StatefulEditorProps => {
      return {
        file: "Example.vue",
        code: codeBlock.props.children.props.children,
        focus:
          codeBlock.props.children.props.metastring?.replace(
            /([^\d:,]*)/g,
            ""
          ) || undefined,
        lang: codeBlock.props.children.props.className.replace(
          /^language-(\w+).*/,
          "$1"
        ),
        style: {
          height:
            Math.max(
              7,
              codeBlock.props.children.props.children.split("\n").length * 1.5
            ) + "rem",
        },
      };
    };

    const miniEditorProps: StatefulEditorProps = useMemo(
      () => (codeBlock ? getEditorProps(codeBlock) : null),
      [codeBlock]
    );

    // for the desktop version
    const [inViewStep, setInViewStep] = useState(0);
    const [inViewSubstep, setInViewSubstep] = useState(0);
    const isFirstStepWithCode = useMemo(
      () => steps[currentStep - 1] && !steps[currentStep - 1]?.codeBlock,
      [steps, currentStep]
    );
    const subSteps = useMemo(() => {
      let result = [];

      let i = currentStep;
      while (steps[i] && steps[i].codeBlock) {
        result.push(steps[i]);
        i++;
      }
      return result;
    }, [steps, currentStep]);
    const subStepsEditorProps = useMemo(() => {
      return subSteps.map(({ codeBlock }) => getEditorProps(codeBlock));
    }, [subSteps]);

    // mobile version, no codeblock version & presentation mode: show every step one at a time
    if (isInPresentationMode || !codeBlock || window.innerWidth < 1200) {
      return (
        <Container
          className={blogPostStyles["Post-article"]}
          style={
            isInPresentationMode
              ? {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  padding: "4rem",
                  backgroundColor: "var(--bg)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4rem",
                }
              : {}
          }
        >
          {codeBlock ? (
            <>
              <div>{restOfChildren}</div>
              <div
                style={{
                  position: "relative",
                }}
              >
                <MiniEditorWithState {...miniEditorProps} />
              </div>
            </>
          ) : (
            <>
              <div>{extractImage(restOfChildren).restOfChildren}</div>
              {extractImage(restOfChildren).image}
            </>
          )}
        </Container>
      );
    }

    // desktop version: show every step together with a sticky editor on the left,
    // until theres a step without code

    if (!isFirstStepWithCode) return null;

    return (
      <InView
        as="div"
        onChange={(inView) => inView && setInViewStep(currentStep)}
      >
        <Container
          className={blogPostStyles["Post-article"]}
          style={{
            width: "100%",
            maxWidth: "80rem",
            margin: "2rem auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {subSteps.map(({ codeBlock, restOfChildren }, i) => {
            return (
              <div
                key={`${currentStep}-${i}`}
                className={blogPostStyles["Post-article"]}
                style={{
                  position: "relative",
                  minHeight:
                    subSteps[i + 1] !== undefined
                      ? "100vh"
                      : subStepsEditorProps[i].style.height,
                }}
              >
                <InView
                  as="div"
                  onChange={(inView) => inView && setInViewSubstep(i)}
                  threshold={1}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "-1rem",
                    gridColumnStart: 1,
                    height: "50%",
                    maxHeight: "80vh",
                    width: "2px",
                  }}
                  children={<span />}
                />
                {restOfChildren}
              </div>
            );
          })}

          <div
            style={{
              padding: "1rem 2rem",
              position: "relative",
              gridColumnStart: 2,
              gridRowStart: 1,
              gridRowEnd: subSteps.length + 1,
            }}
          >
            <MiniEditorWithState
              {...(inViewStep === currentStep
                ? subStepsEditorProps[inViewSubstep]
                : miniEditorProps)}
              style={{
                ...(inViewStep === currentStep
                  ? subStepsEditorProps[inViewSubstep]
                  : miniEditorProps
                ).style,
                position: subSteps.length > 1 ? "sticky" : "static",
                top: `calc(50% - calc(${subStepsEditorProps[inViewSubstep].style.height} / 2))`,
                maxHeight: "calc(100vh - 4rem)",
                overflowY: "auto",
                transition: "top .5s",
              }}
            />
          </div>
        </Container>
      </InView>
    );
  }),
  { ssr: false }
);

interface StepWithExtractedCodeBlock {
  restOfChildren: React.ReactElement[];
  codeBlock: React.ReactElement;
}

function extractCodeBlock(
  children: React.ReactElement[]
): StepWithExtractedCodeBlock {
  const c = React.Children.toArray(children);

  let result: StepWithExtractedCodeBlock = {
    restOfChildren: [],
    codeBlock: null,
  };

  c.forEach((child: React.ReactElement) => {
    if (child.props.mdxType === "pre") {
      result.codeBlock = child;
    } else result.restOfChildren.push(child);
  });

  return result;
}

interface StepWithExtractedImage {
  restOfChildren: React.ReactElement[];
  image: React.ReactElement;
}

function extractImage(children: React.ReactElement[]) {
  const c = React.Children.toArray(children);

  let result: StepWithExtractedImage = {
    restOfChildren: [],
    image: null,
  };

  c.forEach((child: React.ReactElement) => {
    if (child.props.mdxType === "img") {
      result.image = child;
    } else result.restOfChildren.push(child);
  });

  return result;
}
