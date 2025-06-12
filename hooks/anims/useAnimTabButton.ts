// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// constants
import { COLORS } from "@/constants/colors";

// Encapsulate the animation logic in a custom hook
export default function useAnimTabButton(isFocused = false) {
  // A shared value to track if the tab button is focused that drives the animation
  const isFocusedFlag = useSharedValue(isFocused);

  // To keep the shared value in sync with the prop
  useDidUpdateEffect(() => {
    isFocusedFlag.value = isFocused;
  }, [isFocused]);

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary, primaryForeground, secondaryForeground } = COLORS[colorScheme];

  // Animate the button to smoothly transition between focused and unfocused states
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withSpring(interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
    width: withSpring(isFocusedFlag.value ? 90 : 60),
    borderRadius: withSpring(isFocusedFlag.value ? "25%" : "50%"),
  }));

  // Do the same for the icon
  const iconAnimatedProps = useAnimatedProps(() => ({
    fill: withSpring(interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), { damping: 80, stiffness: 200 }),
  }));

  // Return all that is needed to trigger the animation
  return { buttonAnimatedStyle, iconAnimatedProps };
}
