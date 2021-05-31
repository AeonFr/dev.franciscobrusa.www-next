import { useEffect, useMemo } from "react";
import colorPickerStyles from "../../styles/ColorSchemePicker.module.css";

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
    <div
      className={colorPickerStyles.root + " " + (props.className || "")}
      style={props.style}
    >
      <input
        type="radio"
        name="color-scheme"
        id="color-scheme-light"
        value="light"
        checked={scheme === "light"}
        onChange={handleSchemeChange}
      />
      <label aria-label="Use light color scheme" htmlFor="color-scheme-light">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </label>
      <input
        type="radio"
        name="color-scheme"
        id="color-scheme-dark"
        value="dark"
        checked={scheme === "dark"}
        onChange={handleSchemeChange}
      />
      <label aria-label="Use dark color scheme" htmlFor="color-scheme-dark">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  );
}
