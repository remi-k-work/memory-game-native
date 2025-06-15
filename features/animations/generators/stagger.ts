// other libraries
import parallel from "./parallel";
import wait from "./wait";

// This is a utility that allows you to run multiple animation generators with a sequential delay between their starts
export function* stagger(delay: number, ...animationGenerators: Generator[]): Generator<void, void, number> {
  "worklet";

  // Create a new staggered generator version for each provided animation generator
  const staggeredGenerators = animationGenerators.map((animationGenerator, index) => {
    return (function* () {
      // Wait for a staggered delay to pass
      yield* wait(delay * index);

      // Then run the original animation generator
      yield* animationGenerator;
    })();
  });

  // Run all new staggered animation generators in parallel
  yield* parallel(...staggeredGenerators);
}
