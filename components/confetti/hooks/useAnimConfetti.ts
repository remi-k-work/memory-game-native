// react
import { useEffect } from "react";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { useRSXformBuffer } from "@shopify/react-native-skia";
import { Easing, Extrapolation, interpolate, useSharedValue, withTiming } from "react-native-reanimated";

// types
import type { ConfettiPiece } from "@/components/confetti/types";
import type { DerivedValue } from "react-native-reanimated";

// constants
import { ANIMATION_DURATION, CONFETTI_HEIGHT, CONFETTI_WIDTH, NUM_OF_CONFETTI, Y_AXIS_SPREAD } from "@/components/confetti/constants";

// Encapsulate the animation logic in a custom hook
export default function useAnimConfetti(confettiPieces: DerivedValue<ConfettiPiece[]>) {
  // Determine the current screen orientation and size
  const { height } = useOrientation();

  // A shared value to drive the animation (0 = start, 1 = end)
  const progress = useSharedValue(0);

  // This hook calculates the position/rotation for all confetti pieces on the ui thread
  const transforms = useRSXformBuffer(NUM_OF_CONFETTI, (val, i) => {
    "worklet";

    // Get the initial data for this specific piece
    const piece = confettiPieces.value[i];
    if (!piece) return;

    // The total distance is from the highest possible start point to the bottom
    const totalDistanceToFall = height * Y_AXIS_SPREAD + height;

    // Calculate the base distance so the slowest piece (speed 0.9) clears the screen
    const baseFallDistance = totalDistanceToFall / 0.9;

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

  // Start the animation when the component mounts
  useEffect(() => {
    progress.value = withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.inOut(Easing.quad) });
  }, []);

  // Return all that is needed to trigger the animation
  return { transforms };
}
