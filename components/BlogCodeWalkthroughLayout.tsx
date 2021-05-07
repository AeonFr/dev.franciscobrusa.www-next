import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Layout from "./Layout";
import Container from "./Container";

const components = {};

export default function BlogCodeWalkthrough({ children }) {
  const steps = divideIntoSteps(children);

  return (
    <Layout>
      <div>
        <MDXProvider components={components}>
          {steps.map((childrenInStep, i) => (
            <Step key={i}>{childrenInStep}</Step>
          ))}
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
function divideIntoSteps(children: React.ReactElement): React.ReactElement[] {
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

function Step({ children }) {
  const [restOfChildren, codeBlock] = extractCodeBlock(children);

  if (!codeBlock) {
    return <Container children={children} />;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "80rem",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div style={{ padding: "1rem" }}>{restOfChildren}</div>
      <div style={{ padding: "1rem" }}>{codeBlock}</div>
    </div>
  );
}

function extractCodeBlock(
  children: React.ReactChildren
): [React.ReactElement[], React.ReactElement] {
  const c = React.Children.toArray(children);

  let result: [React.ReactElement[], React.ReactElement] = [[], null];

  c.forEach((child: React.ReactElement) => {
    if (child.props.mdxType === "pre") {
      result[1] = child;
    } else result[0].push(child);
  });

  return result;
}
