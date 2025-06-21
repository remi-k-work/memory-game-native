// react
import { useCallback, useMemo } from "react";

// expo
import { usePathname } from "expo-router";

// other libraries
import parallel from "@/features/animations/generators/parallel";
import spring from "@/features/animations/generators/spring";
import useAnimation from "@/features/animations/hooks/useAnimation";
import useColorScheme from "@/hooks/useColorScheme";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { interpolateColor } from "react-native-reanimated";

// types
import type { AnimationGenerator } from "@/features/animations/types";
import type { ColorValue } from "react-native";

// constants
import { COLORS } from "@/constants/colors";

// Encapsulate the animation logic in a custom hook
export default function useAnimTabs() {
  const pathname = usePathname();

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary, primaryForeground, secondaryForeground } = COLORS[colorScheme];

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
          spring(backgroundColorIndex, interpolateColor(isTabIndexFocused.value ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
          spring(widthIndex, isTabIndexFocused.value ? 90 : 60),
          spring(borderRadiusIndex, isTabIndexFocused.value ? "25%" : "50%"),
          spring(fillIndex, interpolateColor(isTabIndexFocused.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), {
            damping: 80,
            stiffness: 200,
          }),

          spring(backgroundColorSettings, interpolateColor(isTabSettingsFocused.value ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
          spring(widthSettings, isTabSettingsFocused.value ? 90 : 60),
          spring(borderRadiusSettings, isTabSettingsFocused.value ? "25%" : "50%"),
          spring(fillSettings, interpolateColor(isTabSettingsFocused.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), {
            damping: 80,
            stiffness: 200,
          }),

          spring(backgroundColorHighScores, interpolateColor(isTabHighScoresFocused.value ? 1 : 0, [1, 0], [primary, secondary]), {
            damping: 80,
            stiffness: 200,
          }),
          spring(widthHighScores, isTabHighScoresFocused.value ? 90 : 60),
          spring(borderRadiusHighScores, isTabHighScoresFocused.value ? "25%" : "50%"),
          spring(fillHighScores, interpolateColor(isTabHighScoresFocused.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), {
            damping: 80,
            stiffness: 200,
          }),
        );
      }
    },
    [primary, secondary, primaryForeground, secondaryForeground],
  );

  // The main animation initial state
  const animationInitState = useMemo(
    () => ({
      isTabIndexFocused: pathname === "/",
      isTabSettingsFocused: pathname === "/settings",
      isTabHighScoresFocused: pathname === "/high-scores",
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
    [pathname, secondary, secondaryForeground],
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
  } = useAnimation(animationGenerator, animationInitState);

  // To keep the shared value in sync with the prop
  useDidUpdateEffect(() => {
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
