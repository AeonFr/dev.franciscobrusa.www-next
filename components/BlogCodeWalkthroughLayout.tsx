import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  MiniEditorWithState,
  StatefulEditorProps,
} from "@code-hike/mini-editor";
import { InView } from "react-intersection-observer";
import Layout from "./Layout";
import Container from "./Container";
import dynamic from "next/dynamic";

const components = {};

export default function BlogCodeWalkthrough({ children }) {
  const steps = divideIntoSteps(children).map(extractCodeBlock);

  return (
    <Layout>
      <div>
        <MDXProvider components={components}>
          {steps.map((step, i) => {
            const { restOfChildren, codeBlock } = step;

            if (!codeBlock) {
              return <Container children={restOfChildren} key={i} />;
            }

            return <Step currentStep={i} steps={steps} key={i} />;
          })}
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
}

const Step = dynamic(
  Promise.resolve(({ currentStep, steps }: StepProps) => {
    const { restOfChildren, codeBlock } = steps[currentStep];

    const getEditorProps = (
      codeBlock: React.ReactElement
    ): StatefulEditorProps => {
      return {
        file: "Example.vue",
        code: codeBlock.props.children.props.children,
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

    const miniEditorProps: StatefulEditorProps = getEditorProps(codeBlock);

    // for the desktop version
    const [inViewStep, setInViewStep] = useState(0);
    const [inViewSubstep, setInViewSubstep] = useState(0);

    // mobile version: show every step one at a time
    if (window.innerWidth < 1200) {
      return (
        <Container>
          {restOfChildren}

          <div
            style={{
              position: "relative",
            }}
          >
            <MiniEditorWithState {...miniEditorProps} />
          </div>
        </Container>
      );
    }

    // desktop version: show every step together with a sticky editor on the left,
    // until theres a step without code

    const isFirstStepWithCode =
      steps[currentStep - 1] && !steps[currentStep - 1].codeBlock;

    if (!isFirstStepWithCode) return null;

    const subSteps = [];

    let i = currentStep;
    while (steps[i] && steps[i].codeBlock) {
      subSteps.push(steps[i]);
      i++;
    }

    const subStepsEditorProps = subSteps.map(({ codeBlock }) =>
      getEditorProps(codeBlock)
    );

    return (
      <InView
        as="div"
        onChange={(inView) => inView && setInViewStep(currentStep)}
        style={{
          width: "100%",
          maxWidth: "80rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {subSteps.map(({ codeBlock, restOfChildren }, i) => {
          return (
            <div
              key={`${currentStep}-${i}`}
              style={{
                position: "relative",
                minHeight: subStepsEditorProps[i].style.height,
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
                  backgroundColor: "var(--accent)",
                }}
              />
              {restOfChildren}
            </div>
          );
        })}

        <div
          style={{
            padding: "1rem",
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
              position: "sticky",
              top: "2rem",
              maxHeight: "calc(100vh - 4rem)",
              overflowY: "auto",
            }}
          />
        </div>
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
