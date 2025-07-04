// react
import { useState } from "react";

// react native
import { Alert, Keyboard, Text } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore, useRehydrateHighScore } from "@/stores/highScoreProvider";
import Animated, { measure, useAnimatedKeyboard, useAnimatedRef, useAnimatedStyle, withSpring } from "react-native-reanimated";

// components
import Button from "@/components/ui/custom/button3d";
import { TableCell, TableRow } from "@/components/ui/custom/table";
import { Input } from "@/components/ui/input";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";
import XCircle from "@/assets/icons/XCircle";

// types
import type { HighScore } from "@/types/shared";
import type { MeasuredDimensions } from "react-native-reanimated";

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

  // The current player's name that they have entered
  const [currName, setCurrName] = useState("");

  // Determine the current screen orientation and size
  const { height: screenHeight } = useOrientation();

  // To make sure the keyboard does not cover the new high score entry
  const { height: keyboardHeight } = useAnimatedKeyboard();
  const newHighScoreRef = useAnimatedRef();

  const animStyleNewHighScore = useAnimatedStyle(() => {
    // We need to measure our new high score entry, which is the content we do not want to overlap
    let contentMeasurement: MeasuredDimensions | null = null;
    if (_WORKLET) contentMeasurement = measure(newHighScoreRef);
    if (!contentMeasurement) return { transform: [{ translateY: 0 }] };

    // Extract the y-coordinate of the content relative to the top of the screen as well as its height
    const { pageY: contentY, height: contentHeight } = contentMeasurement;

    // The y-coordinate of the top edge of the keyboard
    const keyboardTop = screenHeight - keyboardHeight.value;

    // The y-coordinate of the bottom edge of the content we do not want to overlap
    const contentBottom = contentY + contentHeight;

    // How much the keyboard is currently overlapping the content? If this value is positive, the keyboard is covering the content
    const overlap = contentBottom - keyboardTop;

    // We only want to translate the content upwards if there is an overlap; otherwise, we will leave it alone
    return { transform: [{ translateY: withSpring(-Math.max(0, overlap)) }] };
  });

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
    <Animated.View ref={newHighScoreRef} style={animStyleNewHighScore}>
      <TableRow className="items-center bg-primary">
        <TableCell className="w-1/5">
          <Text className="text-center text-primary-foreground">{index + 1}</Text>
        </TableCell>
        <TableCell className="w-1/5">
          <Input
            autoCapitalize="characters"
            maxLength={3}
            autoFocus
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
    </Animated.View>
  );
}
