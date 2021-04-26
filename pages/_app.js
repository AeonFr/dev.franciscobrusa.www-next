import "../styles/globals.css";
import "../styles/CodeBlock.css";

import Head from "next/head";
import ColorSchemePicker from "../components/layout/ColorSchemePicker";
import { useColorScheme } from "../hooks/useColorScheme";

function MyApp({ Component, pageProps }) {
  const [scheme, setScheme] = useColorScheme();
  return (
    <>
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
        <link rel="manifest" href="/favicon/site.webmanifest"></link>
      </Head>

      <ColorSchemePicker
        scheme={scheme}
        handleSchemeChange={(ev) => setScheme(ev.target.value)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          paddingTop: "1rem",
          paddingRight: "1rem",
          fontSize: "1.5rem",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
