// This allows you to run multiple animation generators concurrently
export default function* parallel(...animationGenerators: Generator[]): Generator<void, void, number> {
  "worklet";

  // Yield and get elapsed time from the frame callback
  let timeSincePrevFrame = yield;

  do {
    // Pass the same delta time to all parallel generators
    const done = animationGenerators.map((animationGenerator) => !!animationGenerator.next(timeSincePrevFrame).done);

    // All animation generators are done, exit the function
    if (done.every((d) => d)) return;

    // Wait for the next frame's delta time
    timeSincePrevFrame = yield;
  } while (true);
}
