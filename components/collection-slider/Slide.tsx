// react native
import { ImageBackground, Text, useWindowDimensions, View } from "react-native";

// types
import type { Collection } from "@/types/shared";

interface SlideProps {
  collection: Collection;
}

export default function Slide({ collection: { category, previewP, previewL } }: SlideProps) {
  // Determine the current screen orientation
  const { height, width } = useWindowDimensions();
  const isPortrait = height >= width;

  return (
    <View className="flex-1 items-center justify-center" style={{ width }}>
      <ImageBackground
        source={isPortrait ? previewP : previewL}
        resizeMode="cover"
        className="w-80 flex-1 items-center justify-center overflow-hidden rounded-lg p-4"
      >
        <View className="rounded-lg bg-background/75 p-4">
          <Text className="text-lg text-foreground">{category}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
