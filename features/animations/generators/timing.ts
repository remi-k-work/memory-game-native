// other libraries
import { interpolate, type SharedValue } from "react-native-reanimated";
import timeSincePrevFrame from "./timeSincePrevFrame";

// types
import type { TimingConfig } from "@/features/animations/types";

// constants
import { DEFAULT_TIMING_CONFIG } from "@/features/animations/constants";

// This is the standard timing-based animation
export default function* timing(value: SharedValue<number>, rawConfig?: TimingConfig) {
  "worklet";

  // Take a SharedValue (from Reanimated) to animate and an optional configuration
  const from = value.value;
  const { to, easing, duration } = { ...DEFAULT_TIMING_CONFIG, ...rawConfig };

  // Yield to get the start time of the animation
  const start: number = yield;
  const end = start + duration;

  // Enter a for loop that continues until the duration is met
  for (let current = start; current < end; ) {
    // Calculate the progress of the animation using the easing function
    const progress = easing((current - start) / duration);

    // Interpolate the value based on this progress
    const val = interpolate(progress, [0, 1], [from, to]);
    value.value = val;

    // Advance time by yielding to and receiving from timeSincePrevFrame()
    current += yield* timeSincePrevFrame();
  }

  // Finally, set the value to "to" to ensure accuracy
  value.value = to;
}
