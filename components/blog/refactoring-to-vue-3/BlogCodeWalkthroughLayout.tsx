import React, { useEffect, useMemo, useRef, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  MiniEditorWithState,
  StatefulEditorProps,
} from "@code-hike/mini-editor";
import "@code-hike/mini-editor/dist/index.css";
import { InView } from "react-intersection-observer";
import Layout from "../../Layout";
import Container from "../../Container";
import { components } from "../../BlogPostLayout";
import { useMediaQuery } from "react-responsive";
import { article } from "../../../styles/article.css";

export default function BlogCodeWalkthrough({ children, metadata }) {
  const steps = useMemo(() => divideIntoSteps(children).map(parseStep), [
    children,
  ]);
  const {
    isInPresentationMode,
    fullscreenElementRef,
    currentSlide,
  } = usePresentationMode(steps);

  // todo add resize handlers I guess
  const isMobile = useMediaQuery({
    query: "(max-width: 1200px), (max-height: 500px)",
  });

  // a simple "onMounted" hook to always use a SSR version first, but
  // then immediately re-render to adapt to user's browser
  // this is good practice for SEO and for progressive enhancement
  const [isSSRVersion, setIsSSRVersion] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsSSRVersion(false);
  }, []);

  return (
    <Layout {...metadata}>
      <div ref={fullscreenElementRef} style={{ backgroundColor: "var(--bg)" }}>
        <MDXProvider components={components}>
          {isInPresentationMode ? ( // Only one step at a time in presentation mode
            <PresentationModeStep currentStep={currentSlide} steps={steps} />
          ) : (
            steps.map((_, i) =>
              isMobile || isSSRVersion ? ( // All basic steps for mobile
                <BasicStep currentStep={i} steps={steps} key={i} />
              ) : (
                <DesktopStep currentStep={i} steps={steps} key={i} />
              )
            )
          )}
        </MDXProvider>
      </div>

      <style jsx global>{`
        /* quick fix for MiniEditor */
        .ch-editor-body {
          background-color: var(--code-bg);
        }
        .ch-editor-body code {
          padding: 0;
        }
        .ch-editor-tab {
          background-color: transparent;
          cursor: initial;
        }
      `}</style>
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
  steps: ReturnType<typeof parseStep>[];
  isInPresentationMode?: boolean;
}

const BasicStep: React.FC<StepProps> = ({ currentStep, steps }) => {
  const { originalChildren } = steps[currentStep];

  return (
    <Container style={{ maxWidth: "100%" }}>
      <div className={article}>
        {originalChildren.map((child, i) => {
          if (child.props.mdxType === "pre") {
            return <MiniEditorWithState {...getEditorProps(child)} key={i} />;
          } else return <div key={i}>{child}</div>;
        })}
      </div>
    </Container>
  );
};

const PresentationModeStep: React.FC<StepProps> = ({ currentStep, steps }) => {
  const { restOfChildren, codeBlock, image } = steps[currentStep];
  const miniEditorProps: StatefulEditorProps = useMemo(
    () => (codeBlock ? getEditorProps(codeBlock) : null),
    [codeBlock]
  );

  return (
    <Container style={{ maxWidth: "100%" }}>
      <div
        className={article}
        style={{
          display: "grid",
          gridTemplateColumns: codeBlock || image ? "1fr 1fr" : "100%",
          gap: "2rem",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          padding: "3rem",
          backgroundColor: "var(--bg)",
          alignItems: "center",
          justifyContent: "center",
        }}
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
            <div>{restOfChildren}</div>
            {image}
          </>
        )}
      </div>
    </Container>
  );
};

