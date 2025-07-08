// react
import { useEffect, useMemo } from "react";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { Skia } from "@shopify/react-native-skia";
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

// types
import type { SkFont } from "@shopify/react-native-skia";

// constants

// Number of points to define the wave shape
const WAVE_POINTS = 40;

// How many full waves are visible
const WAVE_COUNT = 1;

// Encapsulate the animation logic in a custom hook
export default function useAnimLiquidGaugeProgress(outerRadius: number, innerRadius: number, progress: number) {
  // Establish the required dimensions, including both the full wavelength and height
  const waveLength = (innerRadius * 2) / WAVE_COUNT;
  const waveHeight = innerRadius * 0.1;
  const gaugePadding = outerRadius - innerRadius;

  // Calculate the percent of how much progress should be filled
  const fillPercent = Math.max(0, Math.min(100, progress)) / 100;

  // Create the base wave path (memoized for performance)
  const baseWavePath = useMemo(() => {
    const path = Skia.Path.Make();

    // Start at bottom-left of the clipping area
    path.moveTo(0, innerRadius);

    // Draw the top wavy line, adding an extra wave at the end to loop the animation
    for (let i = 0; i <= WAVE_POINTS; i++)
      path.lineTo((i / WAVE_POINTS) * (innerRadius * 4), Math.sin((i / WAVE_POINTS) * 2 * Math.PI * (WAVE_COUNT * 2)) * waveHeight);

    // Close the path to create a fillable shape below the wave
    path.lineTo(innerRadius * 4, innerRadius * 3);
    path.lineTo(0, innerRadius * 3);
    path.close();

    return path;
  }, [innerRadius, waveHeight]);

  // Control both the x and y translation of the base wave path
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Create a new transformed path for clipping
  const clipPath = useDerivedValue(() => {
    const transformedPath = baseWavePath.copy();
    const matrix = Skia.Matrix();

    matrix.translate(gaugePadding - waveLength * translateX.value, gaugePadding + innerRadius * 2 * (1 - translateY.value) - waveHeight);
    transformedPath.transform(matrix);

    return transformedPath;
  });

  // When the component is mounted, trigger the water wave movement animation and loop it
  useEffect(() => {
    translateX.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.linear }), -1);
  }, []);

  // Move the water wave upwards when the fill percent changes
  useDidUpdateEffect(() => {
    translateY.value = withTiming(fillPercent, { duration: 1000 });
  }, [fillPercent]);

  // Return all that is needed to trigger the animation
  return { clipPath };
}

// Encapsulate the animation logic in a custom hook
export function useAnimProgressText(progress: number, outerRadius: number, font: SkFont | null) {
  // The being animated progress value
  const progressValue = useSharedValue(0);

  // Trigger the animation when the progress changes
  useDidUpdateEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 });
  }, [progress]);

  // Derived value for the animated progress text string
  const progressText = useDerivedValue(() => `${progressValue.value.toFixed(0)}%`);

  // Derived value for the animated x position, ensuring centering
  const animatedX = useDerivedValue(() => {
    // Check if font is available before measuring
    if (!font) return 0;

    // Measure the width of the progress text as it will be drawn
    return outerRadius - (font.measureText(progressText.value).width ?? 0) / 2;
  });

  // Return all that is needed to trigger the animation
  return { progressText, animatedX };
}
