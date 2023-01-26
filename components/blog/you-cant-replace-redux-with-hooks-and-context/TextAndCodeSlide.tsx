import { MDXProvider } from "@mdx-js/react";
import * as styles from "./styles.css";
import { textComponents } from "./mdxComponents";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import debounce from "debounce";
import CodeBlock from "./CodeBlock";
import { createState, StateAPI } from "./state";

export interface State {
  nodes: any[];
  currentEditorContent: null;
  lines: number[]; // focused lines
  isAnyActive: boolean;
}

const CodeContext = createContext<StateAPI<State>>(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error("not implemented");
      },
    }
  ) as any
);

const CodeBlockWrapper = ({ children }) => {
  const { useSelector, setState } = useContext(CodeContext);

  useEffect(() => {
    setState(({ nodes, ...state }) => ({
      ...state,
      nodes: [...nodes, children],
    }));

    return () => {
      setState(({ nodes, ...state }) => ({
        ...state,
        nodes: nodes.splice(nodes.indexOf(children), 1),
      }));
    };
  }, []);

  const currentEditorContent = useSelector(
    ({ currentEditorContent }) => currentEditorContent
  );
  const hightlightedLines = useSelector(({ lines }) => lines);
  const isFirstCodeBlock = useSelector(
    ({ nodes }) => nodes[0] !== undefined && nodes[0] === children
  );

  const isDesktop = useMediaQuery({
    query: styles.DESKTOP_MEDIA_QUERY,
  });

  const [codeBlockWrapper, setCodeBlockWrapper] = useState<HTMLDivElement>();
  const mutationObserver = useRef<MutationObserver>();
  const [codeBlockHeight, setCodeBlockHeight] = useState(0);

  useEffect(() => {
    if (!codeBlockWrapper) return;

    const updateHeightThrottled = debounce(() => {
      setCodeBlockHeight(codeBlockWrapper.clientHeight);
    }, 100);

    mutationObserver.current = new MutationObserver(updateHeightThrottled);
    mutationObserver.current.observe(codeBlockWrapper, {
      subtree: true,
      childList: false,
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      mutationObserver.current.disconnect();
    };
  }, [codeBlockWrapper]);

  const editorContent = (isDesktop && currentEditorContent) || children;

  useLayoutEffect(() => {
    const numLines = editorContent.props.children.split("\n");
    setCodeBlockHeight(numLines * 20 + 28);
  }, [editorContent]);

  return !isDesktop || isFirstCodeBlock ? (
    <div
      className={styles.rightColumn}
      style={{
        bottom: `-${codeBlockHeight}px`,
        transition: "bottom .1s linear",
      }}
    >
      <div className={styles.rightColumnStickyWrapper}>
        <div ref={setCodeBlockWrapper} className={styles.overflowWrapper}>
          <CodeBlock
            highlightedLines={hightlightedLines}
            className={styles.pre}
          >
            {editorContent}
          </CodeBlock>
        </div>
      </div>
    </div>
  ) : null;
};

const useObserver = (
  observerFn: (entry: IntersectionObserverEntry) => void
) => {
  const observedNode = useRef();
  const [observer, setObserver] = useState<IntersectionObserver>();

  const ref = useCallback(
    (node) => {
      if (!observer) return;
      if (node) {
        observer.observe(node);
        observedNode.current = node;
      } else if (observedNode.current) {
        observer.unobserve(observedNode.current);
      }
    },
    [observer]
  );

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        (entries) => {
          const entry = entries.find(
            ({ target }) => target === observedNode.current
          );
          if (entry) {
            observerFn(entry);
          }
        },
        window.matchMedia(styles.DESKTOP_MEDIA_QUERY).matches
          ? { threshold: 0, rootMargin: "-49% 0px -49% 0px" }
          : { threshold: 0, rootMargin: "-24% 0px -74% 0px" }
      )
    );

    return () => {
      observer?.disconnect();
    };
  }, []);

  return ref;
};

export const CodeStep = ({ children }) => {
  const { setState } = useContext(CodeContext);
  const [isActive, setIsActive] = useState(false);

  const ref = useObserver((entry) => {
    const preChild = children.find((c) => c.props?.originalType === "pre");
    if (!preChild) {
      return undefined;
    }
    if (entry.isIntersecting) {
      setIsActive(true);
      setState((state) => ({
        ...state,
        currentEditorContent: preChild.props.children,
        isAnyActive: true,
      }));
    } else {
      setIsActive(false);
      setState((state) => ({
        ...state,
        isAnyActive: false,
      }));
    }
  });

  return (
    <div
      ref={ref}
      className={
        styles.documentFlow +
        " " +
        styles.intersectionStop +
        " " +
        (isActive ? styles.isActive : "")
      }
    >
      {children}
    </div>
  );
};

export const CodeHighlight = ({
  children,
  lines = [],
}: {
  lines: Array<number>;
  children: any;
}) => {
  const { setState, getState } = useContext(CodeContext);
  const [isActive, setIsActive] = useState(false);

  const ref = useObserver((entry) => {
    if (entry.isIntersecting) {
      setIsActive(true);
      setState((state) => ({
        ...state,
        lines,
      }));
    } else {
      setIsActive(false);
      // unset if not entering any other highlight
      if (getState().lines === lines) {
        setState((state) => ({
          ...state,
          lines: [],
        }));
      }
    }
  });

  return (
    <span
      ref={ref}
      className={
        styles.intersectionStopInline + " " + (isActive ? styles.isActive : "")
      }
    >
      {children}
    </span>
  );
};

const textAndCodeComponents = {
  ...textComponents,
  p: (props) => (
    <p {...props} className={styles.paragraph + " " + styles.leftColumn} />
  ),
  h1: (props) => (
    <h1 {...props} className={styles.title1 + " " + styles.leftColumn} />
  ),
  h2: (props) => (
    <h2 {...props} className={styles.title2 + " " + styles.leftColumn} />
  ),
  pre: (props) => <CodeBlockWrapper {...props} />,
};

export default function TextAndCodeSlide({ children }) {
  const codeContextAPI = useMemo<StateAPI<State>>(() => {
    return createState<State>({
      nodes: [],
      currentEditorContent: null,
      lines: [],
      isAnyActive: false,
    });
  }, []);

  const isActive = codeContextAPI.useSelector(({ isAnyActive }) => isAnyActive);

  return (
    <div
      className={
        styles.documentFlow +
        " " +
        styles.doubleColumn +
        " " +
        (isActive ? styles.isActive : "")
      }
    >
      <CodeContext.Provider value={codeContextAPI}>
        <MDXProvider components={textAndCodeComponents}>{children}</MDXProvider>
      </CodeContext.Provider>
    </div>
  );
}
