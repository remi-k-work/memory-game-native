// react native
import { ImageBackground, Text, View } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";

// types
import type { Collection } from "@/types/shared";
import type { SharedValue } from "react-native-reanimated";

interface SlideProps {
  collection: Collection;
  scrollOffset: SharedValue<number>;
  index: number;
}

export default function Slide({ collection: { category, previewP, previewL }, scrollOffset, index }: SlideProps) {
  // Determine the current screen orientation and size
  const { width, isPortrait } = useOrientation();

  const slideWidth = width * 0.8;
  const slideHeight = isPortrait ? (slideWidth / 3) * 4 : (slideWidth / 4) * 3;

  const animStyleSlide = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / slideWidth;

    const paddingLeft = (width - slideWidth) / 4;
    const translateX = interpolate(activeIndex, [index - 2, index - 1, index, index + 1], [120, 60, 0, -slideWidth - paddingLeft * 2], Extrapolation.CLAMP);
    const scale = interpolate(activeIndex, [index - 2, index - 1, index, index + 1], [0.8, 0.9, 1, 1], Extrapolation.CLAMP);

    return { left: paddingLeft, transform: [{ translateX: scrollOffset.value + translateX }, { scale }] };
  });

  return (
    <Animated.View style={[{ zIndex: -index }, animStyleSlide]}>
      <ImageBackground
        source={isPortrait ? previewP : previewL}
        className="absolute items-center justify-center overflow-hidden rounded-lg"
        style={{ width: slideWidth, height: slideHeight }}
      >
        <View className="rounded-lg bg-background/75 p-4">
          <Text className="text-lg text-foreground">{category}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
