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

interface LetterRotationState {
  rotateValueR: number;
  rotateValueF: number;
}

// constants
const MIN_DELAY = 1000;
const MAX_DELAY = 2000;
const DURATION = 600;

function* flipLetter(rotateValueR: SharedValue<number>, rotateValueF: SharedValue<number>) {
  "worklet";

  // To produce the staggered children effect, trigger the flip animation on the mount after a random delay
  yield* wait(Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY);
  yield* parallel(timing(rotateValueR, { to: 180, duration: DURATION }), timing(rotateValueF, { to: 360, duration: DURATION }));
}

const animationGenerator: AnimationGenerator<typeof animationInitState> = function* ({
  rvR01,
  rvF01,
  rvR02,
  rvF02,
  rvR03,
  rvF03,
  rvR04,
  rvF04,
  rvR05,
  rvF05,
  rvR06,
  rvF06,
  rvR07,
  rvF07,
  rvR08,
  rvF08,
  rvR09,
  rvF09,
}) {
  "worklet";

  while (true) {
    // To produce the staggered children effect, trigger the flip animation on the mount after a random delay
    yield* parallel(
      flipLetter(rvR01, rvF01),
      flipLetter(rvR02, rvF02),
      flipLetter(rvR03, rvF03),
      flipLetter(rvR04, rvF04),
      flipLetter(rvR05, rvF05),
      flipLetter(rvR06, rvF06),
      flipLetter(rvR07, rvF07),
      flipLetter(rvR08, rvF08),
      flipLetter(rvR09, rvF09),
    );
  }
};
const animationInitState = {
  rvR01: 0,
  rvF01: 180,
  rvR02: 0,
  rvF02: 180,
  rvR03: 0,
  rvF03: 180,
  rvR04: 0,
  rvF04: 180,
  rvR05: 0,
  rvF05: 180,
  rvR06: 0,
  rvF06: 180,
  rvR07: 0,
  rvF07: 180,
  rvR08: 0,
  rvF08: 180,
  rvR09: 0,
  rvF09: 180,
};

export default function SettingsTitle() {
  const { rvR01, rvF01, rvR02, rvF02, rvR03, rvF03, rvR04, rvF04, rvR05, rvF05, rvR06, rvF06, rvR07, rvF07, rvR08, rvF08, rvR09, rvF09 } = useAnimation(
    animationGenerator,
    animationInitState,
  );

  // This block runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      rvR01.value = rvR02.value = rvR03.value = rvR04.value = rvR05.value = rvR06.value = rvR07.value = rvR08.value = rvR09.value = 0;
      rvF01.value = rvF02.value = rvF03.value = rvF04.value = rvF05.value = rvF06.value = rvF07.value = rvF08.value = rvF09.value = 180;
      // This return function acts as a cleanup and runs when the screen loses focus
      return () => {
        rvR01.value = rvR02.value = rvR03.value = rvR04.value = rvR05.value = rvR06.value = rvR07.value = rvR08.value = rvR09.value = 0;
        rvF01.value = rvF02.value = rvF03.value = rvF04.value = rvF05.value = rvF06.value = rvF07.value = rvF08.value = rvF09.value = 180;
      };
    }, []),
  );

  return (
    <>
      <FlippingLetter letter="WrenchScrewDriver" rotateValueR={rvR01} rotateValueF={rvF01} />
      <FlippingLetter letter="S" rotateValueR={rvR02} rotateValueF={rvF02} />
      <FlippingLetter letter="e" rotateValueR={rvR03} rotateValueF={rvF03} />
      <FlippingLetter letter="t" rotateValueR={rvR04} rotateValueF={rvF04} />
      <FlippingLetter letter="t" rotateValueR={rvR05} rotateValueF={rvF05} />
      <FlippingLetter letter="i" rotateValueR={rvR06} rotateValueF={rvF06} />
      <FlippingLetter letter="n" rotateValueR={rvR07} rotateValueF={rvF07} />
      <FlippingLetter letter="g" rotateValueR={rvR08} rotateValueF={rvF08} />
      <FlippingLetter letter="s" rotateValueR={rvR09} rotateValueF={rvF09} />
    </>
  );
}
