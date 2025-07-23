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
const GRID_ENTERING = FadeIn.duration(600);
const GRID_EXITING = FadeOut.duration(600);

const DIFFICULTY_CONFIG = {
  easy: { portrait: { cols: 3, rows: 4 }, landscape: { cols: 4, rows: 3 } },
  medium: { portrait: { cols: 4, rows: 5 }, landscape: { cols: 5, rows: 4 } },
  hard: { portrait: { cols: 5, rows: 6 }, landscape: { cols: 6, rows: 5 } },
} as const;

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Get the correct number of columns and rows for the current orientation and difficulty
  const { cols, rows } = isPortrait ? DIFFICULTY_CONFIG[difficulty].portrait : DIFFICULTY_CONFIG[difficulty].landscape;

  // Fetch a random card set for the specified collection category
  const { isLoading } = useFetchRandomCards();

  // Preload all card set images so that they can be rendered promptly from the cache
  const { progress, areImagesPreloaded } = usePreloadCardSetImages();

  // Display the loading progress indicator if the images are not ready
  if (!areImagesPreloaded) return <LiquidGaugeProgress progress={isLoading ? 0 : progress} />;

  // Render the grid with the dynamically calculated props
  return (
    <Animated.View entering={GRID_ENTERING} exiting={GRID_EXITING} className="flex-1">
      <CardGrid cols={cols} rows={rows} isDisabled={isLoading} />
    </Animated.View>
  );
}
