// Runs multiple animation scripts one after another in sequence
export default function* sequence(...animationGenerators: Generator[]): Generator<unknown, void, number> {
  "worklet";

  // Iterate through each animation generator provided in the arguments
  for (const animationGenerator of animationGenerators) {
    // Delegate control completely to the current animation generator until it finishes, then continue to the next one
    yield* animationGenerator;
  }
}
