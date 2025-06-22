// other libraries
import nextFrame from "./nextFrame";

// types
import type { SharedValue } from "react-native-reanimated";

// Pauses the animation script until a boolean shared value meets a specific condition
export default function* waitUntil(sharedValue: SharedValue<boolean>, invert = false): Generator<void, void, number> {
  "worklet";

  // This helper function defines the state we are waiting for (if not inverted, we wait for the value to be "true", and vice versa)
  const hasConditionBeenMet = () => (invert ? !sharedValue.value : sharedValue.value);

  // On every frame, check the condition
  while (!hasConditionBeenMet()) {
    // If the condition is not met, pause the script and wait for the player to resume us on the next frame
    yield* nextFrame();
  }
}
