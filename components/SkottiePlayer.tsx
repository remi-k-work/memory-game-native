// other libraries
import useFocusAwareSkottiePlayer from "@/hooks/useFocusAwareSkottiePlayer";
import { Canvas, Group, Skottie } from "@shopify/react-native-skia";
import { useSharedValue } from "react-native-reanimated";

// types
import type { SkSize, SkSkottieAnimation } from "@shopify/react-native-skia";

interface SkottiePlayerProps {
  animation: SkSkottieAnimation;
}

export default function SkottiePlayer({ animation }: SkottiePlayerProps) {
  // This shared value is used to store the current canvas size, which may change depending on the screen orientation
  const currentCanvasSize = useSharedValue<SkSize>({ width: 0, height: 0 });

  // For smooth animation playback, combine skottie with react native reanimated (composes the base hook and applies the focus behavior)
  const { transform, frame } = useFocusAwareSkottiePlayer(currentCanvasSize, animation);

  return (
    <Canvas style={{ flex: 1 }} onSize={currentCanvasSize}>
      <Group transform={transform}>
        <Skottie animation={animation} frame={frame} />
      </Group>
    </Canvas>
  );
}
