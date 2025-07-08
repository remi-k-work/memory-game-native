// react
import { memo, useMemo, useState } from "react";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { Canvas, Fill, Group, interpolate, LinearGradient, Mask, Rect, Shadow, vec } from "@shopify/react-native-skia";

// types
import type { AnimatedProp, Color } from "@shopify/react-native-skia";
import type { LayoutRectangle } from "react-native";

interface WallpaperProps {
  backgroundGradientColors: AnimatedProp<Color[]>;
  stripesGradientColors: AnimatedProp<Color[]>;
}

// constants
const LENGTH = 9;
const STRIPES = [...Array(LENGTH).keys()];

function Wallpaper({ backgroundGradientColors, stripesGradientColors }: WallpaperProps) {
  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Store the canvas dimensions, which are set once the layout is calculated
  const [canvasDimensions, setCanvasDimensions] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const { width, height } = canvasDimensions;

  // This hook memoizes orientation-specific calculations to prevent re-computation on every render
  const orientationConfig = useMemo(() => {
    // Calculate the size of a single stripe based on the dominant screen dimension
    const stripeSize = isPortrait ? width / LENGTH : height / LENGTH;

    // Define the end point for linear gradients, vertical for portrait and horizontal for landscape
    const gradientEndPoint = isPortrait ? vec(0, height) : vec(width, 0);

    return {
      stripeSize,
      gradientEndPoint,

      // Define the dimensions for each stripe's rectangle
      stripeRect: { width: isPortrait ? stripeSize : width, height: isPortrait ? height : stripeSize },

      // A function that returns the transformation for each stripe
      groupTransform: (i: number) =>
        isPortrait
          ? // In portrait, stripes move horizontally (translateX) and scale vertically (scaleY)
            [{ translateX: i * stripeSize }, { scaleY: interpolate(i, [0, (LENGTH - 1) / 2, LENGTH - 1], [1, 0.9, 1]) }]
          : // In landscape, they move vertically (translateY) and scale horizontally (scaleX)
            [{ translateY: i * stripeSize }, { scaleX: interpolate(i, [0, (LENGTH - 1) / 2, LENGTH - 1], [1, 0.9, 1]) }],
    };
  }, [isPortrait, width, height]);

  return (
    <Canvas style={{ flex: 1 }} onLayout={(ev) => setCanvasDimensions(ev.nativeEvent.layout)}>
      <Fill>
        <LinearGradient start={vec(0, 0)} end={orientationConfig.gradientEndPoint} colors={backgroundGradientColors} />
      </Fill>
      <Group>
        <LinearGradient start={vec(0, 0)} end={orientationConfig.gradientEndPoint} colors={stripesGradientColors} />
        <Shadow dx={10} dy={0} blur={20} color="rgba(0, 0, 0, 0.8)" />
        {STRIPES.map((i) => (
          <Group key={i} origin={vec(width / 2, height / 2)} transform={orientationConfig.groupTransform(i)}>
            <Mask
              mask={
                <Group>
                  <LinearGradient
                    start={vec(0, 0)}
                    end={orientationConfig.gradientEndPoint}
                    positions={[0, 0.1, 0.9, 1]}
                    colors={["transparent", "black", "black", "transparent"]}
                  />
                  <Shadow dx={10} dy={0} blur={20} color="black" />
                  <Rect x={0} y={0} {...orientationConfig.stripeRect} />
                </Group>
              }
            >
              <Rect x={0} y={0} {...orientationConfig.stripeRect} />
            </Mask>
          </Group>
        ))}
      </Group>
    </Canvas>
  );
}

export default memo(Wallpaper);
