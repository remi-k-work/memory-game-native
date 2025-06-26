// other libraries
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useFlipCardContext } from "./FlipCardContext";

// types
import type { ReactNode } from "react";

interface FlippedContentProps {
  children: ReactNode;
}

export default function FlippedContent({ children }: FlippedContentProps) {
  const flipCardContext = useFlipCardContext();

  const contentAnimatedStyle = useAnimatedStyle(() => {
    if (flipCardContext.kind === "animated-already") {
      const { rotateValueF, direction } = flipCardContext;
      return { transform: [direction === "x" ? { rotateX: `${rotateValueF.value}deg` } : { rotateY: `${rotateValueF.value}deg` }, { perspective: 300 }] };
    }

    const { isFlipped, direction, duration } = flipCardContext;
    const rotateValue = withTiming(`${interpolate(Number(isFlipped), [0, 1], [180, 360])}deg`, { duration });
    return { transform: [direction === "x" ? { rotateX: rotateValue } : { rotateY: rotateValue }, { perspective: 300 }] };
  });

  return <Animated.View style={[{ backfaceVisibility: "hidden" }, contentAnimatedStyle]}>{children}</Animated.View>;
}
