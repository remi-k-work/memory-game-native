// react native
import { Animated, useWindowDimensions, View } from "react-native";

// types
interface IndicatorProps {
  scrollX: Animated.Value;
}

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function Indicator({ scrollX }: IndicatorProps) {
  // Get the application window's width
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View className="flex-row flex-wrap items-center justify-center gap-1">
      {COLLECTIONS.map((_, index) => {
        const width = scrollX.interpolate({
          inputRange: [windowWidth * (index - 1), windowWidth * index, windowWidth * (index + 1)],
          outputRange: [8, 16, 8],
          extrapolate: "clamp",
        });

        return <Animated.View key={index} className="size-3 rounded-lg bg-primary" style={{ width }} />;
      })}
    </View>
  );
}
