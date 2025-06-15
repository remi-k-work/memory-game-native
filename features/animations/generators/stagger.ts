// other libraries
import parallel from "./parallel";
import wait from "./wait";

// This is a utility that allows you to run multiple animations with a sequential delay between their starts
export function* stagger(delay: number, generators: Generator[]): Generator<void, void, number> {
  "worklet";

  const staggeredGenerators = generators.map((generator, index) => {
    return (function* () {
      // Wait for a staggered delay
      yield* wait(delay * index);

      // Then run the actual animation
      yield* generator;
    })();
  });

  // Run all staggered animations in parallel
  yield* parallel(staggeredGenerators);
}
