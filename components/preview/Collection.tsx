// react native
import { Image, ImageBackground, Text, View } from "react-native";

// other libraries
import useSlideDimensions from "@/hooks/useSlideDimensions";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";

// types
interface CollectionPreviewProps {
  collectionCategory?: string;
  isHighlighted?: boolean;
}

// constants
import { COLLECTIONS } from "@/constants/collections";
const TINY_PREVIEW_SCALE = 0.25;

export default function Collection({ collectionCategory, isHighlighted = false }: CollectionPreviewProps) {
  // Get the state and actions we need from the game store
  let currentCollectionCategory = useGameStore((state) => state.collection);
  if (collectionCategory) currentCollectionCategory = collectionCategory;

  // Find the current collection set by the provided category
  const collection = COLLECTIONS.find((collection) => collection.category === currentCollectionCategory)!;
  const { previewP, previewL } = collection;

  // Establish the slide dimensions according to the screen orientation
  const { isPortrait, slideWidth, slideHeight } = useSlideDimensions();

  return collectionCategory || isHighlighted ? (
    <View className="items-center">
      <Image
        source={isPortrait ? previewP : previewL}
        className="rounded-lg"
        style={{ width: slideWidth * TINY_PREVIEW_SCALE, height: slideHeight * TINY_PREVIEW_SCALE }}
      />
      <Text className={cn("text-sm text-foreground", isHighlighted && "text-primary-foreground")}>{currentCollectionCategory}</Text>
    </View>
  ) : (
    <ImageBackground
      source={isPortrait ? previewP : previewL}
      className="justify-end overflow-hidden rounded-lg"
      style={{ width: slideWidth, height: slideHeight }}
    >
      <View className="rounded-b-lg bg-background/75 p-2">
        <Text className="text-center text-lg text-foreground">{currentCollectionCategory}</Text>
      </View>
    </ImageBackground>
  );
}
