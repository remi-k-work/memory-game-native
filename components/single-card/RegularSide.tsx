// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import Animated from "react-native-reanimated";

// components
import Wallpaper from "./Wallpaper";

// constants
import COLORS from "tailwindcss/colors";

const BACKGROUND_GRADIENT_COLORS = [COLORS.stone[600], COLORS.indigo[600]];
const STRIPES_GRADIENT_COLORS = [COLORS.stone[500], COLORS.purple[400], COLORS.indigo[500]];

export default function RegularSide() {
  // Use the already encapsulated animation logic for this component
  const { LOAD_ENTERING, LOAD_EXITING } = useAnimSingleCard();

  return (
    <Animated.View entering={LOAD_ENTERING} exiting={LOAD_EXITING} className="flex-1">
      <Wallpaper backgroundGradientColors={BACKGROUND_GRADIENT_COLORS} stripesGradientColors={STRIPES_GRADIENT_COLORS} />
    </Animated.View>
  );
}
