import "../styles/globals.css";
import "../styles/CodeBlock.css";

import ColorSchemePicker from "../components/layout/ColorSchemePicker";
import { useColorScheme } from "../hooks/useColorScheme";

function MyApp({ Component, pageProps }) {
  const [scheme, setScheme] = useColorScheme();
  return (
    <>
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
