import * as styles from "./styles.css";
import CodeBlock from "./CodeBlock";

// used by TextSlide and as base of other slides
export const textComponents = {
  a: (props) => <a {...props} target="_blank" rel="noopen noreferer" />,
  p: (props) => <p {...props} className={styles.paragraph} />,
  h1: (props) => <h1 {...props} className={styles.title1} />,
  h2: (props) => <h2 {...props} className={styles.title2} />,
  h3: (props) => <h2 {...props} className={styles.title3} />,
  pre: ({ children, ...props }) => (
    <CodeBlock
      {...{
        ...props,
        children: {
          ...children,
          props: {
            ...children.props,
            children: children.props.children.replace(/\n$/, ""),
          },
        },
      }}
      className={styles.pre}
    />
  ),
  hr: (props) => <hr {...props} className={styles.hr} />,
  details: (props) => <details {...props} className={styles.details} />,
  ol: (props) => <ol {...props} className={styles.ol + " " + styles.documentFlow} />,
};
