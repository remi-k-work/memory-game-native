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
import type { ColorValue } from "react-native";
import type { SharedValue } from "react-native-reanimated";

interface TabButtonProps extends TabTriggerSlotProps {
  iconName: "PuzzlePiece" | "Trophy" | "WrenchScrewDriver";
  backgroundColor: SharedValue<string>;
  width: SharedValue<number>;
  borderRadius: SharedValue<string>;
  fill: SharedValue<ColorValue | undefined>;
}

export default function TabButton({ iconName, backgroundColor, width, borderRadius, fill, ...props }: TabButtonProps) {
  return (
    <Pressable {...props}>
      <Animated.View className="items-center p-2" style={{ backgroundColor, width, borderRadius }}>
        {iconName === "PuzzlePiece" && <PuzzlePiece width={48} height={48} fillSharedValue={fill} />}
        {iconName === "Trophy" && <Trophy width={48} height={48} fillSharedValue={fill} />}
        {iconName === "WrenchScrewDriver" && <WrenchScrewDriver width={48} height={48} fillSharedValue={fill} />}
      </Animated.View>
    </Pressable>
  );
}
