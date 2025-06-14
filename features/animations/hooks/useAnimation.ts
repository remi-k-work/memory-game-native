// other libraries
import { type SharedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";
import useSharedValues from "./useSharedValues";

// types
import type { Animation, AnimationState } from "@/features/animations/types";

// This is the core hook that orchestrates the generator-based animations
export default function useAnimation<S extends AnimationState>(input: Animation<S> | (() => Generator), isPaused?: SharedValue<boolean>) {
  const { animation, state } = typeof input === "function" ? { animation: input, state: {} as S } : input;

  // Initialize shared values based on the animation's state
  const values = useSharedValues(state);

  // Hold the single instance of the generator that will drive the animation
  const generator = useSharedValue<null | Generator>(null);

  useFrameCallback(({ timeSincePreviousFrame: ts }) => {
    // Initialize the generator if it has not been done already
    if (!generator.value) generator.value = animation(values);

    // Advance the generator, passing the timeSincePreviousFrame() value to it if not paused
    if (!isPaused?.value) generator.value.next(ts);
  });

  // Return the shared values so they can be used in components
  return values;
}
