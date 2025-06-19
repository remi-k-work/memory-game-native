// react
import { useCallback, useEffect } from "react";

// expo
import { useFocusEffect } from "expo-router";

// other libraries
import { type SharedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";
import useSharedValues from "./useSharedValues";

// types
import type { AnimationGenerator, AnimationInitState } from "@/features/animations/types";

// The animation player, which continuously feeds delta time into the animation script, allowing it to control the animation state
export default function useAnimation<S extends AnimationInitState>(
  animationGenerator: AnimationGenerator<S>,
  animationInitState: S,
  isPausedExternal?: SharedValue<boolean>,
) {
  // Those are "boxes that hold numbers" we want to change over time (aka "animated state")
  const animationSharedValues = useSharedValues<S>(animationInitState);

  // Hold the single instance of the animation generator that will drive the entire animation
  const generatorOnUIThread = useSharedValue<null | ReturnType<AnimationGenerator<S>>>(null);

  // To track if the animation has finished its current cycle (for non-looping animations)
  const isAnimationFinished = useSharedValue(false);

  // To control animation pause state based on screen focus ("true" when out of focus, "false" when in focus)
  const isPausedInternal = useSharedValue(false);

  // Helper function to reset all animation shared values to their initial state and reset the generator/finished flag
  const resetAnimationState = useCallback(() => {
    // Reset the animation shared values to their initial state
    for (const key in animationInitState) animationSharedValues[key].value = animationInitState[key];

    // Reset the animation generator itself; setting it to "null" will cause the useFrameCallback to re-initialize it (making it start from scratch)
    generatorOnUIThread.value = null;

    // Reset the finished flag to allow re-running the animation
    isAnimationFinished.value = false;
  }, [animationInitState, animationSharedValues, generatorOnUIThread, isAnimationFinished]);

  // This block runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Unpause the animation
      isPausedInternal.value = false;

      // Reset when screen comes into focus (or when the screen is shown again)
      resetAnimationState();

      // This return function acts as a cleanup and runs when the screen loses focus
      return () => {
        // Pause the animation when screen loses focus
        isPausedInternal.value = true;

        // Reset values and generator when leaving focus
        resetAnimationState();
      };
    }, [isPausedInternal, resetAnimationState]),
  );

  // This handles cases where the component is unmounted (e.g., navigating away completely)
  // This is crucial for stopping animations and cleaning up resources
  useEffect(() => {
    return () => resetAnimationState();
  }, [resetAnimationState]);

  // The animation player loop, running frame by frame
  useFrameCallback(({ timeSincePreviousFrame: deltaTime }) => {
    // Determine overall pause state: paused if internal (focus-based) or external (prop-based)
    const isOverallPaused = isPausedInternal.value || isPausedExternal?.value;

    // Only proceed if the animation is not already finished nor paused
    if (isAnimationFinished.value || isOverallPaused) return;

    // Initialize the animation generator if it has not been done already
    if (!generatorOnUIThread.value) generatorOnUIThread.value = animationGenerator(animationSharedValues);

    // Advance the animation generator, passing the delta time to it
    const { done } = generatorOnUIThread.value.next(deltaTime ?? 0);

    // If the animation generator is done, mark the animation as finished
    // This prevents the generator from being re-initialized on subsequent frames
    if (done) {
      // Clear the current animation generator instance
      generatorOnUIThread.value = null;

      // Mark as definitively finished
      isAnimationFinished.value = true;
    }
  });

  // Return the animation shared values so they can be used in components
  return animationSharedValues;
}
