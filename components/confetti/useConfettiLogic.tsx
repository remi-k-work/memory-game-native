// other libraries
import { Group, RoundedRect, rect, useTexture } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

// types
import type { LayoutRectangle } from "react-native";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  colorIndex: number;
  seed: number;
}

// constants
const COLORS = ["#deb7ff", "#c785ec", "#a86add", "#8549a7", "#634087"];
const NUM_OF_CONFETTI = 150;
const CONFETTI_WIDTH = 10;
const CONFETTI_HEIGHT = 30;

export default function useConfettiLogic(canvasDimensions: LayoutRectangle) {
  // A shared value to hold the initial state of all confetti pieces
  const confettiData = useDerivedValue(() => {
    // Generate the initial random positions and seeds for each confetti piece
    const confettiPieces: ConfettiPiece[] = [];
    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      confettiPieces.push({
        id: i,
        x: Math.random() * canvasDimensions.width,

        // Start above the screen
        y: -Math.random() * (canvasDimensions.height * 1.2),
        colorIndex: i % COLORS.length,

        // Random seed for rotation speed
        seed: Math.random() * 4 + 1,
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
    return Array.from({ length: NUM_OF_CONFETTI }).map((_, index) => colorRects[confettiData.value[index].colorIndex]);
  });

  return { confettiData, texture, sprites };
}
