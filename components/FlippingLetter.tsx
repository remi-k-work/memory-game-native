// react
import { useCallback } from "react";

// react native
import { Text, View } from "react-native";

// expo
import { useFocusEffect } from "expo-router";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { useSharedValue } from "react-native-reanimated";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Star from "@/assets/icons/Star";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
interface FlippingLetterProps {
  letter: string | "PuzzlePiece" | "Trophy" | "WrenchScrewDriver" | "Star";
}

// constants
import { COLORS } from "@/constants/colors";

const MIN_DELAY = 1000;
const MAX_DELAY = 2000;

export default function FlippingLetter({ letter }: FlippingLetterProps) {
  // The letter is unflipped by default
  const isFlipped = useSharedValue(false);

  // This block runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset the letter to its unflipped state
      isFlipped.value = false;

      // To produce the staggered children effect, trigger the flip animation on the mount after a random delay
      const timeoutId = setTimeout(() => (isFlipped.value = true), Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY);

      // This return function acts as a cleanup and runs when the screen loses focus
      return () => {
        // Clear any pending timeout
        clearTimeout(timeoutId);

        // Optionally reset to unflipped immediately when leaving the screen
        isFlipped.value = false;
      };
    }, []),
  );

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primaryForeground } = COLORS[colorScheme];

  // Are we showing an icon instead of a simple letter?
  const isIcon = letter === "PuzzlePiece" || letter === "Trophy" || letter === "WrenchScrewDriver" || letter === "Star";

  return (
    <FlipCard isFlipped={isFlipped} direction={Math.random() < 0.5 ? "x" : "y"}>
      <FlipCardRegularContent>
        <View className="overflow-hidden rounded-xl bg-muted" style={{ width: isIcon ? 64 : 46, height: 64 }}>
          <Text className="line-clamp-1 text-center text-4xl text-muted-foreground" style={{ lineHeight: 64 }} adjustsFontSizeToFit>
            •
          </Text>
        </View>
      </FlipCardRegularContent>
      <FlipCardFlippedContent>
        {isIcon ? (
          <View className="items-center justify-center rounded-xl bg-primary" style={{ width: 64, height: 64 }}>
            {letter === "PuzzlePiece" && <PuzzlePiece width={48} height={48} fill={primaryForeground} />}
            {letter === "Trophy" && <Trophy width={48} height={48} fill={primaryForeground} />}
            {letter === "WrenchScrewDriver" && <WrenchScrewDriver width={48} height={48} fill={primaryForeground} />}
            {letter === "Star" && <Star width={48} height={48} fill={primaryForeground} />}
          </View>
        ) : (
          <View className="overflow-hidden rounded-xl bg-muted" style={{ width: 46, height: 64 }}>
            <Text className="line-clamp-1 text-center text-4xl text-muted-foreground" style={{ lineHeight: 64 }} adjustsFontSizeToFit>
              {letter}
            </Text>
          </View>
        )}
      </FlipCardFlippedContent>
    </FlipCard>
  );
}
