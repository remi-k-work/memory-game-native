// react
import { useEffect, useState } from "react";

// other libraries
import { cancelAnimation, makeMutable } from "react-native-reanimated";

// types
import type { AnimationState, AnimationValues } from "@/features/animations/types";

// This hook initializes SharedValues for each property in the provided state object
export default function useSharedValues<S extends AnimationState>(state: S) {
  // Create SharedValues from initial state
  const [mutable] = useState(() => {
    const values = {} as AnimationValues<S>;
    for (const key in state) values[key] = makeMutable(state[key]);

    return values;
  });

  // Ensure that any active Reanimated animations on these SharedValues are canceled when the component unmounts
  useEffect(() => {
    return () => {
      Object.keys(mutable).forEach((element) => {
        cancelAnimation(mutable[element]);
      });
    };
  }, [mutable]);

  // Return the shared values so they can be used in components
  return mutable;
}
