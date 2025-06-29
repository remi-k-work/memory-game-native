// react native
import { View } from "react-native";

// other libraries
import { useAnimDot } from "@/features/animations/hooks/useAnimCollectionSlider";
import Animated from "react-native-reanimated";

// types
import type { SharedValue } from "react-native-reanimated";

interface IndicatorProps {
  scrollOffset: SharedValue<number>;
}

interface DotProps {
  scrollOffset: SharedValue<number>;
  slideIndex: number;
}

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function Indicator({ scrollOffset }: IndicatorProps) {
  return (
    <View className="m-1 flex-row flex-wrap items-center justify-center gap-1">
      {COLLECTIONS.map((_, slideIndex) => (
        <Dot key={slideIndex} scrollOffset={scrollOffset} slideIndex={slideIndex} />
      ))}
    </View>
  );
}

function Dot({ scrollOffset, slideIndex }: DotProps) {
  // Use the already encapsulated animation logic for this component
  const { animStyleDot } = useAnimDot(scrollOffset, slideIndex);

  return <Animated.View className="rounded-lg" style={animStyleDot} />;
}
