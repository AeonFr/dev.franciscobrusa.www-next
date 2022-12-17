import { useState, useEffect } from "react";

type Listener<State> = (s: State) => void;
export type StateAPI<State> = {
  getState: () => State;
  addListener: (
    listener: Listener<State>
  ) => (listener: Listener<State>) => void;
  setState: ((newState: State) => void) &
    ((setStateFn: (prevState: State) => State) => void);
  useSelector: <T>(selectorFn: (s: State) => T) => T;
};

export function createState<State>(initialValue: State): StateAPI<State> {
  let state = initialValue;
  const listeners = new Set<Listener<State>>();
  const stateAPI: StateAPI<State> = {
    getState: () => state,
    addListener: (listener: Listener<State>) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setState: (newState: State & ((prevState: State) => State)) => {
      if (typeof newState === "function") {
        state = newState(state);
      } else {
        state = newState;
      }
      listeners.forEach((listener: Listener<State>) => listener(state));
    },
    useSelector: <T>(selectorFn: (s: State, prevRes?: T) => T) => {
      const [state, setState] = useState<T>();

      useEffect(() => {
        const onUpdate = (codeContextState: State) => {
          setState((prevRes) => selectorFn(codeContextState, prevRes));
        };

        const removeListener = stateAPI.addListener(onUpdate);
        return () => {
          removeListener(onUpdate);
        };
      }, []);

      return state;
    },
  };

  return stateAPI;
}
