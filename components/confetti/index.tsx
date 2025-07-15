// other libraries
import { Atlas, Canvas } from "@shopify/react-native-skia";
import useAnimConfetti from "./hooks/useAnimConfetti";
import useConfettiLogic from "./hooks/useConfettiLogic";

export default function Confetti() {
  // Use the already encapsulated confetti logic
  const { confettiPieces, texture, sprites } = useConfettiLogic();

  // Use the already encapsulated animation logic for this component
  const { transforms } = useAnimConfetti(confettiPieces);

  // Texture is still loading
  if (!texture) return null;

  return (
    <Canvas style={{ flex: 1 }}>
      <Atlas image={texture} sprites={sprites} transforms={transforms} />
    </Canvas>
  );
}
