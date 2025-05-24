// react native
import { Animated, ScrollView, useAnimatedValue, View } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";

// components
import Indicator from "./Indicator";
import Slide from "./Slide";

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function CollectionSlider() {
  // Get the state and actions we need from the game store
  const changedCollection = useGameStore((state) => state.changedCollection);

  // Determine the current screen orientation and size
  const { width, isPortrait } = useOrientation();

  const scrollX = useAnimatedValue(0);

  return (
    <View className={cn("items-center justify-center gap-1", isPortrait ? "h-80" : "h-48")}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}
        onMomentumScrollEnd={({ nativeEvent: { contentOffset } }) => changedCollection(COLLECTIONS[Math.floor(contentOffset.x / width)].category)}
        scrollEventThrottle={1}
        snapToAlignment="center"
      >
        {COLLECTIONS.map((collection, index) => (
          <Slide key={index} collection={collection} />
        ))}
      </ScrollView>
      <Indicator scrollX={scrollX} />
    </View>
  );
}
