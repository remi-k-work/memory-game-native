// react
import { useState } from "react";

// react native
import { Pressable } from "react-native";

// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import { useGameStore } from "@/stores/gameProvider";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";
import IsLoading from "./IsLoading";

// types
import type { Card } from "@/types/shared";
import FlippedSide from "./FlippedSide";
import RegularSide from "./RegularSide";

interface SingleCardProps {
  card: Card;
}

export default function SingleCard({ card, card: { uniqueId, isFlipped } }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  // Whether the card image is currently loading
  const [isLoading, setIsLoading] = useState(false);

  // Use the already encapsulated animation logic for this component
  const { direction } = useAnimSingleCard();

  return (
    <Pressable disabled={isLoading} className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <FlipCard kind="needs-to-animate" isFlipped={isFlipped} direction={direction}>
        <FlipCardRegularContent>{isLoading ? <IsLoading key={uniqueId + "loading"} /> : <RegularSide key={uniqueId + "loaded"} />}</FlipCardRegularContent>
        <FlipCardFlippedContent>
          <FlippedSide card={card} onImageLoading={() => setIsLoading(true)} onImageLoaded={() => setIsLoading(false)} />
        </FlipCardFlippedContent>
      </FlipCard>
    </Pressable>
  );
}
