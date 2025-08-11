// react
import { useState } from "react";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

// constants
const TURNS_TEXT_HEIGHT = 58;

// Encapsulate the animation logic in a custom hook
export default function useAnimTabTurns(turns: number) {
  // To control the vertical translation of the animated view
  const translateY = useSharedValue(0);

  // To show the "old" number of turns as the "new" one slides in
  const [prevTurns, setPrevTurns] = useState(turns);

  // Trigger the animation when the number of turns changes
  useDidUpdateEffect(() => {
    // This translation moves the "old" number of turns out of view and brings the "new" one into view
    translateY.value = withSpring(-TURNS_TEXT_HEIGHT, { stiffness: 100, damping: 10, mass: 1.2 }, (isFinished) => isFinished && runOnJS(setPrevTurns)(turns));
  }, [turns]);

  // Reset the translation when the "old" number of turns changes (avoids the flicker effect)
  useDidUpdateEffect(() => {
    translateY.value = 0;
  }, [prevTurns]);

  // Return all that is needed to trigger the animation
  return { TURNS_TEXT_HEIGHT, animStyle: useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] })), prevTurns };
}
