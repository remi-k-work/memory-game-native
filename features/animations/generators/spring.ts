// other libraries
import { withSpring } from "react-native-reanimated";
import nextFrame from "./nextFrame";

// types
import type { AnimatableValue, SharedValue, WithSpringConfig } from "react-native-reanimated";

// Animates a shared value via Reanimated's withSpring function
export default function* spring(sharedValue: SharedValue<any>, toValue: AnimatableValue, config?: WithSpringConfig): Generator<void, void, number> {
  "worklet";

  // Yield to the player (it freezes without this)
  yield* nextFrame();

  // To signal withSpring completion
  let isWithSpringComplete = false;

  // Apply the spring animation and signal its completion
  sharedValue.value = withSpring(toValue, config, (isFinished) => (isWithSpringComplete = !!isFinished));

  // Yield frames until the spring animation completes
  while (!isWithSpringComplete) yield* nextFrame();
}
