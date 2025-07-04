// react
import { useEffect } from "react";

// other libraries
import { FadeInRight, FadeOutLeft, useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

// types
import type { Difficulty } from "@/types/shared";
import type { ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

// constants
const DELAY = 60;
const TAB_CONTENT_ENTERING = FadeInRight.springify().damping(80).mass(2).stiffness(50);
const TAB_CONTENT_EXITING = FadeOutLeft.springify().damping(80).mass(2).stiffness(50);

// Encapsulate the animation logic in a custom hook
export default function useAnimHighScoreTabs(highScoreTab: Difficulty) {
  // Animate each high score tab to smoothly transition between focused and unfocused states
  const { animStyle: animStyleEasyTab } = useAnimHighScoreTab(highScoreTab === "easy");
  const { animStyle: animStyleMediumTab } = useAnimHighScoreTab(highScoreTab === "medium");
  const { animStyle: animStyleHardTab } = useAnimHighScoreTab(highScoreTab === "hard");

  // Animate each high score entry with a staggered timing transition
  const allAnimStyleEntries: AnimatedStyle<ViewStyle>[] = Array.from({ length: 10 }, (_, i) => useAnimHighScoreEntry(i, highScoreTab).animStyle);

  // Conditionally assign the arrays based on the active high score tab
  const animStyleEasyEntries = highScoreTab === "easy" ? allAnimStyleEntries : undefined;
  const animStyleMediumEntries = highScoreTab === "medium" ? allAnimStyleEntries : undefined;
  const animStyleHardEntries = highScoreTab === "hard" ? allAnimStyleEntries : undefined;

  // Return all that is needed to trigger the animation
  return {
    TAB_CONTENT_ENTERING,
    TAB_CONTENT_EXITING,
    animStyleEasyTab,
    animStyleMediumTab,
    animStyleHardTab,
    animStyleEasyEntries,
    animStyleMediumEntries,
    animStyleHardEntries,
  };
}

// Helper hook for a single high score tab transition
function useAnimHighScoreTab(isHighScoreTabFocused: boolean = false) {
  // Animate the high score tab to smoothly transition between focused and unfocused states
  return {
    animStyle: useAnimatedStyle(() => ({ height: withSpring(isHighScoreTabFocused ? 90 : 64) })),
  };
}

// Helper hook for a single high score entry transition
function useAnimHighScoreEntry(entryIndex: number, highScoreTab: Difficulty) {
  // Animate the high score entry with a staggered timing transition
  const left = useSharedValue<number>(-50);

  // Trigger the animation when the entry index changes and restart it when the high score tab changes
  useEffect(() => {
    left.value = -50;
    left.value = withDelay(entryIndex * DELAY, withSpring(0));
  }, [entryIndex, highScoreTab]);

  return {
    animStyle: useAnimatedStyle(() => ({ left: left.value })),
  };
}
