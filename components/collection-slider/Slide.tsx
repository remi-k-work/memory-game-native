// react native
import { ImageBackground, Text, View } from "react-native";

// other libraries
import { useAnimSlide } from "@/features/animations/hooks/useAnimCollectionSlider";
import Animated from "react-native-reanimated";

// types
import type { Collection } from "@/types/shared";
import type { SharedValue } from "react-native-reanimated";

interface SlideProps {
  collection: Collection;
  scrollOffset: SharedValue<number>;
  slideIndex: number;
}

export default function Slide({ collection: { category, previewP, previewL }, scrollOffset, slideIndex }: SlideProps) {
  // Use the already encapsulated animation logic for this component
  const { isPortrait, slideWidth, slideHeight, animStyleSlide } = useAnimSlide(scrollOffset, slideIndex);

  return (
    <Animated.View style={animStyleSlide}>
      <ImageBackground
        source={isPortrait ? previewP : previewL}
        className="absolute justify-end overflow-hidden rounded-lg"
        style={{ width: slideWidth, height: slideHeight }}
      >
        <View className="rounded-b-lg bg-background/75 p-2">
          <Text className="text-center text-lg text-foreground">{category}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
