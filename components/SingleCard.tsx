// react native
import { Image, Pressable, useWindowDimensions } from "react-native";

// expo
import { LinearGradient } from "expo-linear-gradient";

// other libraries
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";
import colors from "tailwindcss/colors";

// types
import type { Card } from "@/types/shared";

interface SingleCardProps {
  card: Card;
}

export default function SingleCard({ card, card: { imageP, imageL, isFlipped } }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  // Determine the current screen orientation
  const { height, width } = useWindowDimensions();
  const isPortrait = height >= width;

  return (
    <Pressable className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <Image
        source={isPortrait ? imageP : imageL}
        resizeMode="contain"
        className={cn(
          "h-full w-full bg-card transition-transform duration-500 ease-in-out",
          !isFlipped ? "delay-500 [transform:rotateY(0deg)]" : "[transform:rotateY(90deg)]",
        )}
      />
      <LinearGradient
        colors={[colors.stone[950], colors.indigo[900]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={cn(
          "absolute h-full w-full transition-transform duration-500 ease-in-out",
          !isFlipped ? "[transform:rotateY(90deg)]" : "delay-500 [transform:rotateY(0deg)]",
        )}
      />
    </Pressable>
  );
}
