// other libraries
import { type SharedValue, useFrameCallback, useSharedValue } from "react-native-reanimated";
import useSharedValues from "./useSharedValues";

// types
import type { Animation } from "@/features/animations/types";

// This is the core hook that orchestrates the generator-based animations
export default function useAnimation(animation: Animation, isPaused?: SharedValue<boolean>) {
  // Initialize animation shared values for each property in the provided initial animation state object
  // Those are "boxes that hold numbers" we want to change over time
  const animationSharedValues = useSharedValues(animation.animationInitState);

  // Hold the single instance of the animation generator that will drive the entire animation
  const animationGenerator = useSharedValue<null | Generator>(null);

  // The "animation player", which we feed a script (our animation generator), and it plays it back frame by frame
  useFrameCallback(({ timeSincePreviousFrame }) => {
    // Initialize the animation generator if it has not been done already
    if (!animationGenerator.value) animationGenerator.value = animation.animationGenerator(animationSharedValues);

    // Advance the animation generator, passing the timeSincePreviousFrame value to it, but only if not paused
    if (!isPaused?.value) animationGenerator.value.next(timeSincePreviousFrame);
  });

  // Return the animation shared values so they can be used in components
  return animationSharedValues;
}
