// other libraries
import parallel from "./parallel";
import wait from "./wait";

// Runs multiple animation scripts in a staggered fashion
export default function* stagger(delay: number, ...animationGenerators: Generator[]): Generator<void, void, number> {
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

  // Finally, run all new staggered animation scripts concurrently
  yield* parallel(...staggeredGenerators);
}
