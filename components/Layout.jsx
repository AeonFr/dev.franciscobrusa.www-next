import Link from "next/link";
// import "./font.css";
import layoutClasses from "../styles/Layout.module.css";

export default Layout;

function Layout({ children }) {
  return (
    <div className={layoutClasses["App"]}>
      <header className={layoutClasses["App-frame"]}>
        <Link href="/">
          <a
            className={
              layoutClasses["App-logo"] + " " + layoutClasses["App-header-link"]
            }
          >
            Francisco Brusa
          </a>
        </Link>
      </header>

      <main>{children}</main>

      <footer className={layoutClasses["App-frame"]}>
        <a
          href="https://twitter.com/francanobr"
          target="_blank"
          rel="noreferrer"
          className={layoutClasses["App-header-link"]}
        >
          Twitter
        </a>
        <a
          href="https://github.com/aeonfr"
          target="_blank"
          rel="noreferrer"
          className={layoutClasses["App-header-link"]}
        >
          Github
        </a>
      </footer>
    </div>
  );
}
