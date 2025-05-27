// react
import { useState } from "react";

// react native
import { View } from "react-native";

// expo
import { useRouter } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore } from "@/stores/highScoreProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import HighScoreTable from "@/components/high-score-table";
import Difficulty from "@/components/preview/Difficulty";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);
  const currCollection = useGameStore((state) => state.collection);
  const currTurns = useGameStore((state) => state.turns);
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  // Get the state and actions we need from the high score store
  const highScores = useHighScoreStore((state) => state[difficulty]);
  const enteredNewHighScore = useHighScoreStore((state) => state.enteredNewHighScore);

  const router = useRouter();
  const [currName, setCurrName] = useState("");

  function handleOKPressed() {
    // The player's name is required and must be exactly 3 characters long
    if (!currName.trim() || currName.trim().length !== 3) {
      alert("Please enter a name that is exactly 3 characters long.");
      return;
    }

    // Player has entered a new high score
    const newHighScoreIndex = 0; // <==== TODO: Get the index at which a new high score should be inserted
    enteredNewHighScore(difficulty, newHighScoreIndex, { ...highScores[newHighScoreIndex], name: currName, collection: currCollection, turns: currTurns });

    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.navigate("/high-scores");
  }

  function handleCancelPressed() {
    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.back();
  }

  return (
    <BodyScrollView>
      <Card className="w-full">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Congratulations!</CardTitle>
          <CardDescription className="text-xl">You have made a high score!</CardDescription>
        </CardHeader>
        <CardContent className="items-center gap-6 rounded-lg bg-muted px-0 pt-6">
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Difficulty Level</Text>
            <Difficulty />
          </View>
          <HighScoreTable difficulty={difficulty} newHighScoreIndex={0} onNameChanged={setCurrName} />
        </CardContent>
        <CardFooter className="justify-around pt-6">
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
