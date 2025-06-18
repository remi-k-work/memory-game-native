// react
import { useCallback } from "react";

// other libraries
import { type SharedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";
import useSharedValues from "./useSharedValues";

// types
import type { AnimationGenerator, AnimationInitState } from "@/features/animations/types";

// The animation player, which continuously feeds delta time into the animation script, allowing it to control the animation state
export default function useAnimation<S extends AnimationInitState>(
  animationGenerator: AnimationGenerator<S>,
  animationInitState: S,
  isPaused?: SharedValue<boolean>,
) {
  // Those are "boxes that hold numbers" we want to change over time (aka "animated state")
  const animationSharedValues = useSharedValues<S>(animationInitState);

  // Hold the single instance of the animation generator that will drive the entire animation
  const generatorOnUIThread = useSharedValue<null | ReturnType<AnimationGenerator<S>>>(null);

  // Function to reset the generator, making it start from scratch
  const resetAnimationGenerator = useCallback(() => {
    // Setting it to null will cause the useFrameCallback to re-initialize it
    generatorOnUIThread.value = null;
  }, []); // No dependencies, as generatorOnUIThread is a shared value ref

  // The animation player loop, running frame by frame
  useFrameCallback(({ timeSincePreviousFrame: deltaTime }) => {
    // Initialize the animation generator if it has not been done already
    if (!generatorOnUIThread.value) generatorOnUIThread.value = animationGenerator(animationSharedValues);

    // Advance the animation generator, passing the delta time to it, but only if not paused
    if (!isPaused?.value) generatorOnUIThread.value.next(deltaTime ?? 0);
  });

  // Return the animation shared values so they can be used in components
  return { animationSharedValues, resetAnimationGenerator };
}
