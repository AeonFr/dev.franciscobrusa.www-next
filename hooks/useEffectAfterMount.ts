import { useRef, useEffect } from "react";

export function useEffectAfterMount(effect, deps) {
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (effect) effect();
  }, deps);
}
