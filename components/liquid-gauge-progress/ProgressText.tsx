// other libraries
import { useAnimProgressText } from "@/features/animations/hooks/useAnimLiquidGaugeProgress";
import { Text, useFont } from "@shopify/react-native-skia";

// types
import type { AnimatedProp, Color } from "@shopify/react-native-skia";

interface ProgressTextProps {
  outerRadius: number;
  progress: number;
  color: AnimatedProp<Color | undefined>;
}

export default function ProgressText({ outerRadius, progress, color }: ProgressTextProps) {
  // Determine the appropriate font size and load the typeface itself
  const fontSize = outerRadius / 2;
  const font = useFont(require("@/assets/fonts/Roboto-Regular.ttf"), fontSize);

  // Use the already encapsulated animation logic for this component
  const { progressText, animatedX } = useAnimProgressText(progress, outerRadius, font);

  // Do not render anything if the font has not loaded yet
  if (!font) return null;

  // Finally, center the progress text on the gauge and use the provided color
  return <Text x={animatedX} y={outerRadius + fontSize / 4} text={progressText} font={font} color={color} />;
}
