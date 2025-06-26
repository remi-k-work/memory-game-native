// expo
import { usePathname } from "expo-router";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { interpolateColor, useAnimatedProps, useAnimatedStyle, withSpring } from "react-native-reanimated";

// constants
import { COLORS } from "@/constants/colors";

// Encapsulate the animation logic in a custom hook
export default function useAnimNavTabs() {
  // To establish which nav tab is focused
  const pathname = usePathname();

  // Animate each nav tab to smoothly transition between focused and unfocused states
  const { animStyle: animStyleIndex, animProps: animPropsIndex } = useAnimNavTab(pathname === "/");
  const { animStyle: animStyleSettings, animProps: animPropsSettings } = useAnimNavTab(pathname === "/settings");
  const { animStyle: animStyleHighScores, animProps: animPropsHighScores } = useAnimNavTab(pathname === "/high-scores");

  // Return all that is needed to trigger the animation
  return { animStyleIndex, animPropsIndex, animStyleSettings, animPropsSettings, animStyleHighScores, animPropsHighScores };
}

// Helper hook for a single nav tab transition
function useAnimNavTab(isNavTabFocused: boolean = false) {
  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary, primaryForeground, secondaryForeground } = COLORS[colorScheme];

  // Animate the nav tab to smoothly transition between focused and unfocused states
  return {
    animStyle: useAnimatedStyle(() => ({
      backgroundColor: withSpring(interpolateColor(isNavTabFocused ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
      width: withSpring(isNavTabFocused ? 90 : 60),
      borderRadius: withSpring(isNavTabFocused ? "25%" : "50%"),
    })),
    animProps: useAnimatedProps(() => ({
      fill: withSpring(interpolateColor(isNavTabFocused ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), { damping: 80, stiffness: 200 }),
    })),
  };
}
