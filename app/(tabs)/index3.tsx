// react
import { useEffect, useRef, useState } from "react";

// react native
import { View } from "react-native";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import useFetchRandomCards from "@/hooks/useFetchRandomCards";
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";

// components
import CardGrid from "@/components/CardGrid2";
import LiquidGaugeProgress from "@/components/liquid-gauge-progress";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Fetch a random card set for the specified collection category
  const { isLoading } = useFetchRandomCards();

  // Total number of card images needed for the current difficulty
  const totalCardImagesNeeded = difficulty === "easy" ? 3 * 4 : difficulty === "medium" ? 4 * 5 : 5 * 6;

  // Keep track of the number of card images loaded so far
  const loadedCardImagesSoFarRef = useRef(0);

  // Keep track of the loading progress indicator
  const [progress, setProgress] = useState(0);

  // ✅ Use a ref to hold the animation frame request ID
  const animationFrameId = useRef(0);

  // When a new set of cards is being fetched, the card images must be reloaded
  useDidUpdateEffect(() => {
    // Make sure a new set of cards is being fetched
    if (!isLoading) return;

    // Reset the number of card images loaded so far
    loadedCardImagesSoFarRef.current = 0;

    // Reset the loading progress indicator
    setProgress(0);
  }, [isLoading]);

  // When the total number of card images needed changes, the card images must be reloaded
  useDidUpdateEffect(() => {
    // Reset the number of card images loaded so far
    loadedCardImagesSoFarRef.current = 0;

    // Reset the loading progress indicator
    setProgress(0);
  }, [totalCardImagesNeeded]);

  // A single card image has been just loaded
  function handleCardImageLoaded() {
    // Ignore the event if all the card images have already been loaded
    if (loadedCardImagesSoFarRef.current === totalCardImagesNeeded) return;

    // Increment the number of card images loaded so far
    loadedCardImagesSoFarRef.current++;

    // ✅ Cancel any previously scheduled update
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    // ✅ Schedule the progress update on the next screen paint
    // This batches multiple rapid calls into a single UI update per frame
    animationFrameId.current = requestAnimationFrame(() => {
      // Update the loading progress indicator accordingly
      setProgress((loadedCardImagesSoFarRef.current / totalCardImagesNeeded) * 100);
      console.log(loadedCardImagesSoFarRef.current, totalCardImagesNeeded);
    });
  }

  // ✅ Clean up the animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // If the card images are still being loaded, we will show a loading progress indicator
  const isLoadingCardImages = progress < 100;

  switch (difficulty) {
    case "easy":
      return (
        <>
          {isLoadingCardImages && <LiquidGaugeProgress progress={progress} />}
          <View className={isLoadingCardImages ? "hidden" : "flex-1"}>
            {isPortrait ? (
              <CardGrid cols={3} rows={4} onCardImageLoaded={handleCardImageLoaded} />
            ) : (
              <CardGrid cols={4} rows={3} onCardImageLoaded={handleCardImageLoaded} />
            )}
          </View>
        </>
      );
    case "medium":
      return (
        <>
          {isLoadingCardImages && <LiquidGaugeProgress progress={progress} />}
          <View className={isLoadingCardImages ? "hidden" : "flex-1"}>
            {isPortrait ? (
              <CardGrid cols={4} rows={5} onCardImageLoaded={handleCardImageLoaded} />
            ) : (
              <CardGrid cols={5} rows={4} onCardImageLoaded={handleCardImageLoaded} />
            )}
          </View>
        </>
      );
    case "hard":
      return (
        <>
          {isLoadingCardImages && <LiquidGaugeProgress progress={progress} />}
          <View className={isLoadingCardImages ? "hidden" : "flex-1"}>
            {isPortrait ? (
              <CardGrid cols={5} rows={6} onCardImageLoaded={handleCardImageLoaded} />
            ) : (
              <CardGrid cols={6} rows={5} onCardImageLoaded={handleCardImageLoaded} />
            )}
          </View>
        </>
      );
  }
}
