// other libraries
import { getRandomBoolean, getRandomValue, randomXArray } from "@/components/confetti/helpers";
import useOrientation from "@/hooks/useOrientation";
import { Group, RoundedRect, rect, useTexture } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

// types
import type { ConfettiPiece } from "@/components/confetti/types";

// constants
import { COLORS, CONFETTI_HEIGHT, CONFETTI_WIDTH, NUM_OF_CONFETTI, RANDOM_INITIAL_Y_JIGGLE, Y_AXIS_SPREAD } from "@/components/confetti/constants";

// Encapsulate the confetti logic in a custom hook
export default function useConfettiLogic() {
  // Determine the current screen orientation and size
  const { height, width } = useOrientation();

  // A shared value to hold the initial state of all confetti pieces
  const confettiPieces = useDerivedValue(() => {
    // Generate the initial random positions and seeds for each confetti piece
    const confettiPieces: ConfettiPiece[] = [];

    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      confettiPieces.push({
        currPositionX: getRandomValue(0, width),

        // The confetti will start spawning from this distance above the top of the screen
        currPositionY: getRandomValue(-height * Y_AXIS_SPREAD, 0),

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

  // A shared value to hold locations of sprites in atlas texture for each confetti
  const sprites = useDerivedValue(() => {
    // These are rectangles that tell the atlas which part of the texture to use for each color
    const colorRects = COLORS.map((_, index) => rect(index * CONFETTI_WIDTH, 0, CONFETTI_WIDTH, CONFETTI_HEIGHT));

    // We map the sprite for each confetti piece based on its color index
    return Array.from({ length: NUM_OF_CONFETTI }).map((_, index) => colorRects[confettiPieces.value[index].colorIndex]);
  });

  return { confettiPieces, texture, sprites };
}
