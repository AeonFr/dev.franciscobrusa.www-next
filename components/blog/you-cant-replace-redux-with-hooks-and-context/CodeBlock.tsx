/**
 * Wrapper arround @code-surfer/standalone code editor (based on Prisma)
 */

import Highlight, { defaultProps } from "prism-react-renderer";
import { useEffect } from "react";
import {
  useTransition,
  animated,
  Globals,
  useReducedMotion,
} from "react-spring";
import "../../../styles/code-block.css";

const Lines = ({ className, style, tokens, getLineProps, getTokenProps }) => {
  const transitions = useTransition(tokens, {
    // TODO use better keys
    keys: (token) => {
      const content = token[0].content;
      const contentIndex = tokens
        .filter((token) => token[0].content === content)
        .indexOf(token);
      return `{${contentIndex}} ${content}`;
    },
    from: { height: "0em", opacity: 0, transform: "translateX(100%)" },
    enter: (item) => [
      { height: "1.5em" },
      { opacity: 1, transform: "translateX(0)" },
    ],
    leave: (item) => [{ opacity: 0 }, { height: "0em" }],
    trail: 100,
  });

  return (
    <pre className={className} style={style}>
      {transitions((style, item) => {
        const lineProps = getLineProps({ line: item });

        return (
          <animated.div style={style} className={lineProps.className}>
            {item.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </animated.div>
        );
      })}
    </pre>
  );
};

export default function CodeBlock({ children }) {
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    Globals.assign({
      skipAnimation: prefersReducedMotion,
    });
  }, [prefersReducedMotion]);

  return (
    <Highlight
      {...defaultProps}
      code={children.props.children}
      theme={undefined}
      language={undefined}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Lines
          className={className}
          style={style}
          tokens={tokens}
          getLineProps={getLineProps}
          getTokenProps={getTokenProps}
        />
      )}
    </Highlight>
  );
}
