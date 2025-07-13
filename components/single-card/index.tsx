// react
import { useRef } from "react";

// react native
import { Image, Pressable } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";
import Wallpaper from "./Wallpaper";

// types
import type { Card } from "@/types/shared";

interface SingleCardProps {
  card: Card;
  isDisabled?: boolean;
}

// constants
import COLORS from "tailwindcss/colors";

const BACKGROUND_GRADIENT_COLORS = [COLORS.stone[600], COLORS.indigo[600]];
const STRIPES_GRADIENT_COLORS = [COLORS.stone[500], COLORS.purple[400], COLORS.indigo[500]];
const BACKGROUND_GRADIENT_COLORS_DISABLED = [COLORS.stone[600], COLORS.rose[600]];
const STRIPES_GRADIENT_COLORS_DISABLED = [COLORS.stone[500], COLORS.purple[400], COLORS.rose[500]];

export default function SingleCard({ card, card: { imageP, imageL, isFlipped }, isDisabled = false }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // A random flip direction (kept in a ref to unflip it later in the same way)
  const directionRef = useRef<"x" | "y">(Math.random() < 0.5 ? "x" : "y");

  return (
    <Pressable disabled={isDisabled} className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <FlipCard kind="needs-to-animate" isFlipped={isFlipped} direction={directionRef.current}>
        <FlipCardRegularContent>
          {isDisabled ? (
            <Wallpaper backgroundGradientColors={BACKGROUND_GRADIENT_COLORS_DISABLED} stripesGradientColors={STRIPES_GRADIENT_COLORS_DISABLED} />
          ) : (
            <Wallpaper backgroundGradientColors={BACKGROUND_GRADIENT_COLORS} stripesGradientColors={STRIPES_GRADIENT_COLORS} />
          )}
        </FlipCardRegularContent>
        <FlipCardFlippedContent>
          <Image source={isPortrait ? imageP : imageL} resizeMode="contain" className="size-full bg-muted" />
        </FlipCardFlippedContent>
      </FlipCard>
    </Pressable>
  );
}
