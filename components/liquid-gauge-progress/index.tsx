// react
import { useState } from "react";

// other libraries
import useAnimLiquidGaugeProgress from "@/features/animations/hooks/useAnimLiquidGaugeProgress";
import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import Animated from "react-native-reanimated";

// components
import ProgressText from "./ProgressText";

// types
import type { LayoutRectangle } from "react-native";

// constants
const GAUGE_MARGIN = 40;

interface LiquidGaugeProgressProps {
  progress: number;
}

export default function LiquidGaugeProgress({ progress }: LiquidGaugeProgressProps) {
  // Store the canvas dimensions, which are set once the layout is calculated
  const [canvasDimensions, setCanvasDimensions] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const { width, height } = canvasDimensions;

  // A flag to determine if we can safely render the skia elements
  const hasLayout = width > 0 && height > 0;

  // Calculate the available diameter for the gauge, including the margin
  const gaugeDiameter = Math.min(width, height) - GAUGE_MARGIN;

  // Calculate the translation needed to move the gauge to the center of the canvas
  const translateX = (width - gaugeDiameter) / 2;
  const translateY = (height - gaugeDiameter) / 2;

  // Establish the required dimensions, including both the outer and inner radius of the gauge
  const outerRadius = gaugeDiameter / 2;
  const strokeWidth = outerRadius * 0.05;
  const innerRadius = outerRadius - strokeWidth * 2;

  // Use the already encapsulated animation logic for this component
  const { GAUGE_ENTERING, GAUGE_EXITING, clipPath } = useAnimLiquidGaugeProgress(outerRadius, innerRadius, progress);

  return (
    <Animated.View entering={GAUGE_ENTERING} exiting={GAUGE_EXITING} className="flex-1">
      <Canvas style={{ flex: 1 }} onLayout={(ev) => setCanvasDimensions(ev.nativeEvent.layout)}>
        {/* Only attempt to draw if the canvas has a layout */}
        {hasLayout && (
          <>
            {/* Translate the group to move its entire content to the center of the canvas */}
            <Group transform={[{ translateX }, { translateY }]}>
              {/* The center of the gauge within this group is now (outerRadius, outerRadius) */}
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
            </Group>
          </>
        )}
      </Canvas>
    </Animated.View>
  );
}
