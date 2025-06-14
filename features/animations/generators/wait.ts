// other libraries
import timeSincePrevFrame from "./timeSincePrevFrame";

// Simply pauses execution for a given duration
export default function* wait(duration = 1000): Generator<void, void, number> {
  "worklet";

  const from: number = yield;
  const to = from + duration;

  // It just consumes frames until the duration has passed
  for (let current = from; current < to; ) {
    // Advance time by yielding to and receiving from timeSincePrevFrame()
    current += yield* timeSincePrevFrame();
  }
}
