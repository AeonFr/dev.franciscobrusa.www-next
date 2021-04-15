import Link from "next/link";
// import "./font.css";
import layoutClasses from "../styles/Layout.module.css";
import ColorSchemePicker from "./layout/ColorSchemePicker";
import { useColorScheme } from "../hooks/useColorScheme";

export default Layout;

function Layout({ children }) {
  const [scheme, setScheme] = useColorScheme();
  return (
    <div className={layoutClasses["App"]}>
      <header className={layoutClasses["App-header"]}>
        <Link href="/">
          <a
            className={
              layoutClasses["App-logo"] + " " + layoutClasses["App-header-link"]
            }
          >
            Francisco Brusa
          </a>
        </Link>

        <ColorSchemePicker
          scheme={scheme}
          handleSchemeChange={(ev) => setScheme(ev.target.value)}
          className={layoutClasses["App-color-picker"]}
        />
      </header>

      <main className={layoutClasses["App-content"]}>{children}</main>

      <footer className={layoutClasses["App-footer"]}>
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
