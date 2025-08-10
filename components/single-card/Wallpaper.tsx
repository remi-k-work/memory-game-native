// react
import { memo, useMemo, useState } from "react";

// react native
import { View } from "react-native";

// other libraries
import { Canvas, Fill, Group, interpolate, LinearGradient, Mask, Rect, Shadow, vec } from "@shopify/react-native-skia";

// types
import type { AnimatedProp, Color } from "@shopify/react-native-skia";
import type { LayoutRectangle } from "react-native";

interface WallpaperProps {
  backgroundGradientColors: AnimatedProp<Color[]>;
  stripesGradientColors: AnimatedProp<Color[]>;
}

// constants
const NUM_OF_STRIPES = 9;
const STRIPES = [...Array(NUM_OF_STRIPES).keys()];

function Wallpaper({ backgroundGradientColors, stripesGradientColors }: WallpaperProps) {
  // Store the canvas dimensions, which are set once the layout is calculated
  const [canvasDimensions, setCanvasDimensions] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const { width, height } = canvasDimensions;

  // This hook memoizes orientation-specific calculations to prevent re-computation on every render
  const orientationConfig = useMemo(() => {
    // Establish the current wallpaper's orientation
    const isPortrait = height >= width;

    // Calculate the size of a single stripe based on the dominant screen dimension
    const stripeSize = isPortrait ? width / NUM_OF_STRIPES : height / NUM_OF_STRIPES;

    return {
      // Define the end point for linear gradients, vertical for portrait and horizontal for landscape
      gradientEndPoint: isPortrait ? vec(0, height) : vec(width, 0),

      // Define the dimensions for each stripe's rectangle
      stripeRect: { width: isPortrait ? stripeSize : width, height: isPortrait ? height : stripeSize },

      // A function that returns the transformation for each stripe
      groupTransform: (stripeIndex: number) =>
        // In portrait, stripes move horizontally and scale vertically; otherwise, they move vertically and scale horizontally
        isPortrait
          ? [{ translateX: stripeIndex * stripeSize }, { scaleY: interpolate(stripeIndex, [0, (NUM_OF_STRIPES - 1) / 2, NUM_OF_STRIPES - 1], [1, 0.9, 1]) }]
          : [{ translateY: stripeIndex * stripeSize }, { scaleX: interpolate(stripeIndex, [0, (NUM_OF_STRIPES - 1) / 2, NUM_OF_STRIPES - 1], [1, 0.9, 1]) }],
    };
  }, [width, height]);

  return (
    <View className="flex-1" onLayout={(ev) => setCanvasDimensions(ev.nativeEvent.layout)}>
      <Canvas style={{ flex: 1 }}>
        <Fill>
          <LinearGradient start={vec(0, 0)} end={orientationConfig.gradientEndPoint} colors={backgroundGradientColors} />
        </Fill>
        <Group>
          <LinearGradient start={vec(0, 0)} end={orientationConfig.gradientEndPoint} colors={stripesGradientColors} />
          <Shadow dx={10} dy={0} blur={20} color="rgba(0, 0, 0, 0.8)" />
          {STRIPES.map((stripeIndex) => (
            <Group key={stripeIndex} origin={vec(width / 2, height / 2)} transform={orientationConfig.groupTransform(stripeIndex)}>
              <Mask
                mask={
                  <Rect x={0} y={0} {...orientationConfig.stripeRect}>
                    <LinearGradient
                      start={vec(0, 0)}
                      end={orientationConfig.gradientEndPoint}
                      positions={[0, 0.1, 0.9, 1]}
                      colors={["transparent", "black", "black", "transparent"]}
                    />
                  </Rect>
                }
              >
                <Rect x={0} y={0} {...orientationConfig.stripeRect} />
              </Mask>
            </Group>
          ))}
        </Group>
      </Canvas>
    </View>
  );
}

export default memo(Wallpaper);
