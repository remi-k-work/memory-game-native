// react
import { useRef } from "react";

// expo
import { LinearGradient } from "expo-linear-gradient";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import Animated, { FadeIn, FadeOut, useSharedValue } from "react-native-reanimated";

// constants
const LOAD_ENTERING = FadeIn.springify().damping(80).mass(2).stiffness(50);
const LOAD_EXITING = FadeOut.springify().damping(80).mass(2).stiffness(50);

// Create animated versions of components we might need to animate
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// Encapsulate the animation logic in a custom hook
export default function useAnimSingleCard(isFlipped: boolean) {
  // A shared value to track if the card is flipped that drives the animation
  const isFlippedFlag = useSharedValue(isFlipped);

  // To keep the shared value in sync with the prop
  useDidUpdateEffect(() => {
    isFlippedFlag.value = isFlipped;
  }, [isFlipped]);

  // A random flip direction (kept in a ref to unflip it later in the same way)
  const directionRef = useRef<"x" | "y">(Math.random() < 0.5 ? "x" : "y");

  // Return all that is needed to trigger the animation
  return { isFlippedFlag, direction: directionRef.current, AnimatedLinearGradient, LOAD_ENTERING, LOAD_EXITING };
}
