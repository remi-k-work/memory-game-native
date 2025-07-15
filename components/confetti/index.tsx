// other libraries
import { Atlas, Canvas } from "@shopify/react-native-skia";
import { useSharedValue } from "react-native-reanimated";
import useAnimConfetti from "./hooks/useAnimConfetti";
import useConfettiLogic from "./hooks/useConfettiLogic";

// types
import type { SkSize } from "@shopify/react-native-skia";

export default function Confetti() {
  // This shared value is used to store the current canvas size, which may change depending on the screen orientation
  const currentCanvasSize = useSharedValue<SkSize>({ width: 0, height: 0 });

  // Use the already encapsulated confetti logic
  const { confettiPieces, texture, sprites } = useConfettiLogic(currentCanvasSize);

  // Use the already encapsulated animation logic for this component
  const { transforms } = useAnimConfetti(currentCanvasSize, confettiPieces);

  // Texture is still loading
  if (!texture) return null;

  return (
    <Canvas style={{ flex: 1 }} onSize={currentCanvasSize}>
      <Atlas image={texture} sprites={sprites} transforms={transforms} />
    </Canvas>
  );
}
