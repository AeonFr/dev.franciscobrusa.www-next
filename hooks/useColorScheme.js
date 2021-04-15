import { useEffect, useState } from "react";

export function useColorScheme() {
  const [scheme, setScheme] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  });

  return [scheme, setScheme];
}
