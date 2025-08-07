// react native
import { StyleSheet } from "react-native";

// other libraries
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useFlipCardContext } from "./FlipCardContext";

// types
import type { ReactNode } from "react";

interface RegularContentProps {
  children: ReactNode;
}

export default function RegularContent({ children }: RegularContentProps) {
  const flipCardContext = useFlipCardContext();

  const contentAnimatedStyle = useAnimatedStyle(() => {
    if (flipCardContext.kind === "animated-already") {
      const { rotateValueR, direction } = flipCardContext;
      return { transform: [direction === "x" ? { rotateX: `${rotateValueR.value}deg` } : { rotateY: `${rotateValueR.value}deg` }, { perspective: 300 }] };
    }

    const { isFlipped, direction, duration } = flipCardContext;
    const rotateValue = withTiming(`${interpolate(Number(isFlipped), [0, 1], [0, 180])}deg`, { duration });
    return { transform: [direction === "x" ? { rotateX: rotateValue } : { rotateY: rotateValue }, { perspective: 300 }] };
  });

  return <Animated.View style={[{ backfaceVisibility: "hidden" }, StyleSheet.absoluteFill, contentAnimatedStyle]}>{children}</Animated.View>;
}
