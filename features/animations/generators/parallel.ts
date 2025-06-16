// Runs multiple animation scripts concurrently
export default function* parallel(...animationGenerators: Generator[]): Generator<void, void, number> {
  "worklet";

  // Get the delta time for the current frame
  let deltaTime = yield;

  do {
    // Give the same delta time to every script that has not finished yet
    const allDone = animationGenerators.map((animationGenerator) => !!animationGenerator.next(deltaTime).done);

    // If all scripts have finished, exit the parallel command
    if (allDone.every((isDone) => isDone)) return;

    // Get the delta time for the next frame
    deltaTime = yield;
  } while (true);
}
