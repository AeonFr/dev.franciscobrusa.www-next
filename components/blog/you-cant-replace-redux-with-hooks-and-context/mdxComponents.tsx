import * as styles from "./styles.css";

// used by TextSlide and as base of other slides
export const textComponents = {
  a: (props) => <a {...props} target="_blank" rel="noopen noreferer" />,
  p: (props) => <p {...props} className={styles.paragraph} />,
  h1: (props) => <h1 {...props} className={styles.title1} />,
  h2: (props) => <h2 {...props} className={styles.title2} />,
  pre: (props) => <pre {...props} className={styles.pre} />,
  hr: (props) => <hr {...props} className={styles.hr} />,
};
