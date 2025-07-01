// react native
import { Pressable } from "react-native";

// other libraries
import Animated from "react-native-reanimated";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
import type { TabTriggerSlotProps } from "expo-router/ui";
import type { ViewStyle } from "react-native";
import type { AnimatedProps, AnimatedStyle } from "react-native-reanimated";
import type { PathProps } from "react-native-svg";

interface TabButtonProps extends TabTriggerSlotProps {
  iconName: "PuzzlePiece" | "Trophy" | "WrenchScrewDriver";
  animStyle: AnimatedStyle<ViewStyle>;
  animProps: AnimatedProps<PathProps>;
}

export default function TabButton({ iconName, animStyle, animProps, ...props }: TabButtonProps) {
  return (
    <Pressable {...props}>
      <Animated.View className="items-center p-2" style={animStyle}>
        {iconName === "PuzzlePiece" && <PuzzlePiece className="size-14 stroke-muted-foreground stroke-1" animatedPathProps={animProps} />}
        {iconName === "Trophy" && <Trophy className="size-14 stroke-muted-foreground stroke-1" animatedPathProps={animProps} />}
        {iconName === "WrenchScrewDriver" && <WrenchScrewDriver className="size-14 stroke-muted-foreground stroke-1" animatedPathProps={animProps} />}
      </Animated.View>
    </Pressable>
  );
}
