// react
import { useEffect, useState } from "react";

// other libraries
import { cancelAnimation, makeMutable } from "react-native-reanimated";

// types
import type { AnimationInitState, AnimationSharedValues } from "@/features/animations/types";

// This hook initializes animation shared values for each property in the provided initial animation state object
export default function useSharedValues(animationInitState: AnimationInitState) {
  // Create mutable animation shared values from the initial animation state ("boxes that hold numbers" we want to change over time)
  const [mutableSharedValues] = useState(() => {
    const animationSharedValues = {} as AnimationSharedValues;
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
