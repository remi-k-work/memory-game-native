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

interface AnimationState {
  [key: string]: number;
}

// constants
const MIN_DELAY = 1000;
const MAX_DELAY = 2000;
const DURATION = 600;

const ICON_LETTER = "WrenchScrewDriver";
const TEXT_CONTENT = "Settings";
const ANIMATED_ITEMS = [ICON_LETTER, ...TEXT_CONTENT.split("")];

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
  const flipLetterGenerators = ANIMATED_ITEMS.map((_, index) =>
    flipLetter(animationSharedValues[`rotateValueR${index}`], animationSharedValues[`rotateValueF${index}`]),
  );

  // Run all those animation scripts concurrently
  yield* parallel(...flipLetterGenerators);
};

// The main animation initial state
const animationInitState = ANIMATED_ITEMS.reduce(
  (acc: AnimationState, _, index) => ({ ...acc, [`rotateValueR${index}`]: 0, [`rotateValueF${index}`]: 180 }),
  {},
);

export default function SettingsTitle() {
  const animationSharedValues = useAnimation(animationGenerator, animationInitState);

  return (
    <>
      {ANIMATED_ITEMS.map((letter, index) => (
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
