// react
import { useState } from "react";

// react native
import { Image, Pressable } from "react-native";

// expo
import { LinearGradient } from "expo-linear-gradient";

// other libraries
import useOrientation from "@/hooks/useOrientation";
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

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Whether the card image is currently loading
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Pressable disabled={isLoading} className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <Image
        source={isPortrait ? imageP : imageL}
        resizeMode="contain"
        className={cn(
          "h-full w-full bg-muted transition-transform duration-500 ease-in-out",
          isFlipped ? "delay-500 [transform:rotateY(0deg)]" : "[transform:rotateY(90deg)]",
        )}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading ? (
        <LinearGradient colors={[colors.stone[950], colors.rose[900]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="absolute h-full w-full" />
      ) : (
        <LinearGradient
          colors={[colors.stone[950], colors.indigo[900]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={cn(
            "absolute h-full w-full transition-transform duration-500 ease-in-out",
            isFlipped ? "[transform:rotateY(90deg)]" : "delay-500 [transform:rotateY(0deg)]",
          )}
        />
      )}
    </Pressable>
  );
}
