// react
import { useCallback } from "react";

// expo
import { useFocusEffect } from "expo-router";

// other libraries
import useSkottiePlayer from "./useSkottiePlayer";

// types
import type { SkSize, SkSkottieAnimation } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

// For smooth animation playback, combine skottie with react native reanimated (composes the base hook and applies the focus behavior)
export default function useFocusAwareSkottiePlayer(currentCanvasSize: SharedValue<SkSize>, animation: SkSkottieAnimation) {
  // Get the core mechanics and the play function from our base hook
  const { transform, frame, play } = useSkottiePlayer(currentCanvasSize, animation);

  // Call the play function when the screen is focused
  useFocusEffect(
    useCallback(() => {
      play();
    }, [play]),
  );

  // Return all that is needed to play the animation
  return { transform, frame };
}
