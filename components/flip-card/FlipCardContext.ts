// react
import { createContext, use } from "react";

// other libraries
import { type SharedValue } from "react-native-reanimated";

// types
interface FlipCardContextType {
  isFlipped: SharedValue<boolean>;
  direction?: "x" | "y";
  duration?: number;
}

// To be able to pass props to all the children of this compound component
export const FlipCardContext = createContext<FlipCardContextType | undefined>(undefined);
export const useFlipCardContext = () => use(FlipCardContext)!;
