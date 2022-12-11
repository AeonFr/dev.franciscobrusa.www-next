import { MDXProvider } from "@mdx-js/react";
import * as styles from "./styles.css";
import { textComponents } from "./mdxComponents";

export default function TextSlide({ children }) {
  return (
    <div className={styles.documentFlow + " " + styles.singleColumn}>
      <MDXProvider components={textComponents}>{children}</MDXProvider>
    </div>
  );
}
