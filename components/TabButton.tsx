// react native
import { Pressable } from "react-native";

// expo
import type { TabTriggerSlotProps } from "expo-router/ui";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import Animated, { interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
interface TabButtonProps extends TabTriggerSlotProps {
  iconName: "PuzzlePiece" | "Trophy" | "WrenchScrewDriver";
}

// constants
import { COLORS } from "@/constants/colors";

// Resolve the classname strings into icon styles (so we can change the color prop with the classname prop)
// cssInterop(Ionicons, { className: { target: "style", nativeStyleToProp: { color: true } } });

export default function TabButton({ isFocused, ...props }: TabButtonProps) {
  // A shared value to track if the tab button is focused that drives the animation
  const isFocusedFlag = useSharedValue(isFocused ?? false);

  // To keep the shared value in sync with the prop
  useDidUpdateEffect(() => {
    isFocusedFlag.value = isFocused ?? false;
  }, [isFocused]);

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary, primaryForeground, secondaryForeground } = COLORS[colorScheme];

  // Animate the button to smoothly transition between focused and unfocused states
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withSpring(interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primary, secondary]), { damping: 80, stiffness: 200 }),
    width: withSpring(isFocusedFlag.value ? 90 : 60),
    borderRadius: withSpring(isFocusedFlag.value ? "25%" : "50%", { damping: 80, stiffness: 200 }),
  }));

  // Do the same for the icon
  const iconAnimatedProps = useAnimatedProps(() => ({
    fill: withSpring(interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primaryForeground, secondaryForeground]), { damping: 80, stiffness: 200 }),
  }));

  return (
    <Pressable {...props}>
      <Animated.View className="items-center p-2" style={buttonAnimatedStyle}>
        {props.iconName === "PuzzlePiece" && <PuzzlePiece width={48} height={48} animatedPathProps={iconAnimatedProps} />}
        {props.iconName === "Trophy" && <Trophy width={48} height={48} animatedPathProps={iconAnimatedProps} />}
        {props.iconName === "WrenchScrewDriver" && <WrenchScrewDriver width={48} height={48} animatedPathProps={iconAnimatedProps} />}
      </Animated.View>
    </Pressable>
  );
}
