// react
import { useState } from "react";

// react native
import { StyleSheet, View } from "react-native";

// other libraries
import { Skia } from "@shopify/react-native-skia";

// components
import BodyScrollView from "@/components/BodyScrollView";
import HighScoreTabs from "@/components/HighScoreTabs";
import SkottiePlayer from "@/components/SkottiePlayer";
import { Card, CardContent } from "@/components/ui/custom/card";

// assets
const skottieJSON = require("@/assets/skotties/HallOfFame.json");
const skottie = Skia.Skottie.Make(JSON.stringify(skottieJSON));

// types
import type { LayoutRectangle } from "react-native";

// constants
const SKOTTIE_BG_HEIGHT = 277;

export default function Screen() {
  // Save the skottie canvas dimensions, which will change based on the screen orientation
  const [skottieCanvas, setSkottieCanvas] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  return (
    <BodyScrollView>
      {/* Create enough empty space for the skottie backdrop (opaque), as the transparent part will fill the remainder of the screen */}
      <View style={{ height: SKOTTIE_BG_HEIGHT * Math.min(skottieCanvas.width / skottie.size().width, skottieCanvas.height / skottie.size().height) }} />
      <Card>
        <CardContent className="bg-transparent">
          <HighScoreTabs />
        </CardContent>
      </Card>

      {/* Render the skottie in the front of the screen, but make sure to not capture or obscure any touch events */}
      <View className="pointer-events-none" style={StyleSheet.absoluteFill}>
        <SkottiePlayer animation={skottie} onSkottieLayout={(skottieCanvas) => setSkottieCanvas(skottieCanvas)} />
      </View>
    </BodyScrollView>
  );
}
