// react
import { useCallback, useRef, useState } from "react";

// react native
import { Alert, Keyboard, Text, TextInput } from "react-native";

// expo
import { router, useFocusEffect } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore, useRehydrateHighScore } from "@/stores/highScoreProvider";

// components
import Button from "@/components/ui/custom/button3d";
import Input from "@/components/ui/custom/input";
import { TableCell, TableRow } from "@/components/ui/custom/table";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";
import XCircle from "@/assets/icons/XCircle";

// types
import type { HighScore } from "@/types/shared";

interface NewEntryProps {
  index: number;
  highScore: HighScore;
}

export default function NewEntry({ index, highScore: { name } }: NewEntryProps) {
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

  // To be able to set the focus on the input field
  const inputRef = useRef<TextInput>(null);

  // The current player's name that they have entered
  const [currName, setCurrName] = useState("");

  // This block runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset the current player's name and focus on the input field
      setCurrName("");

      // Schedule the focus call
      const timeoutId = setTimeout(() => inputRef.current?.focus(), 3000);

      // This return function acts as a cleanup and runs when the screen loses focus
      return () => {
        // Clear the timeout to prevent it from running after the screen loses focus
        clearTimeout(timeoutId);

        // Remove the focus from the input field
        inputRef.current?.blur();
      };
    }, []),
  );

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
    // Show the new high score entry as highlighted and editable
    <>
      <TableRow className="items-center bg-primary">
        <TableCell className="w-1/5">
          <Text className="text-center text-primary-foreground">{index + 1}</Text>
        </TableCell>
        <TableCell className="w-1/5">
          <Input
            ref={inputRef}
            autoCapitalize="characters"
            maxLength={3}
            placeholder={name}
            value={currName}
            onChangeText={(value) => {
              setCurrName(value);

              // Dismiss the keyboard once the player has entered their name
              if (value.trim().length === 3) Keyboard.dismiss();
            }}
          />
        </TableCell>
        <TableCell className="w-2/5">
          <Text className="text-center text-primary-foreground">{currCollection}</Text>
        </TableCell>
        <TableCell className="w-1/5">
          <Text className="text-center text-primary-foreground">{currTurns}</Text>
        </TableCell>
      </TableRow>
      <TableRow className="justify-around bg-background">
        <TableCell>
          <Button icon={<CheckCircle className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={handleOKPressed}>
            OK
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="secondary" icon={<XCircle className="size-9 fill-secondary-foreground stroke-input stroke-1" />} onPress={handleCancelPressed}>
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
