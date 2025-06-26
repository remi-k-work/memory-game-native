// other libraries
import { withSpring } from "react-native-reanimated";

// types
import type { AnimatableValue, AnimationCallback, SharedValue, WithSpringConfig } from "react-native-reanimated";

// Animates a shared value via Reanimated's withSpring function
export default function* spring(
  sharedValue: SharedValue<any>,
  toValue: AnimatableValue,
  config?: WithSpringConfig,
  callback?: AnimationCallback,
): Generator<void, void, number> {
  "worklet";

  // Apply the Reanimated's withSpring function
  sharedValue.value = withSpring(toValue, config, callback);
}
