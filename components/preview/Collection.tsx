// react native
import { ImageBackground, Text, View } from "react-native";

// other libraries
import useSlideDimensions from "@/hooks/useSlideDimensions";
import { useGameStore } from "@/stores/gameProvider";

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function Collection() {
  // Get the state and actions we need from the game store
  const category = useGameStore((state) => state.collection);

  // Find the current collection set by the provided category
  const collection = COLLECTIONS.find((collection) => collection.category === category)!;
  const { previewP, previewL } = collection;

  // Establish the slide dimensions according to the screen orientation
  const { isPortrait, slideWidth, slideHeight } = useSlideDimensions();

  return (
    <ImageBackground
      source={isPortrait ? previewP : previewL}
      className="justify-end overflow-hidden rounded-lg"
      style={{ width: slideWidth, height: slideHeight }}
    >
      <View className="rounded-b-lg bg-background/75 p-2">
        <Text className="text-center text-lg text-foreground">{category}</Text>
      </View>
    </ImageBackground>
  );
}
