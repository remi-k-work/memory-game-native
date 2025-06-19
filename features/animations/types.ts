// other libraries
import type { EasingFunction, SharedValue } from "react-native-reanimated";

// types
export interface TimingConfig {
  to?: number;
  easing?: EasingFunction;
  duration?: number;
}

// These are the "boxes that hold numbers" (reanimated shared values) we want to change over time (our animated state)
export type AnimationSharedValues<S extends AnimationInitState> = {
  [K in keyof S]: SharedValue<S[K]>;
};

// An animation script is a generator function that takes our "boxes of numbers" and returns a generator
export type AnimationGenerator<S extends AnimationInitState> = (animationSharedValues: AnimationSharedValues<S>) => Generator;

// The initial state for our "boxes of numbers" (reanimated shared values)
export type AnimationInitState = Record<string, unknown>;
