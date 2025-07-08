// react
import { useState } from "react";

// other libraries
import useAnimLiquidGaugeProgress from "@/features/animations/hooks/useAnimLiquidGaugeProgress";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";

// components
import ProgressText from "./ProgressText";

// types
import type { LayoutRectangle } from "react-native";

interface LiquidGaugeProgressProps {
  progress: number;
}

export default function LiquidGaugeProgress({ progress }: LiquidGaugeProgressProps) {
  // Store the canvas dimensions, which are set once the layout is calculated
  const [canvasDimensions, setCanvasDimensions] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const { width, height } = canvasDimensions;

  // Establish the required dimensions, including both the outer and inner radius of the gauge
  const outerRadius = Math.min(width, height) / 2;
  const strokeWidth = outerRadius * 0.05;
  const innerRadius = outerRadius - strokeWidth * 2;

  // Use the already encapsulated animation logic for this component
  const { clipPath } = useAnimLiquidGaugeProgress(outerRadius, innerRadius, progress);

  return (
    <Canvas style={{ flex: 1 }} onLayout={(ev) => setCanvasDimensions(ev.nativeEvent.layout)}>
      <Circle cx={outerRadius} cy={outerRadius} r={outerRadius - strokeWidth / 2} color="#178BCA" style="stroke" strokeWidth={strokeWidth} />

      {/* Progress text which will be drawn above the wave (water) */}
      <ProgressText outerRadius={outerRadius} progress={progress} color="#045681" />

      {/* Use the dynamically transformed path to clip the group */}
      <Group clip={clipPath}>
        {/* The "water" fill, drawn in the main coordinate space */}
        <Circle cx={outerRadius} cy={outerRadius} r={innerRadius} color="#178BCA" />

        {/* Progress text which will be drawn under the wave (water) */}
        <ProgressText outerRadius={outerRadius} progress={progress} color="#A4DBF8" />
      </Group>
    </Canvas>
  );
}
