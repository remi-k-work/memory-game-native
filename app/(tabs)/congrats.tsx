// react native
import { StyleSheet, Text, View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore } from "@/stores/highScoreProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import Confetti from "@/components/confetti";
import FlippingTitle from "@/components/FlippingTitle";
import HighScoreTable from "@/components/high-score-table";
import Difficulty from "@/components/preview/Difficulty";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);
  const currTurns = useGameStore((state) => state.turns);

  // Get the state and actions we need from the high score store
  const getNewHighScoreIndex = useHighScoreStore((state) => state.getNewHighScoreIndex);

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
          <HighScoreTable difficulty={difficulty} newHighScoreIndex={getNewHighScoreIndex(difficulty, currTurns)} />
        </CardContent>
      </Card>

      {/* Render the confetti animation in the front of the screen, but make sure to not capture or obscure any touch events */}
      <View className="pointer-events-none" style={StyleSheet.absoluteFill}>
        <Confetti />
      </View>
    </BodyScrollView>
  );
}
