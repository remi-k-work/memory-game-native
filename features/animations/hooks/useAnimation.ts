// other libraries
import { type SharedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";
import useSharedValues from "./useSharedValues";

// types
import type { AnimationGenerator, AnimationInitState } from "@/features/animations/types";

// A persistent "time driver" that continuously feeds elapsed time into the animation generator, allowing it to control the animation state
export default function useAnimation(animationGenerator: AnimationGenerator, animationInitState: AnimationInitState, isPaused?: SharedValue<boolean>) {
  // Those are "boxes that hold numbers" we want to change over time (aka "animated state")
  const animationSharedValues = useSharedValues(animationInitState);

  // Hold the single instance of the animation generator that will drive the entire animation
  const generatorOnUIThread = useSharedValue<null | Generator>(null);

  // The "animation player", which we feed a script (our animation generator), and it plays it back frame by frame (aka "time driver")
  useFrameCallback(({ timeSincePreviousFrame }) => {
    // Initialize the animation generator if it has not been done already
    if (!generatorOnUIThread.value) generatorOnUIThread.value = animationGenerator(animationSharedValues);

    // Advance the animation generator, passing the timeSincePreviousFrame value to it, but only if not paused
    if (!isPaused?.value) generatorOnUIThread.value.next(timeSincePreviousFrame);
  });

  // Return the animation shared values so they can be used in components
  return animationSharedValues;
}
