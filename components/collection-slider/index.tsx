// react
import { useState } from "react";

// react native
import { Animated, ScrollView, Text, useAnimatedValue, useWindowDimensions, View } from "react-native";

// components
import Indicator from "./Indicator";
import Slide from "./Slide";

// types
interface CollectionSliderProps {
  test: number;
}

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function CollectionSlider({ test }: CollectionSliderProps) {
  // Get the application window's width
  const { width: windowWidth } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useAnimatedValue(0);

  return (
    <View className="h-48 items-center justify-center gap-1">
      <Text className="text-2xl text-foreground">{COLLECTIONS[currentIndex].category}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}
        onMomentumScrollEnd={({
          nativeEvent: {
            contentOffset: { x },
          },
        }) => setCurrentIndex(Math.floor(x / windowWidth))}
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
