// react
import { useState } from "react";

// react native
import { StyleSheet, Text, View } from "react-native";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore } from "@/stores/highScoreProvider";
import { Skia } from "@shopify/react-native-skia";

// components
import BodyScrollView from "@/components/BodyScrollView";
import Confetti from "@/components/confetti";
import HighScoreTable from "@/components/high-score-table";
import Difficulty from "@/components/preview/Difficulty";
import SkottiePlayer from "@/components/SkottiePlayer";
import { Card, CardContent } from "@/components/ui/custom/card";

// assets
const skottie = Skia.Skottie.Make(JSON.stringify(require("@/assets/skotties/Congrats.json")));
const skottieL = Skia.Skottie.Make(JSON.stringify(require("@/assets/skotties/CongratsL.json")));

// types
import type { LayoutRectangle } from "react-native";

// constants
const SKOTTIE_BG_HEIGHT = 234;

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);
  const currTurns = useGameStore((state) => state.turns);

  // Get the state and actions we need from the high score store
  const getNewHighScoreIndex = useHighScoreStore((state) => state.getNewHighScoreIndex);

  // Save the skottie canvas dimensions, which will change based on the screen orientation
  const [skottieCanvas, setSkottieCanvas] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  // Get the current user's desired color scheme
  const { colorScheme } = useColorScheme();

  return (
    <>
      <BodyScrollView>
        {/* Create enough empty space for the skottie backdrop (opaque), as the transparent part will fill the remainder of the screen */}
        <View style={{ height: SKOTTIE_BG_HEIGHT * Math.min(skottieCanvas.width / skottie.size().width, skottieCanvas.height / skottie.size().height) }} />
        <Card>
          <CardContent>
            <View className="items-center gap-1">
              <Text className="text-muted-foreground">Difficulty Level</Text>
              <Difficulty />
            </View>
            <HighScoreTable difficulty={difficulty} newHighScoreIndex={getNewHighScoreIndex(difficulty, currTurns)} />
          </CardContent>
        </Card>

        {/* Render the skottie in the front of the screen, but make sure to not capture or obscure any touch events */}
        <View className="pointer-events-none" style={StyleSheet.absoluteFill}>
          <SkottiePlayer animation={colorScheme === "dark" ? skottie : skottieL} onSkottieLayout={(skottieCanvas) => setSkottieCanvas(skottieCanvas)} />
        </View>
      </BodyScrollView>

      {/* Render the confetti animation in the front of the screen, but make sure to not capture or obscure any touch events */}
      <View className="pointer-events-none" style={StyleSheet.absoluteFill}>
        <Confetti />
      </View>
    </>
  );
}
