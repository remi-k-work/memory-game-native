// react native
import { Pressable } from "react-native";

// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import { useGameStore } from "@/stores/gameProvider";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";
import FlippedSide from "./FlippedSide3";
import Wallpaper from "./Wallpaper";

// types
import type { Card } from "@/types/shared";

interface SingleCardProps {
  card: Card;
  onCardImageLoaded: () => void;
}

// constants
import COLORS from "tailwindcss/colors";

const BACKGROUND_GRADIENT_COLORS = [COLORS.stone[600], COLORS.indigo[600]];
const STRIPES_GRADIENT_COLORS = [COLORS.stone[500], COLORS.purple[400], COLORS.indigo[500]];

export default function SingleCard({ card, card: { isFlipped }, onCardImageLoaded }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  // Use the already encapsulated animation logic for this component
  const { direction } = useAnimSingleCard();

  return (
    <Pressable className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <FlipCard kind="needs-to-animate" isFlipped={isFlipped} direction={direction}>
        <FlipCardRegularContent>
          <Wallpaper backgroundGradientColors={BACKGROUND_GRADIENT_COLORS} stripesGradientColors={STRIPES_GRADIENT_COLORS} />
        </FlipCardRegularContent>
        <FlipCardFlippedContent>
          <FlippedSide card={card} onCardImageLoaded={onCardImageLoaded} />
        </FlipCardFlippedContent>
      </FlipCard>
    </Pressable>
  );
}
