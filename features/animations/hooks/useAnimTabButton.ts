// react
import { useCallback, useMemo } from "react";

// other libraries
import parallel from "@/features/animations/generators/parallel";
import spring from "@/features/animations/generators/spring";
import useAnimation from "@/features/animations/hooks/useAnimation";
import useColorScheme from "@/hooks/useColorScheme";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { interpolateColor } from "react-native-reanimated";

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
    function* ({ isTabFocused, backgroundColor, width, borderRadius, fill }) {
      "worklet";

      while (true) {
        yield* parallel(
          spring(backgroundColor, interpolateColor(isTabFocused.value ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
          spring(width, isTabFocused.value ? 90 : 60),
          spring(borderRadius, isTabFocused.value ? "25%" : "50%"),
          spring(fill, interpolateColor(isTabFocused.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), { damping: 80, stiffness: 200 }),
        );
      }
    },
    [primary, secondary, primaryForeground, secondaryForeground],
  );

  // The main animation initial state
  const animationInitState = useMemo(
    () => ({ isTabFocused: isFocused, backgroundColor: secondary, width: 60, borderRadius: "50%", fill: secondaryForeground }),
    [isFocused, colorScheme],
  );

  // Start the animation player with the main animation script
  const { isTabFocused, backgroundColor, width, borderRadius, fill } = useAnimation(animationGenerator, animationInitState);

  // To keep the shared value in sync with the prop
  useDidUpdateEffect(() => {
    isTabFocused.value = isFocused;
  }, [isFocused]);

  // Return all that is needed to trigger the animation
  return { backgroundColor, width, borderRadius, fill };
}
