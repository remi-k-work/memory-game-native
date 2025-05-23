// react native
import { Animated, ScrollView, useAnimatedValue, useWindowDimensions, View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import Indicator from "./Indicator";
import Slide from "./Slide";

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function CollectionSlider() {
  // Get the state and actions we need from the game store
  const changedCollection = useGameStore((state) => state.changedCollection);

  // Get the application window's width
  const { width } = useWindowDimensions();

  const scrollX = useAnimatedValue(0);

  return (
    <View className="h-48 items-center justify-center gap-1">
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
