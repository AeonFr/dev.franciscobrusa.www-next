import { useMemo } from "react";
import { Helmet } from "react-helmet";

export default function ColorSchemePicker({
  scheme,
  handleSchemeChange,
  ...props
}) {
  const htmlClasses = useMemo(() => {
    return scheme === "dark"
      ? "theme-snazzy scheme-dark"
      : "theme-snazzy scheme-light";
  }, [scheme]);

  return (
    <div {...props}>
      <Helmet>
        <html lang="en" class={htmlClasses} />
      </Helmet>
      <label aria-label="Use light color scheme">
        <input
          type="radio"
          name="color-scheme"
          value="light"
          checked={scheme === "light"}
          onChange={handleSchemeChange}
        />
        ☀️
      </label>
      <label aria-label="Use dark color scheme">
        <input
          type="radio"
          name="color-scheme"
          value="dark"
          checked={scheme === "dark"}
          onChange={handleSchemeChange}
        />
        🌑
      </label>
    </div>
  );
}
