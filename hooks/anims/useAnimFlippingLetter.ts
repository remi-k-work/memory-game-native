// react
import { useCallback } from "react";

// expo
import { useFocusEffect } from "expo-router";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { useSharedValue } from "react-native-reanimated";

// types
import type { FlippingLetterType } from "@/types/shared";

// constants
import { COLORS } from "@/constants/colors";

const MIN_DELAY = 1000;
const MAX_DELAY = 2000;
const ICON_WIDTH = 64;
const LETTER_WIDTH = 46;
const HEIGHT = 64;

// Encapsulate the animation logic in a custom hook
export default function useAnimFlippingLetter(letter: FlippingLetterType) {
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

  // Return all that is needed to trigger the animation
  return { ICON_WIDTH, LETTER_WIDTH, HEIGHT, isIcon, isFlipped, primaryForeground };
}
