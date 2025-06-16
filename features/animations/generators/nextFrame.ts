// The fundamental animation command; pauses execution for one frame and returns the elapsed time (delta time)
export default function* nextFrame(): Generator<void, number, number> {
  "worklet";

  // Yield to the player, and when resumed, return the delta time it provides
  return yield;
}
