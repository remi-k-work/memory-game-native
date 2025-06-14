// other libraries
import type { EasingFunction, SharedValue } from "react-native-reanimated";

// types
type Input = (() => Generator) | Generator;
type Inputs = Input[];

export interface TimingConfig {
  to?: number;
  easing?: EasingFunction;
  duration?: number;
}

export type AnimationValues<S> = {
  [K in keyof S]: SharedValue<S[K]>;
};

export type AnimationState = Record<string, unknown>;

export type Animation<S extends AnimationState> = {
  animation: (state: AnimationValues<S>) => Generator;
  state: S;
};
