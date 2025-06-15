// other libraries
import type { EasingFunction, SharedValue } from "react-native-reanimated";

// types
export interface TimingConfig {
  to?: number;
  easing?: EasingFunction;
  duration?: number;
}

export type AnimationSharedValues = {
  [key: string]: SharedValue<any>;
};

export type AnimationGenerator = (animationSharedValues: AnimationSharedValues) => Generator;
export type AnimationInitState = Record<string, unknown>;
