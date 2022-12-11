import { MDXProvider } from "@mdx-js/react";
import * as styles from "./styles.css";
import { textComponents } from "./mdxComponents";

const introComponents = {
  ...textComponents,
  p: (props) => <p {...props} className={styles.lead} />,
};

export default function LeadSlide({ children }) {
  return (
    <div className={styles.documentFlow + " " + styles.singleColumn}>
      <MDXProvider components={introComponents}>{children}</MDXProvider>
    </div>
  );
}
