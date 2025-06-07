// react
import { useState } from "react";

// react native
import { Text, View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore, useRehydrateHighScore } from "@/stores/highScoreProvider";
import Animated, { runOnJS, useSharedValue, withSpring } from "react-native-reanimated";

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

  // The fixed height of the turns text
  const TURNS_TEXT_HEIGHT = 58;

  // To show the "old" number of turns as the "new" one slides in
  const [prevTurns, setPrevTurns] = useState(turns);

  // To control the vertical translation of the animated view
  const translateY = useSharedValue(0);

  // Trigger the animation when the number of turns changes
  useDidUpdateEffect(() => {
    // This translation moves the "old" number of turns out of view and brings the "new" one into view
    translateY.value = withSpring(-TURNS_TEXT_HEIGHT, { mass: 1.2 }, (isFinished) => isFinished && runOnJS(setPrevTurns)(turns));
  }, [turns]);

  // Reset the translation when the "old" number of turns changes (avoids the flicker effect)
  useDidUpdateEffect(() => {
    translateY.value = 0;
  }, [prevTurns]);

  return (
    <View className="w-16 overflow-hidden rounded-xl bg-foreground" style={{ height: TURNS_TEXT_HEIGHT }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Text className="line-clamp-1 text-center text-4xl tabular-nums text-background" style={{ lineHeight: TURNS_TEXT_HEIGHT }} adjustsFontSizeToFit>
          {prevTurns}
        </Text>
        <Text className="line-clamp-1 text-center text-4xl tabular-nums text-background" style={{ lineHeight: TURNS_TEXT_HEIGHT }} adjustsFontSizeToFit>
          {turns}
        </Text>
      </Animated.View>
    </View>
  );
}
