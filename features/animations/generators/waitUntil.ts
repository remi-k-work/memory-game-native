// other libraries
import { type SharedValue } from "react-native-reanimated";

// This is a powerful condition-based wait
export default function* waitUntil(value: SharedValue<boolean>, invert = false): Generator<void, void, number> {
  "worklet";

  // It pauses the generator until a given shared value meets a certain condition (either true or false depending on invert)
  while (invert ? value.value : !value.value) yield;
}
