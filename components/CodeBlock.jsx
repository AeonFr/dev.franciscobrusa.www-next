/**
 * CodeBlock component to render markdown
 *
 * Usage:
 * Add a pre tag and pass the language
 *
 * ```javascript
 * // ...
 * ```
 *
 * Highlight lines like this:
 *
 * ```javascript{1,2}
 * ...
 *
 * For the ranges, you can use any syntax supported by multi-integer-range (https://www.npmjs.com/package/multi-integer-range)
 *
 * Line numbers are showed only if the block has >5 lines
 */

import React, { Fragment } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import MultiRange from "multi-integer-range";
import "../styles/code-block.css";

const rootStyles = (hasLineNumbers) => ({
  padding: "0.5em 1em",
  borderRadius: "0.5em",
  display: "grid",
  gridTemplateColumns: hasLineNumbers ? "auto 1fr" : "1fr",
});

const lineNoStyles = {
  textAlign: "right",
  paddingRight: "1em",
  userSelect: "none",
  opacity: "0.5",
};

const highlightLineStyles = {
  fontWeight: "600",
  opacity: null,
  backgroundColor: "rgba(200,200,255,0.2)",
};

export default function CodeBlock(props) {
  const className = props.children.props.className || "";
  const matches = className.match(/language-(?<lang>\w*)/);

  const metastring = props.children.props.metastring;
  let highlightLines = [];
  if (metastring) {
    try {
      highlightLines = new MultiRange(
        metastring.replace(/[{}]/g, "")
      ).toArray();
    } catch (e) {
      throw new Error("Syntax error in highlightLines:", metastring);
    }
  }

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children}
      theme={undefined}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ""
      }
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            ...rootStyles(tokens.length > 5),
          }}
        >
          {tokens
            .filter((l, i) => i !== tokens.length - 1) // fix issue with extra newline
            .map((line, i) => (
              <Fragment key={i}>
                {tokens.length > 5 && (
                  <div
                    style={{
                      ...lineNoStyles,
                      ...(highlightLines.indexOf(i + 1) !== -1
                        ? highlightLineStyles
                        : {}),
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                )}
                <div
                  {...getLineProps({ line, key: i })}
                  style={
                    highlightLines.indexOf(i + 1) !== -1
                      ? highlightLineStyles
                      : {}
                  }
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </Fragment>
            ))}
        </pre>
      )}
    </Highlight>
  );
}
