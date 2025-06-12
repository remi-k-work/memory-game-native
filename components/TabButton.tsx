// react native
import { Pressable } from "react-native";

// expo
import type { TabTriggerSlotProps } from "expo-router/ui";

// other libraries
import useAnimTabButton from "@/hooks/anims/useAnimTabButton";
import Animated from "react-native-reanimated";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
interface TabButtonProps extends TabTriggerSlotProps {
  iconName: "PuzzlePiece" | "Trophy" | "WrenchScrewDriver";
}

export default function TabButton({ isFocused = false, ...props }: TabButtonProps) {
  // Use the already encapsulated animation logic for this component
  const { buttonAnimatedStyle, iconAnimatedProps } = useAnimTabButton(isFocused);

  return (
    <Pressable {...props}>
      <Animated.View className="items-center p-2" style={buttonAnimatedStyle}>
        {props.iconName === "PuzzlePiece" && <PuzzlePiece width={48} height={48} animatedPathProps={iconAnimatedProps} />}
        {props.iconName === "Trophy" && <Trophy width={48} height={48} animatedPathProps={iconAnimatedProps} />}
        {props.iconName === "WrenchScrewDriver" && <WrenchScrewDriver width={48} height={48} animatedPathProps={iconAnimatedProps} />}
      </Animated.View>
    </Pressable>
  );
}
