// Allows the animation generator to "request" the delta time from the previous frame
export default function* timeSincePrevFrame(): Generator<void, number, number> {
  "worklet";

  // Yields, waits for elapsed time, then returns it
  return yield;
}
