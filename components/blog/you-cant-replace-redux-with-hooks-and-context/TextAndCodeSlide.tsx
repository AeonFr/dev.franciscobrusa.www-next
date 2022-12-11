import { MDXProvider } from "@mdx-js/react";
import * as styles from "./styles.css";
import { textComponents } from "./mdxComponents";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CodeBlock from "./CodeBlock";

interface State {
  nodes: any[];
  currentEditorContent: null;
}

type Listener = (s: State) => void;

type CodeContext = {
  listeners: Listener[];
  state: State;
};

type CodeContextAPI = {
  getState: () => CodeContext;
  addListener: (l: Listener) => void;
  removeListener: (l: Listener) => void;
  setState: ((newState: State) => void) &
    ((setStateFn: (prevState: State) => State) => void);
  useSelector: <T>(selectorFn: (s: State, prevRes?: T) => T) => T;
};

const CodeContext = createContext<CodeContextAPI>(
  new Proxy(
    {},
    {
      get: () => {
        throw new Error("not implemented");
      },
    }
  ) as any
);

const IntersectionStop = ({ children }) => {
  const { setState } = useContext(CodeContext);
  const observedNode = useRef();
  const [observer, setObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        (entries) => {
          const entry = entries.find(
            ({ target }) => target === observedNode.current
          );

          if (entry && !entry.isIntersecting) {
            if (entry.rootBounds.y > entry.boundingClientRect.y) {
              // Comming at it from the top
              setState(({ currentEditorContent, ...state }) => ({
                ...state,
                currentEditorContent: children,
              }));
            } else {
              setState(({ currentEditorContent, nodes, ...state }) => ({
                ...state,
                nodes,
                currentEditorContent:
                  nodes[nodes.indexOf((node: any) => node === children) - 1],
              }));
            }
          }
          if (!entry?.isIntersecting) return;
        },
        { threshold: 0, rootMargin: "-49% 0px -49% 0px" }
      )
    );
  }, []);

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

  return <div ref={ref} className={styles.intersectionStop} />;
};

const CodeStep = ({ children }) => {
  const { useSelector, setState } = useContext(CodeContext);

  useEffect(() => {
    setState(({ nodes, ...state }) => ({
      ...state,
      nodes: [...nodes, children],
    }));
  }, []);

  const currentEditorContent = useSelector(
    ({ currentEditorContent }) => currentEditorContent
  );
  const isFirstCodeBlock = useSelector(
    ({ nodes }) => nodes[0] !== undefined && nodes[0] === children
  );

  return (
    <>
      <IntersectionStop>{children}</IntersectionStop>
      {isFirstCodeBlock ? (
        <div className={styles.leftColumn}>
          <div className={styles.leftColumnStickyWrapper}>
            <CodeBlock>{currentEditorContent || children}</CodeBlock>
          </div>
        </div>
      ) : null}
    </>
  );
};

const textAndCodeComponents = {
  ...textComponents,
  p: (props) => textComponents.p({ ...props, className: styles.rightColumn }),
  pre: (props) => <CodeStep {...props} />,
};

export default function TextAndCodeSlide({ children }) {
  let codeContext = useRef<CodeContext>({
    listeners: [],
    state: {
      nodes: [],
      currentEditorContent: null,
    },
  });
  const codeContextAPI = useMemo<CodeContextAPI>(() => {
    return {
      getState: () => codeContext.current.state,
      addListener: (listener: Listener) =>
        codeContext.current.listeners.push(listener),
      removeListener: (listener: Listener) =>
        (codeContext.current.listeners = codeContext.current.listeners.filter(
          (l: any) => l !== listener
        )),
      setState: (newState: any) => {
        if (typeof newState === "function") {
          codeContext.current.state = newState(codeContext.current.state);
        } else {
          codeContext.current.state = newState;
        }
        codeContext.current.listeners.forEach((listener: Listener) =>
          listener(codeContext.current.state)
        );
      },
      useSelector<T>(selectorFn: (s: State, prevRes?: T) => T) {
        const [state, setState] = useState<T>();

        useEffect(() => {
          const onUpdate = (codeContextState: State) => {
            setState((prevRes) => selectorFn(codeContextState, prevRes));
          };

          codeContextAPI.addListener(onUpdate);

          return () => {
            codeContextAPI.removeListener(onUpdate);
          };
        }, []);

        return state;
      },
    };
  }, []);

  return (
    <div className={styles.documentFlow + " " + styles.doubleColumn}>
      <MDXProvider components={textAndCodeComponents}>
        <CodeContext.Provider value={codeContextAPI}>
          {children}
        </CodeContext.Provider>
      </MDXProvider>
    </div>
  );
}
