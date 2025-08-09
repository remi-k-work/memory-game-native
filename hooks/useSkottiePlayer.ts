// react
import { useCallback } from "react";

// other libraries
import { Easing, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

// types
import type { SkSize, SkSkottieAnimation } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

// For smooth animation playback, combine skottie with react native reanimated
export default function useSkottiePlayer(currentCanvasSize: SharedValue<SkSize>, animation: SkSkottieAnimation) {
  // Calculate the scale factor to fit the animation within the canvas
  const transform = useDerivedValue(() => [
    { scale: Math.min(currentCanvasSize.value.width / animation.size().width, currentCanvasSize.value.height / animation.size().height) },
  ]);

  // Use a 'progress' value instead of tracking time; this value will go from 0 (start) to 1 (end)
  const progress = useSharedValue(0);

  // Calculate the total number of frames
  const totalFrames = animation.duration() * animation.fps();

  // The 'frame' is now a simple derivation of progress
  const frame = useDerivedValue(() => Math.floor(progress.value * totalFrames));

  // Expose a function to play the animation
  const play = useCallback(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: animation.duration() * 1000, easing: Easing.linear });
  }, [progress, animation]);

  // Add a reset function for more control
  const reset = useCallback(() => {
    progress.value = 0;
  }, [progress]);

  // Return all that is needed to play the animation
  return { transform, frame, play, reset };
}
