// react
import { useState } from "react";

// react native
import { StyleSheet, Text, View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { useGameStore } from "@/stores/gameProvider";
import { Skia } from "@shopify/react-native-skia";

// components
import BodyScrollView from "@/components/BodyScrollView";
import Collection from "@/components/preview/Collection";
import Difficulty from "@/components/preview/Difficulty";
import Turns from "@/components/preview/Turns";
import SkottiePlayer from "@/components/SkottiePlayer";
import Button from "@/components/ui/custom/button3d";
import { Card, CardContent, CardFooter } from "@/components/ui/custom/card";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";
const skottie = Skia.Skottie.Make(JSON.stringify(require("@/assets/skotties/GameOver.json")));
const skottieL = Skia.Skottie.Make(JSON.stringify(require("@/assets/skotties/GameOverL.json")));

// types
import type { LayoutRectangle } from "react-native";

// constants
const SKOTTIE_BG_HEIGHT = 277;

export default function Screen() {
  // Get the state and actions we need from the game store
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  // Save the skottie canvas dimensions, which will change based on the screen orientation
  const [skottieCanvas, setSkottieCanvas] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  // Get the current user's desired color scheme
  const { colorScheme } = useColorScheme();

  function handleOKPressed() {
    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.back();
  }

  return (
    <BodyScrollView>
      {/* Create enough empty space for the skottie backdrop (opaque), as the transparent part will fill the remainder of the screen */}
      <View style={{ height: SKOTTIE_BG_HEIGHT * Math.min(skottieCanvas.width / skottie.size().width, skottieCanvas.height / skottie.size().height) }} />
      <Card>
        <CardContent>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Number of Turns</Text>
            <Turns />
          </View>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Difficulty Level</Text>
            <Difficulty />
          </View>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Collection Set</Text>
            <Collection />
          </View>
        </CardContent>
        <CardFooter>
          <Button icon={<CheckCircle className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={handleOKPressed}>
            OK
          </Button>
        </CardFooter>
      </Card>

      {/* Render the skottie in the front of the screen, but make sure to not capture or obscure any touch events */}
      <View className="pointer-events-none" style={StyleSheet.absoluteFill} onLayout={(ev) => setSkottieCanvas(ev.nativeEvent.layout)}>
        <SkottiePlayer animation={colorScheme === "dark" ? skottie : skottieL} />
      </View>
    </BodyScrollView>
  );
}
