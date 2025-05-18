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
    <View className="flex-1" style={{ width }}>
      <ImageBackground source={isPortrait ? previewP : previewL} className="flex-1 items-center justify-center overflow-hidden rounded-lg">
        <View className="rounded-lg bg-background/75 p-4">
          <Text className="text-lg text-foreground">{category}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
