import "../styles/globals.css";

import Head from "next/head";
import ColorSchemePicker from "../components/layout/ColorSchemePicker";
import Block from "../components/Block";
import { useColorScheme } from "../hooks/useColorScheme";
import { useCallback } from "react";

function MyApp({ Component, pageProps }) {
  const [scheme, setScheme] = useColorScheme();

  const handleSchemeChange = useCallback((ev) => {
    setScheme(ev.target.value);
  });

  return (
    <div>
      <Head key="favicon">
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>

      <Block
        style={{
          position: "relative",
        }}
      >
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
      </Block>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
