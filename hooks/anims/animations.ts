// react
import { useEffect, useState } from "react";

// other libraries
import {
  type EasingFunction,
  type SharedValue,
  cancelAnimation,
  Easing,
  interpolate,
  makeMutable,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

// types
type Input = (() => Generator) | Generator;
type Inputs = Input[];

interface TimingConfig {
  to?: number;
  easing?: EasingFunction;
  duration?: number;
}

type AnimationValues<S> = {
  [K in keyof S]: SharedValue<S[K]>;
};

type AnimationState = Record<string, unknown>;

type Animation<S extends AnimationState> = {
  animation: (state: AnimationValues<S>) => Generator;
  state: S;
};

// constants
const DEFAULT_TIMING_CONFIG: Required<TimingConfig> = { to: 1, easing: Easing.inOut(Easing.ease), duration: 600 } as const;

const materializeGenerator = (input: Input) => {
  "worklet";

  return typeof input === "function" ? input() : input;
};

// Helper function to create a structured animation object, bundling the animation logic
// (a generator function that takes SharedValues as state) with its initial state values
export const makeAnimation = <S extends AnimationState>(animation: (state: AnimationValues<S>) => Generator, state: S) => ({ animation, state });

// This hook initializes SharedValues for each property in the provided state object
const useSharedValues = <S extends AnimationState>(state: S) => {
  // Create SharedValues from initial state
  const [mutable] = useState(() => {
    const values = {} as AnimationValues<S>;
    for (const key in state) values[key] = makeMutable(state[key]);

    return values;
  });

  // Ensure that any active Reanimated animations on these SharedValues are canceled when the component unmounts
  useEffect(() => {
    return () => {
      Object.keys(mutable).forEach((element) => {
        cancelAnimation(mutable[element]);
      });
    };
  }, [mutable]);

  // Return the shared values so they can be used in components
  return mutable;
};

// This is the core hook that orchestrates the generator-based animations
export const useAnimation = <S extends AnimationState>(input: Animation<S> | (() => Generator), isPaused?: SharedValue<boolean>) => {
  const { animation, state } = typeof input === "function" ? { animation: input, state: {} as S } : input;

  // Initialize shared values based on the animation's state
  const values = useSharedValues(state);

  // Hold the single instance of the generator that will drive the animation
  const generator = useSharedValue<null | Generator>(null);

  useFrameCallback(({ timeSincePreviousFrame: ts }) => {
    // Initialize the generator if it has not been done already
    if (!generator.value) generator.value = animation(values);

    // Advance the generator, passing the timeSincePreviousFrame() value to it if not paused
    if (!isPaused?.value) generator.value.next(ts);
  });

  // Return the shared values so they can be used in components
  return values;
};

// Allows the animation to "request" the delta time from the previous frame
export function* timeSincePreviousFrame() {
  "worklet";

  // Get the time since the last frame
  const time: number = yield;
  return time;
}

// Simply pauses execution for a given duration
export function* wait(duration = 1000) {
  "worklet";

  const from: number = yield;
  const to = from + duration;

  // It just consumes frames until the duration has passed
  for (let current = from; current < to; ) {
    // Advance time by yielding to and receiving from timeSincePreviousFrame()
    current += yield* timeSincePreviousFrame();
  }
}

export function* timing(value: SharedValue<number>, rawConfig?: TimingConfig) {
  "worklet";

  const from = value.value;
  const { to, easing, duration } = { ...DEFAULT_TIMING_CONFIG, ...rawConfig };
  const start: number = yield;
  const end = start + duration;
  for (let current = start; current < end; ) {
    const progress = easing((current - start) / duration);
    const val = interpolate(progress, [0, 1], [from, to]);
    value.value = val;
    current += yield* timeSincePreviousFrame();
  }
  value.value = to;
}
