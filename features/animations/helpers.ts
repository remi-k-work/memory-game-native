// types
import type { AnimationState, AnimationValues } from "@/features/animations/types";

// Helper function to create a structured animation object, bundling the animation logic
// (a generator function that takes SharedValues as state) with its initial state values
export const makeAnimation = <S extends AnimationState>(animation: (state: AnimationValues<S>) => Generator, state: S) => ({ animation, state });
