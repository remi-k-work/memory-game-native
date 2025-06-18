// other libraries
import { withSpring, type SharedValue } from "react-native-reanimated";
import nextFrame from "./nextFrame";

// types
import type { SpringConfig } from "@/features/animations/types";

// Animates a shared value via spring-based function interpolation (bridges to reanimated's withspring function)
export default function* spring(
  sharedValue: SharedValue<number>,
  toValue: number,
  isWithSpringComplete: SharedValue<boolean>,
  config?: SpringConfig,
): Generator<void, void, number> {
  "worklet";

  // This shared value is used to signal animation completion
  isWithSpringComplete.value = false;

  // Apply the spring animation and signal its completion on the ui thread
  sharedValue.value = withSpring(toValue, config, (isFinished) => {
    if (isFinished) isWithSpringComplete.value = true;
  });

  // Yield frames until the shared value signals completion
  while (!isWithSpringComplete.value) yield* nextFrame();
}
