// react
import { useRef, useState } from "react";

// react native
import { Image, Pressable } from "react-native";

// expo
import { LinearGradient } from "expo-linear-gradient";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";
import { useSharedValue } from "react-native-reanimated";
import colors from "tailwindcss/colors";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

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

  // A shared value to track if the card is flipped that drives the animation
  const isFlippedFlag = useSharedValue(isFlipped);

  // To keep the shared value in sync with the prop
  useDidUpdateEffect(() => {
    isFlippedFlag.value = isFlipped;
  }, [isFlipped]);

  // A random flip direction (kept in a ref to unflip it later in the same way)
  const directionRef = useRef<"x" | "y">(Math.random() < 0.5 ? "x" : "y");

  return (
    <Pressable disabled={isLoading} className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <FlipCard isFlipped={isFlippedFlag} direction={directionRef.current}>
        <FlipCardRegularContent>
          {isLoading ? (
            <LinearGradient colors={[colors.stone[950], colors.rose[900]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="flex-1" />
          ) : (
            <LinearGradient colors={[colors.stone[950], colors.indigo[900]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="flex-1" />
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
