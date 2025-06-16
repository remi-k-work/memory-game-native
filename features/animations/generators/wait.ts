// other libraries
import nextFrame from "./nextFrame";

// Pauses the animation script for a given duration; it "consumes" frames by repeatedly pausing (yielding to the player)
// until the total accumulated delta time meets the desired duration
export default function* wait(duration = 1000): Generator<void, void, number> {
  "worklet";

  let elapsed = 0;
  while (elapsed < duration) {
    // Pause, get the delta time from the player for the next frame, and add it to our total elapsed time
    elapsed += yield* nextFrame();
  }
}
