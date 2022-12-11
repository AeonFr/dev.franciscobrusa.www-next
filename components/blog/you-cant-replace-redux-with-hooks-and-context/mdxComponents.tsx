import * as styles from "./styles.css";

// used by TextSlide and as base of other slides
export const textComponents = {
  a: (props) => <a {...props} target="_blank" rel="noopen noreferer" />,
  p: (props) => (
    <p
      {...props}
      className={styles.paragraph + " " + (props.className || "")}
    />
  ),
  h1: (props) => (
    <h1 {...props} className={styles.title1 + " " + (props.className || "")} />
  ),
  pre: (props) => (
    <pre {...props} className={styles.pre + " " + (props.className || "")} />
  ),
};
