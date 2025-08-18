// react
import { useMemo } from "react";

// types
import type { LayoutRectangle } from "react-native";
import type { CSSAnimationKeyframes } from "react-native-reanimated";

// Encapsulate the animation logic in a custom hook
export default function useAnimCrossedOutEntry(entrySize: LayoutRectangle) {
  const angle = useMemo(() => {
    if (!entrySize.width || !entrySize.height) return "0deg";
    return `${Math.atan(entrySize.height / entrySize.width) * (180 / Math.PI)}deg`;
  }, [entrySize]);

  const crossOutLine1 = useMemo<CSSAnimationKeyframes>(
    () => ({
      from: { opacity: 0, transform: [{ rotateZ: angle }, { scaleX: 0 }], transformOrigin: "left center" },
      "25%": { opacity: 1 },
      "50%": { opacity: 1, transform: [{ rotateZ: angle }, { scaleX: 1 }], transformOrigin: "left center" },
      "75%": { opacity: 1 },
      to: { opacity: 0, transform: [{ rotateZ: angle }, { scaleX: 1 }], transformOrigin: "left center" },
    }),
    [angle],
  );

  const crossOutLine2 = useMemo<CSSAnimationKeyframes>(
    () => ({
      from: { opacity: 0, transform: [{ rotateZ: `-${angle}` }, { scaleX: 0 }], transformOrigin: "right center" },
      "25%": { opacity: 1 },
      "50%": { opacity: 1, transform: [{ rotateZ: `-${angle}` }, { scaleX: 1 }], transformOrigin: "right center" },
      "75%": { opacity: 1 },
      to: { opacity: 0, transform: [{ rotateZ: `-${angle}` }, { scaleX: 1 }], transformOrigin: "right center" },
    }),
    [angle],
  );

  // Return all that is needed to trigger the animation
  return {
    animStyleCrossOutLine1: {
      opacity: 0,
      width: Math.sqrt(entrySize.width ** 2 + entrySize.height ** 2),
      animationName: crossOutLine1,
      animationDuration: "4s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite" as const,
    },
    animStyleCrossOutLine2: {
      opacity: 0,
      width: Math.sqrt(entrySize.width ** 2 + entrySize.height ** 2),
      animationName: crossOutLine2,
      animationDuration: "4s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite" as const,
    },
  };
}
