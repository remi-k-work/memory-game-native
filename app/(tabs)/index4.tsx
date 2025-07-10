// react
import { useEffect, useRef, useState } from "react";

// react native
import { Image, View } from "react-native";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import useFetchRandomCards from "@/hooks/useFetchRandomCards";
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";

// components
import CardGrid from "@/components/CardGrid3";
import LiquidGaugeProgress from "@/components/liquid-gauge-progress";

// types
import type { ImageURISource } from "react-native";

// constants
const BATCH_SIZE = 5;

export default function Screen() {
  // Get the state and actions we need from the game store
  const currentCards = useGameStore((state) => state.currentCards);
  const collection = useGameStore((state) => state.collection);
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Fetch a random card set for the specified collection category
  const { isLoading: isFetchingRandomCards } = useFetchRandomCards();

  // Keep track of the loading progress indicator
  const [progress, setProgress] = useState(0);

  // To determine whether the card set images are ready to be displayed
  const [areImagesPreloaded, setAreImagesPreloaded] = useState(false);

  // To prevent preloading from running multiple times
  const hasPreloadingStartedYetRef = useRef(false);

  useEffect(() => {
    // Runs when the random card set has been fetched already; it will only run once per set of cards
    if (isFetchingRandomCards || currentCards.length === 0 || hasPreloadingStartedYetRef.current) return;

    const preloadImages = async () => {
      hasPreloadingStartedYetRef.current = true;
      setAreImagesPreloaded(false);
      setProgress(0);

      // Get a flat list of all unique image URLs needed
      const imageUrls = currentCards.flatMap(({ imageP, imageL }) => [(imageP as ImageURISource).uri!, (imageL as ImageURISource).uri!]);
      const uniqueImageUrls = [...new Set(imageUrls)];

      let loadedCount = 0;
      const totalCount = uniqueImageUrls.length;

      // Download images in controlled batches (e.g., 5 at a time)
      for (let i = 0; i < totalCount; i += BATCH_SIZE) {
        const batch = uniqueImageUrls.slice(i, i + BATCH_SIZE);

        // Wait for the current batch to download
        await Promise.allSettled(batch.map((url) => Image.prefetch(url)));
        loadedCount += batch.length;

        // Update the loading progress indicator based on actual downloads
        setProgress((loadedCount / totalCount) * 100);
      }

      // All needed card set images are in the cache, ready to render instantly
      setAreImagesPreloaded(true);
    };

    preloadImages();
  }, [isFetchingRandomCards, currentCards]);

  // When either the collection or difficulty changes, the card set images must be preloaded again
  useDidUpdateEffect(() => {
    hasPreloadingStartedYetRef.current = false;
    setAreImagesPreloaded(false);
    setProgress(0);
  }, [collection, difficulty]);

  // If the images are still being preloaded, show the loading progress indicator
  if (!areImagesPreloaded)
    return (
      // <View className="flex-1 items-center justify-center">
      <LiquidGaugeProgress progress={progress} />
      // </View>
    );

  // Render the grid, because we know all images are already loaded
  switch (difficulty) {
    case "easy":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={3} rows={4} /> : <CardGrid cols={4} rows={3} />}</View>;
    case "medium":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={4} rows={5} /> : <CardGrid cols={5} rows={4} />}</View>;
    case "hard":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={5} rows={6} /> : <CardGrid cols={6} rows={5} />}</View>;
  }
}
