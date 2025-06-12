// react
import { type ReactNode } from "react";

// other libraries
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useFlipCardContext } from "./FlipCardContext";

// types
interface FlippedContentProps {
  children: ReactNode;
}

export default function FlippedContent({ children }: FlippedContentProps) {
  const { isFlipped, direction, duration } = useFlipCardContext();

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = withTiming(`${interpolate(Number(isFlipped.value), [0, 1], [180, 360])}deg`, { duration });

    return { transform: [direction === "x" ? { rotateX: rotateValue } : { rotateY: rotateValue }, { perspective: 300 }] };
  });

  return <Animated.View style={[{ backfaceVisibility: "hidden" }, contentAnimatedStyle]}>{children}</Animated.View>;
}
