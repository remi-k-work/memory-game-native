// react
import { useState } from "react";

// react native
import { Alert, Text, View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore, useRehydrateHighScore } from "@/stores/highScoreProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import FlippingTitle from "@/components/FlippingTitle";
import HighScoreTable from "@/components/high-score-table";
import Difficulty from "@/components/preview/Difficulty";
import Button from "@/components/ui/custom/button3d";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";
import XCircle from "@/assets/icons/XCircle";

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
      Alert.alert("Invalid Name!", "It must be 3 characters long.", [{ text: "OK", style: "cancel" }], { cancelable: true });
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
            <FlippingTitle icon="Star" text="Congrats!" />
          </CardTitle>
          <CardDescription>You have made a High Score!</CardDescription>
        </CardHeader>
        <CardContent>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Difficulty Level</Text>
            <Difficulty />
          </View>
          <HighScoreTable difficulty={difficulty} newHighScoreIndex={getNewHighScoreIndex(difficulty, currTurns)} onNameChanged={setCurrName} />
        </CardContent>
        <CardFooter className="flex-row justify-around">
          <Button icon={<CheckCircle className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={handleOKPressed}>
            OK
          </Button>
          <Button variant="secondary" icon={<XCircle className="size-9 fill-secondary-foreground stroke-input stroke-1" />} onPress={handleCancelPressed}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
