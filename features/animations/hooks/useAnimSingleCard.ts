// react
import { useRef } from "react";

// expo
import { LinearGradient } from "expo-linear-gradient";

// other libraries
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// constants
const LOAD_ENTERING = FadeIn.springify().damping(80).mass(2).stiffness(50);
const LOAD_EXITING = FadeOut.springify().damping(80).mass(2).stiffness(50);

// Create animated versions of components we might need to animate
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// Encapsulate the animation logic in a custom hook
export default function useAnimSingleCard() {
  // A random flip direction (kept in a ref to unflip it later in the same way)
  const directionRef = useRef<"x" | "y">(Math.random() < 0.5 ? "x" : "y");

  // Return all that is needed to trigger the animation
  return { LOAD_ENTERING, LOAD_EXITING, direction: directionRef.current, AnimatedLinearGradient };
}
