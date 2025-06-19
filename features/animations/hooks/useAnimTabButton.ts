// react
import { useCallback, useMemo } from "react";

// other libraries
import spring from "@/features/animations/generators/spring";
import useAnimation from "@/features/animations/hooks/useAnimation";
import useColorScheme from "@/hooks/useColorScheme";
import { interpolateColor, useAnimatedProps, useAnimatedStyle } from "react-native-reanimated";

// types
import type { AnimationGenerator } from "@/features/animations/types";

// constants
import { COLORS } from "@/constants/colors";

// Encapsulate the animation logic in a custom hook
export default function useAnimTabButton(isFocused = false) {
  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary, primaryForeground, secondaryForeground } = COLORS[colorScheme];

  // The main animation generator
  const animationGenerator: AnimationGenerator<typeof animationInitState> = useCallback(
    function* ({
      isFocusedFlag,
      backgroundColor,
      isBackgroundColorComplete,
      width,
      isWidthComplete,
      borderRadius,
      isBorderRadiusComplete,
      fill,
      isFillComplete,
    }) {
      "worklet";

      while (true) {
        yield* spring(backgroundColor, interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primary, secondary]), isBackgroundColorComplete, {
          damping: 80,
          stiffness: 200,
        });
        yield* spring(width, isFocusedFlag.value ? 90 : 60, isWidthComplete);
        yield* spring(borderRadius, isFocusedFlag.value ? "25%" : "50%", isBorderRadiusComplete);
        yield* spring(fill, interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), isFillComplete, {
          damping: 80,
          stiffness: 200,
        });
      }
    },
    [primary, secondary, primaryForeground, secondaryForeground],
  );

  // The main animation initial state
  const animationInitState = useMemo(
    () => ({
      isFocusedFlag: isFocused,
      backgroundColor: secondary,
      isBackgroundColorComplete: false,
      width: 60,
      isWidthComplete: false,
      borderRadius: "50%",
      isBorderRadiusComplete: false,
      fill: secondaryForeground,
      isFillComplete: false,
    }),
    [isFocused, secondary, secondaryForeground],
  );

  // Start the animation player with the main animation script
  const { backgroundColor, width, borderRadius, fill } = useAnimation(animationGenerator, animationInitState);

  // Animate the button to smoothly transition between focused and unfocused states
  const buttonAnimatedStyle = useAnimatedStyle(() => ({ backgroundColor: backgroundColor.value, width: width.value, borderRadius: borderRadius.value }));

  // Do the same for the icon
  const iconAnimatedProps = useAnimatedProps(() => ({ fill: fill.value }));

  // Return all that is needed to trigger the animation
  return { buttonAnimatedStyle, iconAnimatedProps };
}
