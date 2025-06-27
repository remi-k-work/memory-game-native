// react
import { useCallback, useEffect, useState } from "react";

// expo
import { useFocusEffect } from "expo-router";

// other libraries
import { runOnJS, useFrameCallback, useSharedValue } from "react-native-reanimated";
import useSharedValues from "./useSharedValues";

// types
import type { AnimationGenerator, AnimationInitState } from "@/features/animations/types";

// The animation player, which continuously feeds delta time into the animation script, allowing it to control the animation state
export default function useAnimationInf<S extends AnimationInitState>(animationGenerator: AnimationGenerator<S>, animationInitState: S) {
  // Those are "boxes that hold numbers" we want to change over time (aka "animated state")
  const animationSharedValues = useSharedValues<S>(animationInitState);

  // Hold the single instance of the animation generator that will drive the entire animation
  const generatorOnUIThread = useSharedValue<null | ReturnType<AnimationGenerator<S>>>(null);

  // To track if the animation has finished its current cycle (for non-looping animations)
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // The animation player loop, running frame by frame
  const { setActive } = useFrameCallback(({ timeSincePreviousFrame: deltaTime }) => {
    // Initialize the animation generator if it has not been done already
    if (!generatorOnUIThread.value) generatorOnUIThread.value = animationGenerator(animationSharedValues);

    // Advance the animation generator, passing the delta time to it
    const { done } = generatorOnUIThread.value.next(deltaTime ?? 0);

    // If the animation generator is done, mark the animation as finished
    if (done) runOnJS(setIsAnimationFinished)(true);
  }, false);

  // Helper function to restart the animation and reset its state
  const restartAnimation = useCallback(() => {
    // Reset the animation shared values to their initial state
    for (const key in animationInitState) animationSharedValues[key].value = animationInitState[key];

    // Reset the animation generator itself; setting it to "null" will cause the useFrameCallback to re-initialize it (making it start from scratch)
    generatorOnUIThread.value = null;

    // Reset the finished flag to allow re-running the animation
    setIsAnimationFinished(false);
  }, [animationInitState, animationSharedValues, generatorOnUIThread]);

  // This block runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Restart the animation and reset its state
      restartAnimation();

      // Activate the frame callback
      setActive(true);

      // This return function acts as a cleanup and runs when the screen loses focus
      return () => {
        // Deactivate the frame callback on blur
        setActive(false);
      };
    }, [restartAnimation]),
  );

  // This handles cases where the animation has finished its current cycle
  useEffect(() => {
    // Deactivate the frame callback as it is no longer needed
    if (isAnimationFinished) setActive(false);
  }, [isAnimationFinished]);

  // This handles cases where the component is unmounted (e.g., navigating away completely)
  // This is crucial for stopping animations and cleaning up resources
  useEffect(() => {
    // Deactivate the frame callback on unmount
    return () => setActive(false);
  }, []);

  // Return the animation shared values so they can be used in components
  return animationSharedValues;
}
