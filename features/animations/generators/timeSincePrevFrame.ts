// Allows the animation to "request" the delta time from the previous frame
export default function* timeSincePrevFrame() {
  "worklet";

  // Get the time since the last frame
  const time: number = yield;
  return time;
}
