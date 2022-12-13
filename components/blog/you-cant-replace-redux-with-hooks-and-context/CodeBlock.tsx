/**
 * Wrapper arround @code-surfer/standalone code editor (based on Prisma)
 */

import Highlight, { defaultProps } from "prism-react-renderer";
import { useEffect, useMemo, useRef } from "react";
import {
  useTransition,
  animated,
  Globals,
  useReducedMotion,
} from "react-spring";
import { lcs } from "fast-myers-diff";
import "../../../styles/code-block.css";
import * as styles from "./styles.css";

const Lines = ({
  className,
  style,
  tokens,
  getLineProps,
  getTokenProps,
  highlightedLines,
  code,
}) => {
  const previousCodeRef = useRef<string>(code);
  const previousSymbols = useRef<Symbol[]>([]);

  /* A collection of symbols where each item (that represents a line of code) has a stable identity ammong diffs. */
  const tokenSymbols = useMemo(() => {
    const previousCode = previousCodeRef.current;

    if (previousCode === code) {
      // initial render
      previousSymbols.current = tokens.map(() => Symbol());
    }
    const symbols = previousSymbols.current;

    const diffResult = Array.from(
      lcs(previousCode.split("\n"), code.split("\n"))
    );

    let skipIndexes = 0;

    const newSymbols = [...tokens].reduce((acc, token, index) => {
      if (diffResult[0] && diffResult[0][1] === index) {
        const [prevIndex, currIndex, length] = diffResult[0];
        diffResult.shift();
        skipIndexes = length - 1;

        return [...acc, ...symbols.slice(prevIndex, prevIndex + length)];
      } else if (skipIndexes > 0) {
        skipIndexes--;
        return acc;
      } else {
        return [...acc, Symbol()];
      }
    }, []);

    // save for future iterations
    previousCodeRef.current = code;
    previousSymbols.current = newSymbols;

    return newSymbols;
  }, [code]); // tokens change alongside code, but code is a string so its safe to compare it

  const transitions = useTransition(tokens, {
    key: (token) => {
      const index = tokens.indexOf(token);
      return tokenSymbols[index];
    },
    /*
    // TODO use better keys
    keys: (token) => {
      const content = token[0].content;
      const contentIndex = tokens
        .filter((token) => token[0].content === content)
        .indexOf(token);
      return `{${contentIndex}} ${content}`;
    },
     */
    ...(typeof window != "undefined" &&
    window.matchMedia(styles.DESKTOP_MEDIA_QUERY).matches
      ? {
          from: { height: "0em", opacity: 0, transform: "translateX(50%)" },
          enter: () => [
            { height: "1.5em" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          leave: () => [{ opacity: 0 }, { height: "0em" }],
          trail: 50,
        }
      : {}),
  });

  return (
    <pre className={className} style={style}>
      {transitions((style, item, _, index) => {
        const lineProps = getLineProps({ line: item });
        const highlighted = highlightedLines?.includes(index);

        return (
          <animated.div
            style={style}
            className={
              lineProps.className +
              " " +
              (highlighted ? styles.highlightedCodeLine : "")
            }
          >
            {item.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </animated.div>
        );
      })}
    </pre>
  );
};

export default function CodeBlock({
  children,
  highlightedLines = [],
}: {
  children: any;
  highlightedLines: number[];
}) {
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    Globals.assign({
      skipAnimation: prefersReducedMotion,
    });
  }, [prefersReducedMotion]);

  const code = children.props.children;

  return useMemo(
    () => (
      <Highlight
        {...defaultProps}
        code={code}
        theme={undefined}
        language={children.props.className?.replace(/^language-/, "")}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          return (
            <Lines
              className={className}
              style={style}
              tokens={tokens}
              getLineProps={getLineProps}
              getTokenProps={getTokenProps}
              highlightedLines={highlightedLines}
              code={code}
            />
          );
        }}
      </Highlight>
    ),
    [code, highlightedLines]
  );
}
