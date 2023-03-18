import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import type { PostMetadata } from "../utils/postsMetadata";
import * as styles from "../styles/layout.css";

import ColorSchemePicker from "../components/layout/ColorSchemePicker";
import { useColorScheme } from "../hooks/useColorScheme";
import { useCallback } from "react";

interface LayoutProps {
  title: PostMetadata["title"];
  lang: PostMetadata["lang"];
  socialImage: PostMetadata["socialImage"];
  description: PostMetadata["description"];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  lang,
  socialImage,
  description,
}) => {
  useEffect(() => {
    window.document.documentElement.setAttribute("lang", lang || "en");
  }, [lang]);

  const [scheme, setScheme] = useColorScheme();

  const handleSchemeChange = useCallback((ev) => {
    // @ts-expect-error
    setScheme(ev.target.value);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
          </>
        )}

        {socialImage && (
          <>
            <meta name="image" content={process.env.baseURL + socialImage} />
            <meta
              property="og:image"
              content={process.env.baseURL + socialImage}
            />
            <meta
              name="twitter:image"
              content={process.env.baseURL + socialImage}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@FranCanoBr" />
          </>
        )}
      </Head>

      <header className={styles.block}>
        <ColorSchemePicker
          scheme={scheme}
          handleSchemeChange={handleSchemeChange}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: "1.5rem",
          }}
        />
        <Link href="/" className={styles.logo}>
          Francisco Brusa
        </Link>
      </header>

      <main>{children}</main>

      <footer className={styles.block}>
        <a
          href="https://twitter.com/francanobr"
          target="_blank"
          rel="noreferrer"
          className={styles.headerLink}
        >
          Twitter
        </a>
        <a
          href="https://github.com/aeonfr"
          target="_blank"
          rel="noreferrer"
          className={styles.headerLink}
        >
          Github
        </a>
      </footer>
    </div>
  );
};

export default Layout;
