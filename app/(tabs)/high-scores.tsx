// react
import { useState } from "react";

// react native
import { StyleSheet, View } from "react-native";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { Skia } from "@shopify/react-native-skia";

// components
import BodyScrollView from "@/components/BodyScrollView";
import HighScoreTabs from "@/components/HighScoreTabs";
import SkottiePlayer from "@/components/SkottiePlayer";
import { Card, CardContent } from "@/components/ui/custom/card";

// assets
const skottie = Skia.Skottie.Make(JSON.stringify(require("@/assets/skotties/HallOfFame.json")));
const skottieL = Skia.Skottie.Make(JSON.stringify(require("@/assets/skotties/HallOfFameL.json")));

// types
import type { LayoutRectangle } from "react-native";

// constants
const SKOTTIE_BG_HEIGHT = 277;

export default function Screen() {
  // Save the skottie canvas dimensions, which will change based on the screen orientation
  const [skottieCanvas, setSkottieCanvas] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  // Get the current user's desired color scheme
  const { colorScheme } = useColorScheme();

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
      <View className="pointer-events-none" style={StyleSheet.absoluteFill} onLayout={(ev) => setSkottieCanvas(ev.nativeEvent.layout)}>
        <SkottiePlayer animation={colorScheme === "dark" ? skottie : skottieL} />
      </View>
    </BodyScrollView>
  );
}
