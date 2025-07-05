// other libraries
import useAnimSingleCard from "@/features/animations/hooks/useAnimSingleCard";
import colors from "tailwindcss/colors";

export default function IsLoading() {
  // Use the already encapsulated animation logic for this component
  const { LOAD_ENTERING, LOAD_EXITING, AnimatedLinearGradient } = useAnimSingleCard();

  return (
    <AnimatedLinearGradient
      colors={[colors.stone[950], colors.rose[900]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      entering={LOAD_ENTERING}
      exiting={LOAD_EXITING}
      className="flex-1"
    />
  );
}
