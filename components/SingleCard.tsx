// react
import { useState } from "react";

// react native
import { Image, Pressable } from "react-native";

// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";
import colors from "tailwindcss/colors";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

// types
import type { Card } from "@/types/shared";

interface SingleCardProps {
  card: Card;
}

export default function SingleCard({ card, card: { uniqueId, imageP, imageL, isFlipped } }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Whether the card image is currently loading
  const [isLoading, setIsLoading] = useState(false);

  // Use the already encapsulated animation logic for this component
  const { isFlippedFlag, direction, AnimatedLinearGradient, LOAD_ENTERING, LOAD_EXITING } = useAnimSingleCard(isFlipped);

  return (
    <Pressable disabled={isLoading} className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <FlipCard kind="needs-to-animate" isFlipped={isFlippedFlag} direction={direction}>
        <FlipCardRegularContent>
          {isLoading ? (
            <AnimatedLinearGradient
              key={uniqueId + "loading"}
              colors={[colors.stone[950], colors.rose[900]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              entering={LOAD_ENTERING}
              exiting={LOAD_EXITING}
              className="flex-1"
            />
          ) : (
            <AnimatedLinearGradient
              key={uniqueId + "loaded"}
              colors={[colors.stone[950], colors.indigo[900]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              entering={LOAD_ENTERING}
              exiting={LOAD_EXITING}
              className="flex-1"
            />
          )}
        </FlipCardRegularContent>
        <FlipCardFlippedContent>
          <Image
            source={isPortrait ? imageP : imageL}
            resizeMode="contain"
            className="h-full w-full bg-muted"
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        </FlipCardFlippedContent>
      </FlipCard>
    </Pressable>
  );
}
