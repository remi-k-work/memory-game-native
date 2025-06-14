// types
import type { Animation, AnimationGenerator, AnimationInitState, GeneratorInput } from "@/features/animations/types";

// Helper function to create a structured animation object that bundles the animation logic (the generator + shared values) and its initial state
export const makeAnimation = (animationGenerator: AnimationGenerator, animationInitState: AnimationInitState): Animation => ({
  animationGenerator,
  animationInitState,
});

const materializeGenerator = (generator: GeneratorInput) => {
  "worklet";

  return typeof generator === "function" ? generator() : generator;
};
