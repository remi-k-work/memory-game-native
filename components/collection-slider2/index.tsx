// react native
import { View } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

// components
import Slide from "./Slide";

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function CollectionSlider() {
  // Get the state and actions we need from the game store
  const collection = useGameStore((state) => state.collection);
  const changedCollection = useGameStore((state) => state.changedCollection);

  // Determine the current screen orientation and size
  const { width, isPortrait } = useOrientation();

  const slideWidth = width * 0.8;
  const slideHeight = isPortrait ? (slideWidth / 3) * 4 : (slideWidth / 4) * 3;

  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const ListPadding = width - slideWidth;

  return (
    <View className="w-full bg-red-500" style={{ height: slideHeight }}>
      <Animated.ScrollView
        ref={animatedRef}
        horizontal
        snapToInterval={slideWidth}
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ width: slideWidth * COLLECTIONS.length + ListPadding }}
      >
        {COLLECTIONS.map((collection, index) => (
          <Slide key={index} collection={collection} scrollOffset={scrollOffset} index={index} />
        ))}
      </Animated.ScrollView>
      {/* <Indicator scrollX={scrollX} /> */}
    </View>
  );
}
