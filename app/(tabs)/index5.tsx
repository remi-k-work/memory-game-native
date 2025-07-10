// react native
import { View } from "react-native";

// other libraries
import useFetchRandomCards from "@/hooks/useFetchRandomCards";
import useOrientation from "@/hooks/useOrientation";
import usePreloadCardSetImages from "@/hooks/usePreloadCardSetImages";
import { useGameStore } from "@/stores/gameProvider";

// components
import CardGrid from "@/components/CardGrid3";
import LiquidGaugeProgress from "@/components/liquid-gauge-progress";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Fetch a random card set for the specified collection category
  useFetchRandomCards();

  // Preload all card set images so that they can be rendered promptly from the cache
  const { progress, areImagesPreloaded } = usePreloadCardSetImages();

  // Display the loading progress indicator if the images are not ready
  if (!areImagesPreloaded)
    return (
      // <View className="flex-1 items-center justify-center">
      <LiquidGaugeProgress progress={progress} />
      // </View>
    );

  // Render the appropriate grid based on difficulty
  switch (difficulty) {
    case "easy":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={3} rows={4} /> : <CardGrid cols={4} rows={3} />}</View>;
    case "medium":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={4} rows={5} /> : <CardGrid cols={5} rows={4} />}</View>;
    case "hard":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={5} rows={6} /> : <CardGrid cols={6} rows={5} />}</View>;
  }
}
