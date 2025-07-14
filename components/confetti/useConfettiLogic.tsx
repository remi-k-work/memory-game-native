// other libraries
import { Group, RoundedRect, rect, useTexture } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

// types
import type { LayoutRectangle } from "react-native";
import type { ConfettiPiece } from "./types";

// constants
const COLORS = ["#deb7ff", "#c785ec", "#a86add", "#8549a7", "#634087"];
const NUM_OF_CONFETTI = 150;
const CONFETTI_WIDTH = 10;
const CONFETTI_HEIGHT = 30;
const RANDOM_INITIAL_Y_JIGGLE = 20;
const Y_AXIS_SPREAD = 0.8;

function getRandomBoolean() {
  "worklet";

  return Math.random() >= 0.5;
}

function getRandomValue(min: number, max: number) {
  "worklet";

  if (min === max) return min;
  return Math.random() * (max - min) + min;
}

function randomXArray(num: number, min: number, max: number) {
  "worklet";

  return new Array(num).fill(0).map(() => getRandomValue(min, max));
}

export default function useConfettiLogic(canvasDimensions: LayoutRectangle) {
  // A shared value to hold the initial state of all confetti pieces
  const confettiPieces = useDerivedValue(() => {
    // Generate the initial random positions and seeds for each confetti piece
    const confettiPieces: ConfettiPiece[] = [];
    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      confettiPieces.push({
        currPositionX: Math.random() * canvasDimensions.width,

        // The confetti will start spawning from this distance above the top of the screen
        currPositionY: -Math.random() * canvasDimensions.height * Y_AXIS_SPREAD,

        colorIndex: i % COLORS.length,
        clockwise: getRandomBoolean(),
        maxRotationX: getRandomValue(2 * Math.PI, 20 * Math.PI),
        maxRotationZ: getRandomValue(2 * Math.PI, 20 * Math.PI),
        randomXs: randomXArray(5, -80, 80),
        initialRandomY: getRandomValue(-RANDOM_INITIAL_Y_JIGGLE, RANDOM_INITIAL_Y_JIGGLE),
        initialRotation: getRandomValue(0.1 * Math.PI, Math.PI),
        randomSpeed: getRandomValue(0.9, 1.3),
        randomOffsetX: getRandomValue(-10, 10),
        randomOffsetY: getRandomValue(-10, 10),
      });
    }

    return confettiPieces;
  });

  // Create the texture atlas (the "sticker sheet") where we draw all our confetti color variations once into a single texture
  const texture = useTexture(
    <Group>
      {COLORS.map((color, index) => (
        <RoundedRect key={index} x={index * CONFETTI_WIDTH} y={0} width={CONFETTI_WIDTH} height={CONFETTI_HEIGHT} r={8} color={color} />
      ))}
    </Group>,

    // Calculate the needed texture size = number of colors * width of a single confetti
    { width: COLORS.length * CONFETTI_WIDTH, height: CONFETTI_HEIGHT },
  );

  const sprites = useDerivedValue(() => {
    // These are rectangles that tell the atlas which part of the texture to use for each color
    const colorRects = COLORS.map((_, index) => rect(index * CONFETTI_WIDTH, 0, CONFETTI_WIDTH, CONFETTI_HEIGHT));

    // We map the sprite for each confetti piece based on its color index
    return Array.from({ length: NUM_OF_CONFETTI }).map((_, index) => colorRects[confettiPieces.value[index].colorIndex]);
  });

  return { confettiPieces, texture, sprites };
}
