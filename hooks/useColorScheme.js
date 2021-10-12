import { useEffect, useState } from "react";

export function useColorScheme() {
  let retrievedScheme = null;
  try {
    retrievedScheme = localStorage.getItem("colorScheme");
  } catch (e) {}

  const [scheme, setScheme] = useState(retrievedScheme);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (scheme === "dark" || scheme === "light") return;

    const matcher = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (event) => {
      if (event.matches) {
        setScheme("dark");
      } else {
        setScheme("light");
      }
    };

    listener(matcher);

    matcher.addEventListener("change", listener);

    return () => matcher.removeEventListener("change", listener);
  }, [scheme]);

  return [
    scheme,
    /** setScheme function */
    (scheme) => {
      try {
        localStorage.setItem("colorScheme", scheme);
      } catch (e) {}
      setScheme(scheme);
    },
  ];
}
