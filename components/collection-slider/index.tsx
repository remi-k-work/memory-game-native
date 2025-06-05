// react
import { useEffect, useRef } from "react";

// react native
import { Animated, ScrollView, useAnimatedValue, View } from "react-native";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
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
  const collection = useGameStore((state) => state.collection);
  const changedCollection = useGameStore((state) => state.changedCollection);

  // Determine the current screen orientation and size
  const { width, isPortrait } = useOrientation();

  // To be able to programmatically scroll
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollX = useAnimatedValue(0);

  // Scroll to the current collection on initial mount
  useEffect(() => {
    const contentOffset = COLLECTIONS.findIndex((c) => c.category === collection) * width;
    scrollX.setValue(contentOffset);
    scrollViewRef.current?.scrollTo({ x: contentOffset, animated: false });
  }, []);

  // Scroll to the current collection on screen orientation change
  useDidUpdateEffect(() => {
    const contentOffset = COLLECTIONS.findIndex((c) => c.category === collection) * width;
    scrollX.setValue(contentOffset);
    scrollViewRef.current?.scrollTo({ x: contentOffset, animated: false });
  }, [isPortrait]);

  return (
    <View className={cn("gap-1", isPortrait ? "h-80" : "h-48")} style={{ width }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={({ nativeEvent: { contentOffset } }) => changedCollection(COLLECTIONS[Math.round(contentOffset.x / width)].category)}
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
