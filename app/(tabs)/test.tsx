// react
import { useMemo } from "react";

// react native
import { useWindowDimensions } from "react-native";

// other libraries
import spring from "@/features/animations/generators/spring";
import useAnimation from "@/features/animations/hooks/useAnimation";
import type { AnimationGenerator, AnimationInitState } from "@/features/animations/types";
import { BlurMask, Canvas, Circle, Fill, Group, mix, polar2Canvas, vec } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue, type SharedValue } from "react-native-reanimated";

const c1 = "#61bea2";
const c2 = "#529ca0";

interface RingProps {
  index: number;
  progress: SharedValue<number>;
}

const Ring = ({ index, progress }: RingProps) => {
  const { width, height } = useWindowDimensions();
  const R = width / 4;
  const center = useMemo(() => vec(width / 2, height / 2 - 64), [height, width]);

  const theta = (index * (2 * Math.PI)) / 6;
  const transform = useDerivedValue(() => {
    const { x, y } = polar2Canvas({ theta, radius: progress.value * R }, { x: 0, y: 0 });
    const scale = mix(progress.value, 0.3, 1);
    return [{ translateX: x }, { translateY: y }, { scale }];
  }, [progress, R]);

  return <Circle c={center} r={R} color={index % 2 ? c1 : c2} origin={center} transform={transform} />;
};

const animationGenerator: AnimationGenerator = function* ({ progress, isWithSpringComplete }) {
  "worklet";

  let to = 1;
  while (true) {
    // yield* timing(progress, { to, duration: 4000 });
    yield* spring(progress, to, isWithSpringComplete, { mass: 5, stiffness: 100, damping: 10 });
    to = to === 1 ? 0 : 1;
  }
};
const animationInitState: AnimationInitState = { progress: 0, isWithSpringComplete: false };

export default function Screen() {
  const { width, height } = useWindowDimensions();
  const center = useMemo(() => vec(width / 2, height / 2 - 64), [height, width]);

  const pause = useSharedValue(false);
  const { progress } = useAnimation(animationGenerator, animationInitState, pause);

  const transform = useDerivedValue(() => [{ rotate: mix(progress.value, -Math.PI, 0) }]);

  const gesture = Gesture.Tap().onEnd(() => {
    pause.value = !pause.value;
  });

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ flex: 1 }}>
        <Fill color="rgb(36,43,56)" />
        <Group origin={center} transform={transform} blendMode="screen">
          <BlurMask style="solid" blur={40} />
          {new Array(6).fill(0).map((_, index) => {
            return <Ring key={index} index={index} progress={progress} />;
          })}
        </Group>
      </Canvas>
    </GestureDetector>
  );
}
