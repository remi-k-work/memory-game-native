// react
import { useMemo } from "react";

// types
import type { LayoutRectangle } from "react-native";
import type { CSSAnimationKeyframes } from "react-native-reanimated";

// Encapsulate the animation logic in a custom hook
export default function useAnimCrossedOutEntry(cellSize: LayoutRectangle) {
  const angle = useMemo(() => {
    if (!cellSize.width || !cellSize.height) return "0deg";
    return `${Math.atan(cellSize.height / cellSize.width) * (180 / Math.PI)}deg`;
  }, [cellSize]);

  const crossOutLine1 = useMemo<CSSAnimationKeyframes>(
    () => ({
      from: { opacity: 0, transform: [{ rotateZ: angle }, { scaleX: 0 }], transformOrigin: "left center" },
      "30%": { opacity: 1 },
      to: { opacity: 1, transform: [{ rotateZ: angle }, { scaleX: 1 }], transformOrigin: "left center" },
    }),
    [angle],
  );

  const crossOutLine2 = useMemo<CSSAnimationKeyframes>(
    () => ({
      from: { opacity: 0, transform: [{ rotateZ: `-${angle}` }, { scaleX: 0 }], transformOrigin: "right center" },
      "30%": { opacity: 1 },
      to: { opacity: 1, transform: [{ rotateZ: `-${angle}` }, { scaleX: 1 }], transformOrigin: "right center" },
    }),
    [angle],
  );

  // Return all that is needed to trigger the animation
  return {
    animStyleCrossOutLine1: {
      opacity: 0,
      width: Math.sqrt(cellSize.width ** 2 + cellSize.height ** 2),
      animationName: crossOutLine1,
      animationDuration: "2s",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "forwards",
    },
    animStyleCrossOutLine2: {
      opacity: 0,
      width: Math.sqrt(cellSize.width ** 2 + cellSize.height ** 2),
      animationName: crossOutLine2,
      animationDuration: "2s",
      animationTimingFunction: "ease-in-out",
      animationFillMode: "forwards",
      animationDelay: "1.9s",
    },
  };
}
