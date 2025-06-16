// other libraries
import { withSpring, type SharedValue } from "react-native-reanimated";
import nextFrame from "./nextFrame";

// types
import type { SpringConfig } from "@/features/animations/types";

// Animates a shared value using reanimated's withspring animation function
export default function* spring(
  sharedValue: SharedValue<number>,
  toValue: number,
  isWithSpringComplete: SharedValue<boolean>,
  config?: SpringConfig,
): Generator<void, void, number> {
  "worklet";

  // Create a mutable shared value to signal animation completion
  isWithSpringComplete.value = false;

  // Apply the spring animation; The final argument is a worklet callback
  sharedValue.value = withSpring(toValue, config, (isFinished) => {
    // Signal completion on the UI thread
    if (isFinished) isWithSpringComplete.value = true;
  });

  // Now, we yield frames until the shared value signals completion.
  // This effectively pauses our generator script until withSpring reports it's done.
  while (!isWithSpringComplete.value) {
    yield* nextFrame(); // Keep yielding frames (and receiving deltaTime, which we ignore here)
  }
}
