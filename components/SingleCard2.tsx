// react
import { useState } from "react";

// react native
import { Image, Pressable } from "react-native";

// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";
import { Canvas, Fill, Group, interpolate, LinearGradient, Mask, Rect, Shadow, vec } from "@shopify/react-native-skia";
import colors from "tailwindcss/colors";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

// types
import type { Card } from "@/types/shared";

interface SingleCardProps {
  card: Card;
}

// constants
const LENGTH = 9;
const STRIPES = new Array(LENGTH).fill(0).map((_, i) => i);

export default function SingleCard({ card, card: { uniqueId, imageP, imageL, isFlipped } }: SingleCardProps) {
  // Get the state and actions we need from the game store
  const chosenaCard = useGameStore((state) => state.chosenaCard);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Whether the card image is currently loading
  const [isLoading, setIsLoading] = useState(false);

  // Use the already encapsulated animation logic for this component
  const { direction, AnimatedLinearGradient, LOAD_ENTERING, LOAD_EXITING } = useAnimSingleCard();

  const [cardCanvasWidth, setCardCanvasWidth] = useState(0);
  const [cardCanvasHeight, setCardCanvasHeight] = useState(0);
  const width = cardCanvasWidth / LENGTH;
  const origin = vec(cardCanvasWidth / 2, cardCanvasHeight / 2);

  return (
    <Pressable disabled={isLoading} className="flex-1 overflow-hidden rounded-lg" onPress={() => chosenaCard(card)}>
      <FlipCard kind="needs-to-animate" isFlipped={isFlipped} direction={direction}>
        <FlipCardRegularContent>
          {isLoading ? (
            <AnimatedLinearGradient
              key={uniqueId + "loading"}
              colors={[colors.stone[950], colors.rose[900]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              entering={LOAD_ENTERING}
              exiting={LOAD_EXITING}
              className="flex-1"
            />
          ) : (
            <Canvas
              key={uniqueId + "loaded"}
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
          )}
        </FlipCardRegularContent>
        <FlipCardFlippedContent>
          <Image
            source={isPortrait ? imageP : imageL}
            resizeMode="contain"
            className="h-full w-full bg-muted"
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        </FlipCardFlippedContent>
      </FlipCard>
    </Pressable>
  );
}
