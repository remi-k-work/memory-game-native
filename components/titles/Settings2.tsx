// react
import { useCallback } from "react";

// expo
import { useFocusEffect } from "expo-router";

// other libraries
import parallel from "@/features/animations/generators/parallel";
import timing from "@/features/animations/generators/timing";
import wait from "@/features/animations/generators/wait";
import useAnimation from "@/features/animations/hooks/useAnimation";

// components
import FlippingLetter from "@/components/FlippingLetter2";

// types
import type { AnimationGenerator } from "@/features/animations/types";
import type { SharedValue } from "react-native-reanimated";

// constants
const MIN_DELAY = 1000;
const MAX_DELAY = 2000;
const DURATION = 600;

const TEXT_CONTENT = "Settings";
const ICON_LETTER = "WrenchScrewDriver";

function createAnimationInitState(count: number) {
  const state: { [key: string]: number } = {};
  for (let i = 0; i < count; i++) {
    state[`rotateValueR${i}`] = 0;
    state[`rotateValueF${i}`] = 180;
  }
  return state;
}

// Helper generator function for a single letter flip
function* flipLetter(rotateValueR: SharedValue<number>, rotateValueF: SharedValue<number>) {
  "worklet";

  // To produce the staggered children effect, trigger the flip animation on the mount after a random delay
  yield* wait(Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY);
  yield* parallel(timing(rotateValueR, { to: 180, duration: DURATION }), timing(rotateValueF, { to: 360, duration: DURATION }));
}

// The main animation generator
const animationGenerator: AnimationGenerator<typeof animationInitState> = function* (animationSharedValues) {
  "worklet";

  // Create an array of individual flipLetter generators
  const flipLetterGenerators: ReturnType<typeof flipLetter>[] = [];
  for (let i = 0; i < TEXT_CONTENT.length + 1; i++) {
    flipLetterGenerators.push(flipLetter(animationSharedValues[`rotateValueR${i}`], animationSharedValues[`rotateValueF${i}`]));
  }

  while (true) yield* parallel(...flipLetterGenerators);
};
const animationInitState = createAnimationInitState(TEXT_CONTENT.length + 1);

export default function SettingsTitle() {
  const { animationSharedValues, resetAnimationGenerator } = useAnimation(animationGenerator, animationInitState);

  // This block runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset the shared values to their initial state
      for (let i = 0; i < TEXT_CONTENT.length + 1; i++) {
        animationSharedValues[`rotateValueR${i}`].value = 0;
        animationSharedValues[`rotateValueF${i}`].value = 180;
      }

      // Reset the animation generator itself
      resetAnimationGenerator();

      // This return function acts as a cleanup and runs when the screen loses focus
      return () => {
        // Reset values when leaving focus (can be useful for instant reset on back)
        for (let i = 0; i < TEXT_CONTENT.length + 1; i++) {
          animationSharedValues[`rotateValueR${i}`].value = 0;
          animationSharedValues[`rotateValueF${i}`].value = 180;
        }

        // This is usually a good idea to prevent the generator from running off-screen for too long
        resetAnimationGenerator();
      };
    }, [animationSharedValues, resetAnimationGenerator]),
  );

  const lettersToRender = [ICON_LETTER, ...TEXT_CONTENT.split("")];

  return (
    <>
      {lettersToRender.map((letter, index) => (
        <FlippingLetter
          key={index}
          letter={letter}
          rotateValueR={animationSharedValues[`rotateValueR${index}`]}
          rotateValueF={animationSharedValues[`rotateValueF${index}`]}
        />
      ))}
    </>
  );
}
