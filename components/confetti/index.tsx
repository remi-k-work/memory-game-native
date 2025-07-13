import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { Atlas, Canvas, useRSXformBuffer } from "@shopify/react-native-skia";

import { Easing, runOnUI, useSharedValue, withTiming } from "react-native-reanimated";
import useConfettiLogic from "./useConfettiLogic";

// --- Configuration ---
const COLORS = ["#deb7ff", "#c785ec", "#a86add", "#8549a7", "#634087"];
const NUM_OF_CONFETTI = 150;
const CONFETTI_WIDTH = 10;
const CONFETTI_HEIGHT = 30;
const ANIMATION_DURATION = 4500;

const { height, width } = Dimensions.get("window");

// --- Animation Logic (must be a worklet) ---
const relativeSin = (yPosition: number, offsetId: number) => {
  "worklet";
  const rand = Math.sin((yPosition - 500) * (Math.PI / 540));
  const otherrand = Math.cos((yPosition - 500) * (Math.PI / 540));
  return offsetId % 2 === 0 ? rand : -otherrand;
};

// --- TypeScript Interfaces ---
interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  colorIndex: number;
  seed: number;
}

export const Confetti = () => {
  const { confettiData, texture, sprites } = useConfettiLogic({ x: 0, y: 0, width, height });

  // A shared value to drive the animation (0 = start, 1 = end)
  const progress = useSharedValue(0);

  // 3. CALCULATE TRANSFORMS FOR ALL PIECES
  // This hook calculates the position/rotation for all 150 pieces on the UI thread.
  const transforms = useRSXformBuffer(NUM_OF_CONFETTI, (val, i) => {
    "worklet";
    // Get the initial data for this specific piece
    const piece = confettiData.value[i];
    if (!piece) {
      return;
    }

    // Use the `progress` value to determine the current Y position (the fall)
    const totalFallDistance = height * 1.5;
    const yPosition = piece.y + progress.value * totalFallDistance;

    // Use the logic from your first example to calculate rotation
    const rotation = relativeSin(yPosition, piece.id) * piece.seed * 2.5;

    // Set the transform for this piece
    // format: [cos(angle), sin(angle), translateX, translateY]
    val.set(Math.cos(rotation), Math.sin(rotation), piece.x, yPosition);
  });

  // This function generates the initial state and starts the animation
  const startAnimation = () => {
    // Set the data on the UI thread
    runOnUI(() => {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
      });
    })();
  };

  if (!texture) {
    return null; // Texture is loading
  }

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Atlas image={texture} sprites={sprites} transforms={transforms} />
      </Canvas>
      <Text style={styles.title}>Congratulations!</Text>
      <Pressable onPress={startAnimation} style={styles.button}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    position: "absolute",
    top: "45%",
    textAlign: "center",
    width: "100%",
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    height: 60,
    backgroundColor: "purple",
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
