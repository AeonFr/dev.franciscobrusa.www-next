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

import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import MultiRange from "multi-integer-range";

const preStyles = {
  padding: "0.5rem 1rem",
  paddingRight: "1.5rem" /* breathing room */,
  borderRadius: "0.5rem",
};

const lineStyles = { display: "table-row" };

const lineNoStyles = {
  display: "table-cell",
  textAlign: "right",
  paddingRight: "1em",
  userSelect: "none",
  opacity: "0.5",
};

const lineContentStyles = {
  display: "table-cell",
};

const highlightLineStyles = {
  fontWeight: "bold",
  backgroundColor: "rgba(200,200,255,0.1)",
  marginLeft: "-1rem",
  paddingLeft: "1rem",
  marginRight: "-1.5rem",
  paddingRight: "1.5rem",
};

export default function CodeBlock(props) {
  const className = props.children.props.className || "";
  const matches = className.match(
    /language-(?<lang>\w*)(?<highlightLines>\{[\d,-]*\})?/
  );

  let highlightLines = [];
  if (matches?.groups?.highlightLines) {
    try {
      highlightLines = new MultiRange(
        matches.groups.highlightLines.replace(/[{}]/g, "")
      ).toArray();
    } catch (e) {
      throw new Error(
        "Syntax error in highlightLines:",
        matches.groups.highlightLines
      );
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
        <pre className={className} style={{ ...style, ...preStyles }}>
          {tokens
            .filter((l, i) => i !== tokens.length - 1) // fix issue with extra newline
            .map((line, i) => (
              <div
                {...getLineProps({ line, key: i })}
                style={
                  highlightLines.indexOf(i + 1) !== -1
                    ? { ...highlightLineStyles, ...highlightLineStyles }
                    : lineStyles
                }
              >
                {tokens.length > 5 && <span style={lineNoStyles}>{i + 1}</span>}
                <span style={lineContentStyles}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
        </pre>
      )}
    </Highlight>
  );
}
