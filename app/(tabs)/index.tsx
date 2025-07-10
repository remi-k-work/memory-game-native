// other libraries
import useFetchRandomCards from "@/hooks/useFetchRandomCards";
import useOrientation from "@/hooks/useOrientation";
import usePreloadCardSetImages from "@/hooks/usePreloadCardSetImages";
import { useGameStore } from "@/stores/gameProvider";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// components
import CardGrid from "@/components/CardGrid";
import LiquidGaugeProgress from "@/components/liquid-gauge-progress";

// constants
const GRID_ENTERING = FadeIn.delay(1000).duration(600);
const GRID_EXITING = FadeOut.duration(600);

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Fetch a random card set for the specified collection category
  const { isLoading } = useFetchRandomCards();

  // Preload all card set images so that they can be rendered promptly from the cache
  const { progress, areImagesPreloaded } = usePreloadCardSetImages();

  // Display the loading progress indicator if the images are not ready
  if (isLoading || !areImagesPreloaded) return <LiquidGaugeProgress progress={isLoading ? 0 : progress} />;

  // Render the appropriate grid based on difficulty
  switch (difficulty) {
    case "easy":
      return (
        <Animated.View entering={GRID_ENTERING} exiting={GRID_EXITING} className="flex-1">
          {isPortrait ? <CardGrid cols={3} rows={4} /> : <CardGrid cols={4} rows={3} />}
        </Animated.View>
      );
    case "medium":
      return (
        <Animated.View entering={GRID_ENTERING} exiting={GRID_EXITING} className="flex-1">
          {isPortrait ? <CardGrid cols={4} rows={5} /> : <CardGrid cols={5} rows={4} />}
        </Animated.View>
      );
    case "hard":
      return (
        <Animated.View entering={GRID_ENTERING} exiting={GRID_EXITING} className="flex-1">
          {isPortrait ? <CardGrid cols={5} rows={6} /> : <CardGrid cols={6} rows={5} />}
        </Animated.View>
      );
  }
}
