// react native

// components
import BodyScrollView from "@/components/BodyScrollView";
import Button from "@/components/ui/custom/button3d";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";
import Power from "@/assets/icons/Power";
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import XCircle from "@/assets/icons/XCircle";
import { Skia } from "@shopify/react-native-skia";
import { useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

// types
import type { SkSize } from "@shopify/react-native-skia";
import { router } from "expo-router";
import { Text, View } from "react-native";

const testJSON = require("@/assets/skotties/Settings.json");
const animation = Skia.Skottie.Make(JSON.stringify(testJSON));

export default function Screen() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // This shared value is used to store the current canvas size, which may change depending on the screen orientation
  const currentCanvasSize = useSharedValue<SkSize>({ width: 0, height: 0 });

  // An array to hold the refs of each individual entry
  const targetEntryRefs = useRef<(View | null)[]>([]);

  return (
    <>
      <BodyScrollView targetChildRefs={targetEntryRefs} scrollToIndex={9}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={{ padding: 20 }}>
            <View
              ref={(ref) => {
                targetEntryRefs.current[i] = ref;
              }}
              style={{
                width: "100%",
                height: 100,
                marginVertical: 10,
                backgroundColor: i % 2 ? "lightblue" : "lightgreen",
              }}
            >
              <Text className="text-center text-5xl">{i}</Text>
            </View>
          </View>
        ))}
      </BodyScrollView>
      <BodyScrollView>
        <Button
          icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />}
          onPress={() => router.navigate(`/high-scores?highScoreIndexToHighlight=${9}&forDifficulty=${"easy"}`)}
        >
          default
        </Button>
        {/* <SkottiePlayer animation={animation} />
        <View className="h-screen-safe w-full">
          <Confetti />
        </View>
        <View className="size-72">
          <LiquidGaugeProgress progress={progress} />
        </View> */}
        {/* <CollectionSlider /> */}
        {/* <Switch /> */}
        {/* <Button
        icon={<PuzzlePiece className="fill-primary-background size-9 stroke-input stroke-1" />}
        isLoading={isLoading}
        onPress={() => setIsLoading(!isLoading)}
      >
        default
      </Button> */}
        <Button icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={() => setProgress(73.33333333333333)}>
          default
        </Button>
        <Button variant="destructive" icon={<XCircle className="size-9 fill-destructive-foreground stroke-input stroke-1" />}>
          destructive
        </Button>
        <Button variant="outline" icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />}>
          outline
        </Button>
        <Button variant="secondary" icon={<CheckCircle className="size-9 fill-secondary-foreground stroke-input stroke-1" />}>
          secondary
        </Button>
        <Button variant="default" size="sm">
          default
        </Button>
        <Button variant="destructive" size="sm">
          destructive
        </Button>
        <Button variant="outline" size="sm">
          outline
        </Button>
        <Button variant="secondary" size="sm">
          secondary
        </Button>

        <Button variant="default" size="lg">
          default
        </Button>
        <Button variant="destructive" size="lg">
          destructive
        </Button>
        <Button variant="outline" size="lg">
          outline
        </Button>
        <Button variant="secondary" size="lg">
          secondary
        </Button>

        <Button variant="default" size="icon" isLoading>
          <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
        </Button>
        <Button variant="destructive" size="icon">
          <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
        </Button>
        <Button variant="outline" size="icon">
          <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
        </Button>
        <Button variant="secondary" size="icon">
          <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
        </Button>
      </BodyScrollView>
      {/* <View className="pointer-events-none" style={StyleSheet.absoluteFill}>
        <Canvas style={{ flex: 1 }} onSize={currentCanvasSize}>
          <Group transform={transform}>
            <Skottie animation={animation} frame={frame} />
          </Group>
        </Canvas>
      </View> */}
    </>
  );
}
