// react
import { useCallback, useEffect, useMemo } from "react";

// expo
import { usePathname } from "expo-router";

// other libraries
import parallel from "@/features/animations/generators/parallel";
import spring from "@/features/animations/generators/spring";
import useAnimationInf from "@/features/animations/hooks/useAnimationInf";
import useColorScheme from "@/hooks/useColorScheme";
import { interpolateColor } from "react-native-reanimated";

// types
import type { AnimationGenerator } from "@/features/animations/types";
import type { ColorValue } from "react-native";
import type { SharedValue } from "react-native-reanimated";

// constants
import { COLORS } from "@/constants/colors";

// Encapsulate the animation logic in a custom hook
export default function useAnimTabs() {
  // To establish which tab button is focused
  const pathname = usePathname();

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary, primaryForeground, secondaryForeground } = COLORS[colorScheme];

  // Helper generator function for a single tab button transition
  const animateTabButton = useCallback(
    function* (
      isTabFocused: SharedValue<boolean>,
      backgroundColor: SharedValue<string>,
      width: SharedValue<number>,
      borderRadius: SharedValue<string>,
      fill: SharedValue<ColorValue | undefined>,
    ) {
      "worklet";

      // Animate the tab button to smoothly transition between focused and unfocused states
      yield* parallel(
        spring(backgroundColor, interpolateColor(isTabFocused.value ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
        spring(width, isTabFocused.value ? 90 : 60),
        spring(borderRadius, isTabFocused.value ? "25%" : "50%"),
        spring(fill, interpolateColor(isTabFocused.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), { damping: 80, stiffness: 200 }),
      );
    },
    [primary, secondary, primaryForeground, secondaryForeground],
  );

  // The main animation generator
  const animationGenerator: AnimationGenerator<typeof animationInitState> = useCallback(
    function* ({
      isTabIndexFocused,
      isTabSettingsFocused,
      isTabHighScoresFocused,
      backgroundColorIndex,
      widthIndex,
      borderRadiusIndex,
      fillIndex,
      backgroundColorSettings,
      widthSettings,
      borderRadiusSettings,
      fillSettings,
      backgroundColorHighScores,
      widthHighScores,
      borderRadiusHighScores,
      fillHighScores,
    }) {
      "worklet";

      while (true) {
        yield* parallel(
          animateTabButton(isTabIndexFocused, backgroundColorIndex, widthIndex, borderRadiusIndex, fillIndex),
          animateTabButton(isTabSettingsFocused, backgroundColorSettings, widthSettings, borderRadiusSettings, fillSettings),
          animateTabButton(isTabHighScoresFocused, backgroundColorHighScores, widthHighScores, borderRadiusHighScores, fillHighScores),
        );
      }
    },
    [animateTabButton],
  );

  // The main animation initial state
  const animationInitState = useMemo(
    () => ({
      isTabIndexFocused: false,
      isTabSettingsFocused: false,
      isTabHighScoresFocused: false,
      backgroundColorIndex: secondary as string,
      widthIndex: 60,
      borderRadiusIndex: "50%",
      fillIndex: secondaryForeground as ColorValue | undefined,
      backgroundColorSettings: secondary as string,
      widthSettings: 60,
      borderRadiusSettings: "50%",
      fillSettings: secondaryForeground as ColorValue | undefined,
      backgroundColorHighScores: secondary as string,
      widthHighScores: 60,
      borderRadiusHighScores: "50%",
      fillHighScores: secondaryForeground as ColorValue | undefined,
    }),
    [secondary, secondaryForeground],
  );

  // Start the animation player with the main animation script
  const {
    isTabIndexFocused,
    isTabSettingsFocused,
    isTabHighScoresFocused,
    backgroundColorIndex,
    widthIndex,
    borderRadiusIndex,
    fillIndex,
    backgroundColorSettings,
    widthSettings,
    borderRadiusSettings,
    fillSettings,
    backgroundColorHighScores,
    widthHighScores,
    borderRadiusHighScores,
    fillHighScores,
  } = useAnimationInf(animationGenerator, animationInitState);

  // Establish which tab button is focused
  useEffect(() => {
    isTabIndexFocused.value = pathname === "/";
    isTabSettingsFocused.value = pathname === "/settings";
    isTabHighScoresFocused.value = pathname === "/high-scores";
  }, [pathname]);

  // Return all that is needed to trigger the animation
  return {
    backgroundColorIndex,
    widthIndex,
    borderRadiusIndex,
    fillIndex,
    backgroundColorSettings,
    widthSettings,
    borderRadiusSettings,
    fillSettings,
    backgroundColorHighScores,
    widthHighScores,
    borderRadiusHighScores,
    fillHighScores,
  };
}
