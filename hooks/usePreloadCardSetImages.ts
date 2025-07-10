// react
import { useEffect, useState } from "react";

// react native
import { Image } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// types
import type { ImageURISource } from "react-native";

// constants
const BATCH_SIZE = 5;

// Preload all card set images so that they can be rendered promptly from the cache
export default function usePreloadCardSetImages() {
  // Get the state and actions we need from the game store
  const fetchedCards = useGameStore((state) => state.fetchedCards);

  // Keep track of the loading progress indicator
  const [progress, setProgress] = useState(0);

  // To determine whether the card set images are ready to be displayed
  const [areImagesPreloaded, setAreImagesPreloaded] = useState(false);

  // This effect handles the entire card set images preloading lifecycle
  useEffect(() => {
    // A flag that prevents state updates if the component unmounts or if a fresh set of cards arrives before the old one finishes preloading
    let isCancelled = false;

    const preloadImages = async () => {
      // Always start by showing the loader for a new set of cards
      setAreImagesPreloaded(false);
      setProgress(0);

      // Get a flat list of all unique image urls needed
      const imageUrls = fetchedCards.flatMap(({ imageP, imageL }) => [(imageP as ImageURISource).uri!, (imageL as ImageURISource).uri!]);
      const uniqueImageUrls = [...new Set(imageUrls)];
      const totalCount = uniqueImageUrls.length;
      let loadedCount = 0;

      // Download images in controlled batches
      for (let i = 0; i < totalCount; i += BATCH_SIZE) {
        // If a new effect has started, abort the current preloading process
        if (isCancelled) return;

        // Wait for the current batch to download
        const batch = uniqueImageUrls.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(batch.map((url) => Image.prefetch(url)));

        // If a new effect has started, abort the current preloading process
        if (isCancelled) return;

        // Update the loading progress indicator based on actual downloads
        loadedCount += batch.length;
        setProgress((loadedCount / totalCount) * 100);
      }

      // All needed card set images are in the cache, ready to render instantly
      if (!isCancelled) setAreImagesPreloaded(true);
    };

    preloadImages();

    // Cleanup function; executes when a fresh random card set is fetched or when the component unmounts
    return () => {
      isCancelled = true;
    };
  }, [fetchedCards]);

  return { progress, areImagesPreloaded };
}
