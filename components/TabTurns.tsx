// react native
import { Text, View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore, useRehydrateHighScore } from "@/stores/highScoreProvider";

export default function TabTurns() {
  // Get the state and actions we need from the game store
  const isGameOver = useGameStore((state) => state.isGameOver());
  const difficulty = useGameStore((state) => state.difficulty);
  const turns = useGameStore((state) => state.turns);

  // Get the state and actions we need from the high score store
  const rehydrateHighScore = useRehydrateHighScore();
  const hasMadeHighScore = useHighScoreStore((state) => state.hasMadeHighScore);

  useDidUpdateEffect(() => {
    // Processing the game over in an async manner is necessary
    const processGameOver = async () => {
      // Rehydrate the high score with the latest data
      await rehydrateHighScore();

      // Has the player made a high score for a given difficulty?
      if (hasMadeHighScore(difficulty, turns)) {
        // Yes, navigate to the congrats screen
        router.navigate("/congrats");
      } else {
        // No, navigate to the game over screen
        router.navigate("/game-over");
      }
    };

    // Is the game over?
    if (isGameOver) processGameOver();
  }, [isGameOver]);

  return (
    <View className="h-12 w-16 items-center justify-center rounded-xl bg-foreground">
      <Text className="line-clamp-1 text-center text-4xl text-background">{turns}</Text>
    </View>
  );
}
