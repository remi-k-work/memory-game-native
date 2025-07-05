// react
import { useState } from "react";

// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import { Canvas, Fill, Group, interpolate, LinearGradient, Mask, Rect, Shadow, vec } from "@shopify/react-native-skia";
import Animated from "react-native-reanimated";

// constants
const LENGTH = 9;
const STRIPES = new Array(LENGTH).fill(0).map((_, i) => i);

export default function RegularSide() {
  const [cardCanvasWidth, setCardCanvasWidth] = useState(0);
  const [cardCanvasHeight, setCardCanvasHeight] = useState(0);
  const width = cardCanvasWidth / LENGTH;
  const origin = vec(cardCanvasWidth / 2, cardCanvasHeight / 2);

  // Use the already encapsulated animation logic for this component
  const { LOAD_ENTERING, LOAD_EXITING } = useAnimSingleCard();

  return (
    <Animated.View entering={LOAD_ENTERING} exiting={LOAD_EXITING} className="flex-1">
      <Canvas
        style={{ flex: 1 }}
        onLayout={(ev) => {
          setCardCanvasWidth(ev.nativeEvent.layout.width);
          setCardCanvasHeight(ev.nativeEvent.layout.height);
        }}
      >
        <Fill>
          <LinearGradient start={vec(0, 0)} end={vec(0, cardCanvasHeight)} colors={["#1A0049", "#2F0604"]} />
        </Fill>
        <Group>
          <LinearGradient start={vec(0, 0)} end={vec(0, cardCanvasHeight)} colors={["#5a3ec3", "#eba5c5", "#e1d4b7", "#e9b74c", "#cf1403"]} />
          <Shadow dx={10} dy={0} blur={20} color="rgba(0, 0, 0, 0.8)" />
          {STRIPES.map((i) => (
            <Group
              key={i}
              origin={origin}
              transform={[
                { translateX: i * width },
                {
                  scaleY: interpolate(i, [0, (LENGTH - 1) / 2, LENGTH - 1], [1, 0.6, 1]),
                },
              ]}
            >
              <Mask
                mask={
                  <Group>
                    <LinearGradient
                      start={vec(0, 0)}
                      end={vec(0, cardCanvasHeight)}
                      positions={[0, 0.1, 0.9, 1]}
                      colors={["transparent", "black", "black", "transparent"]}
                    />
                    <Shadow dx={10} dy={0} blur={20} color="black" />
                    <Rect x={0} y={0} width={width} height={cardCanvasHeight} />
                  </Group>
                }
              >
                <Rect x={0} y={0} width={width} height={cardCanvasHeight} />
              </Mask>
            </Group>
          ))}
        </Group>
      </Canvas>
    </Animated.View>
  );
}