const DesktopStep: React.FC<StepProps> = ({ currentStep, steps }) => {
  // for the desktop version
  const [inViewStep, setInViewStep] = useState(0);
  const [inViewSubstep, setInViewSubstep] = useState(0);
  const isFirstStepWithCode = useMemo(
    () => steps[currentStep - 1] && !steps[currentStep - 1]?.codeBlock,
    [steps, currentStep]
  );
  const isOnlyStepWithCode = useMemo(
    () =>
      isFirstStepWithCode &&
      steps[currentStep + 1] &&
      !steps[currentStep + 1]?.codeBlock,
    [isFirstStepWithCode, steps, currentStep]
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

  // The desktop layout can just be a simple layout for steps
  // that have no codeblock or that are the only ones with code
  // of their kind
  const { codeBlock } = steps[currentStep];
  if (!codeBlock || isOnlyStepWithCode) {
    return <BasicStep currentStep={currentStep} steps={steps} />;
  }

  // desktop version aggregates all steps with code and paints them
  // at once, which makes possible the sticky mini editor.
  if (!isFirstStepWithCode) {
    return null;
  }

  return (
    <InView
      as="div"
      onChange={(inView) => inView && setInViewStep(currentStep)}
    >
      <Container
        className={article}
        style={{
          width: "100%",
          maxWidth: "80rem",
          margin: "2rem auto",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {subSteps.map(({ codeBlock, restOfChildren }, i) => {
          return (
            <div
              key={`${currentStep}-${i}`}
              style={{
                position: "relative",
                minHeight:
                  subSteps[i + 1] !== undefined
                    ? "100vh"
                    : subStepsEditorProps[i].style.height,
                display: "flex",
                ...(subSteps[i + 1] !== undefined
                  ? {
                      minHeight: "100vh",
                      alignItems: "center",
                    }
                  : {
                      minHeight: subStepsEditorProps[i].style.height,
                    }),
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
              <div>{restOfChildren}</div>
            </div>
          );
        })}

        <div
          style={{
            position: "relative",
            gridColumnStart: 2,
            gridRowStart: 1,
            gridRowEnd: subSteps.length + 1,
          }}
        >
          <div
            style={{
              position: "sticky",
              top: "1rem",
              height: "calc(100vh - 3rem)",
              overflowY: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MiniEditorWithState
              {...(inViewStep === currentStep
                ? subStepsEditorProps[inViewSubstep]
                : {})}
              style={
                inViewStep === currentStep
                  ? {
                      ...subStepsEditorProps[inViewSubstep]?.style,
                      minHeight:
                        subStepsEditorProps[inViewSubstep - 1]?.style.height,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </Container>
    </InView>
  );
};

interface StepWithExtractedCodeBlock {
  originalChildren: React.ReactElement[];
  restOfChildren: React.ReactElement[];
  codeBlock?: React.ReactElement;
  image?: React.ReactElement;
}

function parseStep(children: React.ReactElement[]): StepWithExtractedCodeBlock {
  const c = React.Children.toArray(children);

  let result: StepWithExtractedCodeBlock = {
    originalChildren: [],
    restOfChildren: [],
    codeBlock: null,
    image: null,
  };

  c.forEach((child: React.ReactElement) => {
    result.originalChildren.push(child);
    if (child.props.mdxType === "pre" && !result.codeBlock) {
      result.codeBlock = child;
    } else if (child.props.mdxType === "img" && !result.image) {
      result.image = child;
    } else result.restOfChildren.push(child);
  });

  return result;
}

function getEditorProps(codeBlock: React.ReactElement): StatefulEditorProps {
  const metastring = codeBlock.props.children.props.metastring;

  const metastringNumbers = metastring
    ?.match(/(\d+)/g)
    .map(Number)
    .sort((a: number, b: number) => a > b);
  const linesCount = metastringNumbers?.length
    ? metastringNumbers[metastringNumbers.length - 1] - metastringNumbers[0] + 3
    : codeBlock.props.children.props.children.split("\n").length;

  return {
    file: "",
    code: codeBlock.props.children.props.children,
    focus: metastring?.replace(/([^\d:,]*)/g, "") || undefined,
    lang: codeBlock.props.children.props.className.replace(
      /^language-(\w+).*/,
      "$1"
    ),
    style: {
      height: Math.max(7, linesCount * 1.5) + "rem",
      maxHeight: "90vh",
      width: "100%",
    },
  };
}

const usePresentationMode = (steps: StepWithExtractedCodeBlock[]) => {
  const [isInPresentationMode, setPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fullscreenElementRef = useRef(null);

  const enter = () => {
    setPresentationMode(true);
    fullscreenElementRef.current?.requestFullscreen();
  };

  const leave = () => {
    setPresentationMode(false);
    setCurrentSlide(0);

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const nextSlide = () => {
    if (currentSlide + 1 === steps.length) {
      leave();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyEvent = (event: KeyboardEvent) => {
    if (event.ctrlKey && (event.keyCode == 80 || event.key === "p")) {
      event.preventDefault();

      enter();

      return false;
    }

    if (event.keyCode === 27 || event.key === "Esc" || event.key === "Escape") {
      leave();
    }

    if (
      event.keyCode === 39 ||
      event.key === "ArrowRight" ||
      event.key === "Right"
    ) {
      nextSlide();
    }

    if (
      event.keyCode === 37 ||
      event.key === "ArrowLeft" ||
      event.key === "Left"
    ) {
      prevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [currentSlide, steps]);

  return {
    isInPresentationMode,
    fullscreenElementRef,
    enter,
    leave,
    currentSlide,
  };
};
