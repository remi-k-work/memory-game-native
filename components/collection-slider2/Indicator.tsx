// react native
import { Animated, View } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";

// types
interface IndicatorProps {
  scrollX: Animated.Value;
}

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function Indicator({ scrollX }: IndicatorProps) {
  // Determine the current screen orientation and size
  const { width: windowWidth } = useOrientation();

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
