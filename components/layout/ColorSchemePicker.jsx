import { useEffect, useMemo } from "react";

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

  useEffect(() => {
    window.document.documentElement.className = htmlClasses;
  }, [htmlClasses]);

  return (
    <div {...props}>
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
