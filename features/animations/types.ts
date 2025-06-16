// other libraries
import type { EasingFunction, SharedValue, withSpring } from "react-native-reanimated";

// types
export interface TimingConfig {
  to?: number;
  easing?: EasingFunction;
  duration?: number;
}

// Get the config type from reanimated
export type SpringConfig = Parameters<typeof withSpring>[1];

// These are the "boxes that hold numbers" (reanimated shared values) we want to change over time (our animated state)
export type AnimationSharedValues = {
  [key: string]: SharedValue<any>;
};

// An animation script is a generator function that takes our "boxes of numbers" and returns a generator
export type AnimationGenerator = (animationSharedValues: AnimationSharedValues) => Generator;

// The initial state for our "boxes of numbers" (reanimated shared values)
export type AnimationInitState = Record<string, unknown>;
