// react
import { useCallback, useMemo } from "react";

// other libraries
import parallel from "@/features/animations/generators/parallel";
import timing from "@/features/animations/generators/timing";
import wait from "@/features/animations/generators/wait";
import useAnimationInf from "@/features/animations/hooks/useAnimationInf";

// types
import type { AnimationGenerator } from "@/features/animations/types";
import type { SharedValue } from "react-native-reanimated";

interface AnimationState {
  [key: string]: number;
}

// constants
const MIN_DELAY = 1000;
const MAX_DELAY = 2000;
const DURATION = 600;

// Encapsulate the animation logic in a custom hook
export default function useAnimFlippingTitle(ANIMATED_ITEMS: string[]) {
  // The main animation generator
  const animationGenerator: AnimationGenerator<typeof animationInitState> = useCallback(
    function* (animationSharedValues) {
      "worklet";

      // Create an array of individual flipLetter generators
      const flipLetterGenerators = ANIMATED_ITEMS.map((_, index) =>
        flipLetter(animationSharedValues[`rotateValueR${index}`], animationSharedValues[`rotateValueF${index}`]),
      );

      // Run all those animation scripts concurrently
      yield* parallel(...flipLetterGenerators);
    },
    [ANIMATED_ITEMS],
  );

  // The main animation initial state
  const animationInitState = useMemo(
    () => ANIMATED_ITEMS.reduce((acc: AnimationState, _, index) => ({ ...acc, [`rotateValueR${index}`]: 0, [`rotateValueF${index}`]: 180 }), {}),
    [ANIMATED_ITEMS],
  );

  // Start the animation player with the main animation script
  const animationSharedValues = useAnimationInf(animationGenerator, animationInitState);

  // Return all that is needed to trigger the animation
  return { animationSharedValues };
}

// Helper generator function for a single letter flip
function* flipLetter(rotateValueR: SharedValue<number>, rotateValueF: SharedValue<number>) {
  "worklet";

  // To produce the staggered children effect, trigger the flip animation on the mount after a random delay
  yield* wait(Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY);
  yield* parallel(timing(rotateValueR, { to: 180, duration: DURATION }), timing(rotateValueF, { to: 360, duration: DURATION }));
}
