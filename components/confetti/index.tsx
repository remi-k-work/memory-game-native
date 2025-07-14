import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { Atlas, Canvas, useRSXformBuffer } from "@shopify/react-native-skia";

import { Easing, Extrapolation, interpolate, runOnUI, useSharedValue, withTiming } from "react-native-reanimated";
import useConfettiLogic from "./useConfettiLogic";

// --- Configuration ---
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

    const fallingMaxYMovement = 1000;

    let tx = 0;
    let ty = 0;

    // Already includes random offsets for x and y
    const { x, y } = piece.position;

    const initialRandomY = piece.initialRandomY;
    tx = x + piece.randomOffsetX;
    ty = y + piece.randomOffsetY + initialRandomY;

    // Apply random speed to the fall height
    const yChange = interpolate(
      progress.value,
      [0, 1],
      [0, fallingMaxYMovement * piece.randomSpeed], // Use random speed here
      Extrapolation.CLAMP,
    );

    // Interpolate between randomX values for smooth left-right movement
    const randomX = interpolate(
      progress.value,
      generateEvenlyDistributedValues(1, 2, piece.randomXs.length),
      piece.randomXs, // Use the randomX array for horizontal movement
      Extrapolation.CLAMP,
    );

    tx += randomX;
    ty += yChange;

    const rotationDirection = piece.clockwise ? 1 : -1;

    const rz = piece.initialRotation + interpolate(progress.value, [0, 1], [0, rotationDirection * piece.maxRotation.z], Extrapolation.CLAMP);
    const rx = piece.initialRotation + interpolate(progress.value, [0, 1], [0, rotationDirection * piece.maxRotation.x], Extrapolation.CLAMP);

    const oscillatingScale = Math.abs(Math.cos(rx)); // Scale goes from 1 -> 0 -> 1
    const scale = oscillatingScale;

    const px = CONFETTI_WIDTH / 2;
    const py = CONFETTI_HEIGHT / 2;

    // Apply the transformation, including the flipping effect and randomX oscillation
    const s = Math.sin(rz) * scale;
    const c = Math.cos(rz) * scale;

    // Use the interpolated randomX for horizontal oscillation
    val.set(c, s, tx - c * px + s * py, ty - s * px - c * py);
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
