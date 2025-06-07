// react native
import { Pressable } from "react-native";

// expo
import type { TabTriggerSlotProps } from "expo-router/ui";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import Animated, { interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";

// types
interface TabButtonProps extends TabTriggerSlotProps {}

// Resolve the classname strings into icon styles (so we can change the color prop with the classname prop)
// cssInterop(Ionicons, { className: { target: "style", nativeStyleToProp: { color: true } } });

// *** TEST CODE ***
const primary = "hsl(0 0% 98%)";
const primaryForeground = "hsl(240 5.9% 10%)";
const secondary = "hsl(240 3.7% 15.9%)";
const secondaryForeground = "hsl(0 0% 98%)";
// *** TEST CODE ***

export default function TabButton({ isFocused, ...props }: TabButtonProps) {
  const isFocusedFlag = useSharedValue(isFocused ?? false);

  useDidUpdateEffect(() => {
    isFocusedFlag.value = isFocused ?? false;
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(interpolateColor(isFocusedFlag.value ? 1 : 0, [1, 0], [primary, secondary]), { duration: 500 }),
      width: withSpring(isFocusedFlag.value ? 90 : 60),
      borderRadius: withTiming(isFocusedFlag.value ? "25%" : "50%", { duration: 500 }),
    };
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      fill: isFocusedFlag.value ? "red" : "blue",
    };
  });

  return (
    <Pressable {...props}>
      <Animated.View className="items-center p-2" style={animatedStyle}>
        <PuzzlePiece width={48} height={48} animatedProps={animatedProps} />
      </Animated.View>
    </Pressable>
  );
}
