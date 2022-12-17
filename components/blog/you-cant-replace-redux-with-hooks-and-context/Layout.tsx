import * as styles from "./styles.css";

export default function Layout({ children }: any) {
  if (children)
    return (
      <div className={styles.layoutRoot + " " + styles.documentFlow}>
        {children}
      </div>
    );
  return null;
}
