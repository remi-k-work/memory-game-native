// react
import { useState } from "react";

// react native
import { View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore, useRehydrateHighScore } from "@/stores/highScoreProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import FlippingLetter from "@/components/FlippingLetter";
import HighScoreTable from "@/components/high-score-table";
import Difficulty from "@/components/preview/Difficulty";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { Text } from "@/components/ui/text";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);
  const currCollection = useGameStore((state) => state.collection);
  const currTurns = useGameStore((state) => state.turns);
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  // Get the state and actions we need from the high score store
  const rehydrateHighScore = useRehydrateHighScore();
  const highScores = useHighScoreStore((state) => state[difficulty]);
  const getNewHighScoreIndex = useHighScoreStore((state) => state.getNewHighScoreIndex);
  const enteredNewHighScore = useHighScoreStore((state) => state.enteredNewHighScore);

  // The current player's name that they have entered
  const [currName, setCurrName] = useState("");

  async function handleOKPressed() {
    // The player's name is required and must be exactly 3 characters long
    if (!currName.trim() || currName.trim().length !== 3) {
      alert("Please enter a name that is exactly 3 characters long.");
      return;
    }

    // Rehydrate the high score with the latest data
    await rehydrateHighScore();

    // Player has entered a new high score
    const newHighScoreIndex = getNewHighScoreIndex(difficulty, currTurns);
    enteredNewHighScore(difficulty, newHighScoreIndex, {
      ...highScores[newHighScoreIndex],
      name: currName.toUpperCase(),
      collection: currCollection,
      turns: currTurns,
    });

    // Player has started a new game
    startedaNewGame();

    // Go back to the high scores screen and highlight the new high score
    router.navigate(`/high-scores?highScoreIndexToHighlight=${newHighScoreIndex}&forDifficulty=${difficulty}`);
  }

  function handleCancelPressed() {
    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.back();
  }

  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <FlippingLetter letter="Star" />
            <FlippingLetter letter="C" />
            <FlippingLetter letter="o" />
            <FlippingLetter letter="n" />
            <FlippingLetter letter="g" />
            <FlippingLetter letter="r" />
            <FlippingLetter letter="a" />
            <FlippingLetter letter="t" />
            <FlippingLetter letter="s" />
            <FlippingLetter letter="!" />
          </CardTitle>
          <CardDescription>You have made a high score!</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Difficulty Level</Text>
            <Difficulty />
          </View>
          <HighScoreTable difficulty={difficulty} newHighScoreIndex={getNewHighScoreIndex(difficulty, currTurns)} onNameChanged={setCurrName} />
        </CardContent>
        <CardFooter>
          <Button size="lg" onPress={handleOKPressed}>
            <Text>OK</Text>
          </Button>
          <Button size="lg" variant="secondary" onPress={handleCancelPressed}>
            <Text>Cancel</Text>
          </Button>
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
