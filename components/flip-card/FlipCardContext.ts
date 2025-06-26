// react
import { createContext, use } from "react";

// types
import type { SharedValue } from "react-native-reanimated";

interface AnimatedAlready {
  kind: "animated-already";
  rotateValueR: SharedValue<number>;
  rotateValueF: SharedValue<number>;
  direction?: "x" | "y";
}

interface NeedsToAnimate {
  kind: "needs-to-animate";
  isFlipped: boolean;
  direction?: "x" | "y";
  duration?: number;
}

type FlipCardContextType = AnimatedAlready | NeedsToAnimate;

// To be able to pass props to all the children of this compound component
export const FlipCardContext = createContext<FlipCardContextType | undefined>(undefined);
export const useFlipCardContext = () => use(FlipCardContext)!;
