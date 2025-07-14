import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { Atlas, Canvas, useRSXformBuffer } from "@shopify/react-native-skia";

import { Easing, Extrapolation, interpolate, runOnUI, useSharedValue, withTiming } from "react-native-reanimated";
import useConfettiLogic from "./useConfettiLogic";

// --- Configuration ---
const NUM_OF_CONFETTI = 150;
const CONFETTI_WIDTH = 10;
const CONFETTI_HEIGHT = 30;
const ANIMATION_DURATION = 8000;
const Y_AXIS_SPREAD = 0.8;

const { height, width } = Dimensions.get("window");

export const generateEvenlyDistributedValues = (lowerBound: number, upperBound: number, chunks: number) => {
  "worklet";

  const step = (upperBound - lowerBound) / (chunks - 1);
  return Array.from({ length: chunks }, (_, i) => lowerBound + step * i);
};

export const Confetti = () => {
  const { confettiPieces, texture, sprites } = useConfettiLogic({ x: 0, y: 0, width, height });

  // A shared value to drive the animation (0 = start, 1 = end)
  const progress = useSharedValue(0);

  // 3. CALCULATE TRANSFORMS FOR ALL PIECES
  // This hook calculates the position/rotation for all 150 pieces on the UI thread.
  const transforms = useRSXformBuffer(NUM_OF_CONFETTI, (val, i) => {
    "worklet";

    // Get the initial data for this specific piece
    const piece = confettiPieces.value[i];
    if (!piece) return;

    // --- ADJUSTED CALCULATION ---

    // 2. The total distance is from the highest possible start point to the bottom
    const totalDistanceToFall = height * Y_AXIS_SPREAD + height;

    // 3. Calculate the base distance so the slowest piece (speed 0.9) clears the screen.
    const baseFallDistance = totalDistanceToFall / 0.9;
    // --- END CALCULATION ---

    // Set the initial position of the confetti piece
    let tx = piece.currPositionX + piece.randomOffsetX;
    let ty = piece.currPositionY + piece.randomOffsetY + piece.initialRandomY;

    // 1. VERTICAL MOVEMENT: Animate falling down the screen
    ty += interpolate(progress.value, [0, 1], [0, baseFallDistance * piece.randomSpeed], Extrapolation.CLAMP);

    // 2. HORIZONTAL MOVEMENT: Animate the side-to-side swing
    tx += interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], piece.randomXs, Extrapolation.CLAMP);

    // 3. ROTATION & SCALE: Animate the 3D tumbling effect
    const rotationDirection = piece.clockwise ? 1 : -1;
    const rz = piece.initialRotation + interpolate(progress.value, [0, 1], [0, rotationDirection * piece.maxRotationZ], Extrapolation.CLAMP);
    const rx = piece.initialRotation + interpolate(progress.value, [0, 1], [0, rotationDirection * piece.maxRotationX], Extrapolation.CLAMP);

    // Scale simulates the x-axis rotation (flipping) by shrinking and growing the piece
    const scale = Math.abs(Math.cos(rx));

    // 4. APPLY TRANSFORM: Calculate and set the final transformation matrix
    const px = CONFETTI_WIDTH / 2;
    const py = CONFETTI_HEIGHT / 2;
    const s = Math.sin(rz) * scale;
    const c = Math.cos(rz) * scale;

    val.set(c, s, tx - c * px + s * py, ty - s * px - c * py);
  });

  // This function generates the initial state and starts the animation
  const startAnimation = () => {
    // Set the data on the UI thread
    runOnUI(() => {
      progress.value = 0;
      progress.value = withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.inOut(Easing.quad) });
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
