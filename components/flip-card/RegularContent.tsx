// react
import { type ReactNode } from "react";

// react native
import { StyleSheet } from "react-native";

// other libraries
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useFlipCardContext } from "./FlipCardContext";

// types
interface RegularContentProps {
  children: ReactNode;
}

export default function RegularContent({ children }: RegularContentProps) {
  const { isFlipped, direction, duration } = useFlipCardContext();

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = withTiming(`${interpolate(Number(isFlipped.value), [0, 1], [0, 180])}deg`, { duration });

    return { transform: [direction === "x" ? { rotateX: rotateValue } : { rotateY: rotateValue }] };
  });

  return (
    <Animated.View style={[{ position: "absolute", backfaceVisibility: "hidden" }, StyleSheet.absoluteFill, contentAnimatedStyle]}>{children}</Animated.View>
  );
}
