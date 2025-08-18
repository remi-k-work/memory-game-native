// react
import { useMemo } from "react";

// types
import type { LayoutRectangle } from "react-native";
import type { CSSAnimationKeyframes } from "react-native-reanimated";

// Encapsulate the animation logic in a custom hook
export default function useAnimMorphedEntry(entrySize: LayoutRectangle) {
  const morphIn = useMemo<CSSAnimationKeyframes>(
    () => ({
      from: { opacity: 0, transform: [{ translateY: 0 }] },
      "50%": { opacity: 1, transform: [{ translateY: -entrySize.height }] },
      "75%": { opacity: 1, transform: [{ translateY: -entrySize.height }] },
      to: { opacity: 0, transform: [{ translateY: 0 }] },
    }),
    [entrySize.height],
  );

  // Return all that is needed to trigger the animation
  return {
    animStyleMorphIn: { animationName: morphIn, animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" as const },
  };
}
