// react
import { useEffect, useState } from "react";

// other libraries
import { cancelAnimation, makeMutable } from "react-native-reanimated";

// types
import type { AnimationInitState, AnimationSharedValues } from "@/features/animations/types";

// This hook initializes the "boxes that hold numbers" (shared values) for each property in the provided initial animation state
export default function useSharedValues<S extends AnimationInitState>(animationInitState: S) {
  // Create mutable animation shared values from the initial animation state
  const [mutableSharedValues] = useState(() => {
    const animationSharedValues = {} as AnimationSharedValues<S>;
    for (const key in animationInitState) animationSharedValues[key] = makeMutable(animationInitState[key]);

    return animationSharedValues;
  });

  // Ensure that any active reanimated animations on these shared values are canceled when the component unmounts
  useEffect(() => {
    return () => Object.keys(mutableSharedValues).forEach((element) => cancelAnimation(mutableSharedValues[element]));
  }, [mutableSharedValues]);

  // Return the animation shared values so they can be used in components
  return mutableSharedValues;
}
