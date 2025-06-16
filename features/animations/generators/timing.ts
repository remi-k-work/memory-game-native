// other libraries
import { interpolate, type SharedValue } from "react-native-reanimated";
import nextFrame from "./nextFrame";

// types
import type { TimingConfig } from "@/features/animations/types";

// constants
import { DEFAULT_TIMING_CONFIG } from "@/features/animations/constants";

// Animates a shared value over a specific duration
export default function* timing(sharedValue: SharedValue<number>, rawConfig?: TimingConfig): Generator<void, void, number> {
  "worklet";

  // Take a shared value (from reanimated) to animate and an optional configuration
  const from = sharedValue.value;
  const { to, easing, duration } = { ...DEFAULT_TIMING_CONFIG, ...rawConfig };

  let elapsed = 0;
  while (elapsed < duration) {
    // Calculate progress based on the time that has passed so far
    const progress = easing(elapsed / duration);
    sharedValue.value = interpolate(progress, [0, 1], [from, to]);

    // Pause and get the delta time for the next frame, then add it to our total
    elapsed += yield* nextFrame();
  }

  // Ensure the final value is set perfectly
  sharedValue.value = to;
}
