// react
import { useEffect } from "react";

// other libraries
import { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";

// types
import type { Difficulty } from "@/types/shared";
import type { ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

// constants
const DELAY = 60;

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
  return { animStyleEasyTab, animStyleMediumTab, animStyleHardTab, animStyleEasyEntries, animStyleMediumEntries, animStyleHardEntries };
}

// Helper hook for a single high score tab transition
function useAnimHighScoreTab(isHighScoreTabFocused: boolean = false) {
  // Animate the high score tab to smoothly transition between focused and unfocused states
  return { animStyle: useAnimatedStyle(() => ({ height: withSpring(isHighScoreTabFocused ? 90 : 64, { stiffness: 300, damping: 30, mass: 4 }) })) };
}

// Helper hook for a single high score entry transition
function useAnimHighScoreEntry(entryIndex: number, highScoreTab: Difficulty) {
  // Animate the high score entry with a staggered timing transition
  const left = useSharedValue<number>(-50);

  // Trigger the animation when the entry index changes and restart it when the high score tab changes
  useEffect(() => {
    left.value = -50;
    left.value = withDelay(entryIndex * DELAY, withSpring(0, { stiffness: 300, damping: 30, mass: 4 }));
  }, [entryIndex, highScoreTab]);

  return { animStyle: useAnimatedStyle(() => ({ left: left.value })) };
}
