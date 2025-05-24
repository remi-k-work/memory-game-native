// react native
import { ImageBackground, Text, View } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";

// constants
import { COLLECTIONS } from "@/constants/collections";

export default function Collection() {
  // Get the state and actions we need from the game store
  const category = useGameStore((state) => state.collection);

  // Find the current collection set by the provided category
  const collection = COLLECTIONS.find((collection) => collection.category === category)!;
  const { previewP, previewL } = collection;

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  return (
    <View className={cn("items-center justify-center", isPortrait ? "h-52" : "h-44")}>
      <ImageBackground
        source={isPortrait ? previewP : previewL}
        resizeMode="cover"
        className={cn("flex-1 items-center justify-center overflow-hidden rounded-lg p-4", isPortrait ? "w-44" : "w-52")}
      >
        <View className="rounded-lg bg-background/75 p-4">
          <Text className="text-foreground">{category}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
