// This generator allows you to run multiple animation sequences concurrently
export default function* parallel(generators: Generator[]) {
  "worklet";

  let timeSincePrevFrame = 0;
  do {
    // Pass the same delta time to all parallel generators
    const done = generators.map((generator) => !!generator.next(timeSincePrevFrame).done);

    // All generators are done, exit the function
    if (done.every((d) => d)) return;

    // Wait for the next frame's delta time
    timeSincePrevFrame = yield;
  } while (true);
}
