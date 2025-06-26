// Runs multiple animation scripts concurrently
export default function* parallel(...animationGenerators: Generator[]): Generator<void, void, number> {
  "worklet";

  // Create a stateful list of tasks to track their completion
  const tasks = animationGenerators.map((generator) => ({ generator, done: false }));

  // Loop as long as there is at least one task that is not yet done
  while (tasks.some((task) => !task.done)) {
    // Pause this generator and wait for the main animation loop to provide the delta time for the next frame
    const deltaTime = yield;

    // Iterate over all the tasks
    for (const task of tasks) {
      // If a task is not yet finished, advance it by one step
      if (!task.done) {
        // Pass the delta time we received from the main loop down to the child generator
        const result = task.generator.next(deltaTime);

        // If the child generator has now finished, update its state
        if (result.done) task.done = true;
      }
    }
  }
}
