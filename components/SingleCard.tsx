// react native
import { Image, Pressable } from "react-native";

// other libraries
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";

// types
import type { Card } from "@/types/shared";

interface SingleCardProps {
  card: Card;
}

export default function SingleCard({ card, card: { image, isFlipped } }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  return (
    <Pressable className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <Image
        source={image}
        className={cn(
          "h-full w-full bg-black transition-transform duration-500 ease-in-out",
          isFlipped ? "delay-500 [transform:rotateY(180deg)]" : "[transform:rotateY(90deg)]",
        )}
        resizeMode="contain"
      />
      <Image
        source={require("@/assets/images/cover.png")}
        className={cn(
          "absolute h-full w-full transition-transform duration-500 ease-in-out",
          isFlipped ? "[transform:rotateY(90deg)]" : "delay-500 [transform:rotateY(0deg)]",
        )}
        resizeMode="cover"
      />
    </Pressable>
  );
}
