// react
import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

// A custom react hook that behaves like `useEffect` but skips the initial mount
export default function useDidUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  // A ref to track whether the component has mounted for the first time
  const didMount = useRef(false);

  // The effect re-runs when any dependency in `deps` changes, but only after the first mount
  useEffect(() => {
    if (didMount.current) return effect();
    else didMount.current = true;
  }, deps);
}
