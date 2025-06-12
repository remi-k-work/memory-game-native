// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { FadeInRight, FadeOutLeft, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// types
import type { Difficulty } from "@/types/shared";

// constants
const TAB_CONTENT_ENTERING = FadeInRight.springify().damping(80).mass(2).stiffness(50);
const TAB_CONTENT_EXITING = FadeOutLeft.springify().damping(80).mass(2).stiffness(50);

// Encapsulate the animation logic in a custom hook
export default function useAnimHighScores(difficultyTab: Difficulty) {
  // Shared values to track if each difficulty tab trigger is focused that drives the animation
  const isEasyDifficultyTab = useSharedValue(difficultyTab === "easy");
  const isMediumDifficultyTab = useSharedValue(difficultyTab === "medium");
  const isHardDifficultyTab = useSharedValue(difficultyTab === "hard");

  // To keep the shared values in sync with the currently active difficulty tab
  useDidUpdateEffect(() => {
    isEasyDifficultyTab.value = difficultyTab === "easy";
    isMediumDifficultyTab.value = difficultyTab === "medium";
    isHardDifficultyTab.value = difficultyTab === "hard";
  }, [difficultyTab]);

  // Animate each difficulty tab trigger to smoothly transition between focused and unfocused states
  const easyTabTriggerAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(isEasyDifficultyTab.value ? 90 : 64, { damping: 80, mass: 2, stiffness: 50 }),
  }));
  const mediumTabTriggerAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(isMediumDifficultyTab.value ? 90 : 64, { damping: 80, mass: 2, stiffness: 50 }),
  }));
  const hardTabTriggerAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(isHardDifficultyTab.value ? 90 : 64, { damping: 80, mass: 2, stiffness: 50 }),
  }));

  // Return all that is needed to trigger the animation
  return { easyTabTriggerAnimatedStyle, mediumTabTriggerAnimatedStyle, hardTabTriggerAnimatedStyle, TAB_CONTENT_ENTERING, TAB_CONTENT_EXITING };
}
