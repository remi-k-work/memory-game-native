// react
import { useEffect } from "react";

// react native
import { View } from "react-native";

// other libraries
import useAnimCollectionSlider from "@/features/animations/hooks/useAnimCollectionSlider";
import { useGameStore } from "@/stores/gameProvider";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useDebouncedCallback } from "use-debounce";

// components
import Indicator from "./Indicator";
import Slide from "./Slide";

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function CollectionSlider() {
  // Get the state and actions we need from the game store
  const collection = useGameStore((state) => state.collection);
  const changedCollection = useGameStore((state) => state.changedCollection);

  // To be able to animate the scroll view and programmatically scroll
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  // Use the already encapsulated animation logic for this component
  const { slideWidth, slideHeight, scrollOffset } = useAnimCollectionSlider(scrollViewRef);

  // Calculate the exact width for the slider; the width is determined by the
  // rightmost edge of the furthest visible "peeking" slide (the one at index + 2);
  // this is the sum of its horizontal offset and its own scaled-down width
  const sliderWidth = slideWidth / 2 + slideWidth * 0.8;

  // Calculate the total width of all slides as if they were laid out in a simple row
  const allSlidesWidth = slideWidth * COLLECTIONS.length;

  // Calculate the necessary padding for the end of the scroll area; this allows the very last
  // slide to be scrolled fully to the "active" position on the far left of the container
  const endPadding = sliderWidth - slideWidth;

  // Scroll to the current collection on initial mount and on screen orientation change
  useEffect(() => {
    const contentOffset = COLLECTIONS.findIndex((c) => c.category === collection) * slideWidth;
    scrollViewRef.current?.scrollTo({ x: contentOffset, animated: false });
  }, [slideWidth]);

  // Use the debounced callback to initiate the relevant actions
  const handleChangedCollection = useDebouncedCallback((category: string) => {
    // Player has changed the collection
    changedCollection(category);
  }, 600 * 2);

  return (
    <>
      <View style={{ width: sliderWidth, height: slideHeight }}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          snapToInterval={slideWidth}
          decelerationRate="fast"
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          // The total scrollable width is the width of all slides combined, plus the extra padding at the end for correct alignment of the final item
          contentContainerStyle={{ width: allSlidesWidth + endPadding }}
          onMomentumScrollEnd={({
            nativeEvent: {
              contentOffset: { x },
            },
          }) => handleChangedCollection(COLLECTIONS[Math.round(x / slideWidth)].category)}
        >
          {COLLECTIONS.map((collection, slideIndex) => (
            <Slide key={slideIndex} collection={collection} scrollOffset={scrollOffset} slideIndex={slideIndex} />
          ))}
        </Animated.ScrollView>
      </View>
      <Indicator scrollOffset={scrollOffset} />
    </>
  );
}
