// react
import { useState } from "react";

// react native
import { StyleSheet, Text, View } from "react-native";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { useGameStore } from "@/stores/gameProvider";
import { Skia } from "@shopify/react-native-skia";

// components
import Confetti from "@/components/confetti";
import HighScoreTable from "@/components/high-score-table";
import KeybScrollView from "@/components/KeybScrollView";
import Difficulty from "@/components/preview/Difficulty";
import Turns from "@/components/preview/Turns";
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

  // Save the skottie canvas dimensions, which will change based on the screen orientation
  const [skottieCanvas, setSkottieCanvas] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  // Get the current user's desired color scheme
  const { colorScheme } = useColorScheme();

  return (
    <>
      <KeybScrollView>
        {/* Create enough empty space for the skottie backdrop (opaque), as the transparent part will fill the remainder of the screen */}
        <View style={{ height: SKOTTIE_BG_HEIGHT * Math.min(skottieCanvas.width / skottie.size().width, skottieCanvas.height / skottie.size().height) }} />
        <Card>
          <CardContent>
            <View className="flex-row justify-around">
              <View className="ml-6 mr-3 flex-1 items-center gap-1 rounded-lg border border-background p-3">
                <Text className="text-lg text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">Number of Turns</Text>
                <Turns />
              </View>
              <View className="ml-3 mr-6 flex-1 items-center gap-1 rounded-lg border border-background p-3">
                <Text className="text-lg text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">Difficulty Level</Text>
                <Difficulty />
              </View>
            </View>
            <View>
              <HighScoreTable kind="new-high-score" difficultyToView={difficulty} />
            </View>
          </CardContent>
        </Card>

        {/* Render the skottie in the front of the screen, but make sure to not capture or obscure any touch events */}
        <View className="pointer-events-none" style={StyleSheet.absoluteFill} onLayout={(ev) => setSkottieCanvas(ev.nativeEvent.layout)}>
          <SkottiePlayer animation={colorScheme === "dark" ? skottie : skottieL} />
        </View>
      </KeybScrollView>

      {/* Render the confetti animation in the front of the screen, but make sure to not capture or obscure any touch events */}
      <View className="pointer-events-none" style={StyleSheet.absoluteFill}>
        <Confetti />
      </View>
    </>
  );
}
