// react native
import { Text } from "react-native";

// other libraries
import { cn } from "@/lib/utils";

// components
import Collection from "@/components/preview/Collection";
import Turns from "@/components/preview/Turns";
import { AnimatedTableRow, TableCell } from "@/components/ui/custom/table";

// types
import type { HighScore } from "@/types/shared";
import type { Ref } from "react";
import type { ColorValue, View, ViewStyle } from "react-native";
import type { AnimatedStyle, CSSAnimationKeyframes } from "react-native-reanimated";

interface RegEntryProps {
  ref: Ref<View | null>;
  index: number;
  highScore: HighScore;
  bgColorReg: ColorValue;
  bgColorAlt: ColorValue;
  isHighlighted?: boolean;
  animStyle?: AnimatedStyle<ViewStyle>;
}

// constants
const wobble: CSSAnimationKeyframes = {
  from: { transform: [{ translateX: 0 }] },
  "15%": { transform: [{ translateX: -25 }, { rotateZ: "-5deg" }] },
  "30%": { transform: [{ translateX: 20 }, { rotateZ: "3deg" }] },
  "45%": { transform: [{ translateX: -15 }, { rotateZ: "-3deg" }] },
  "60%": { transform: [{ translateX: 10 }, { rotateZ: "2deg" }] },
  "75%": { transform: [{ translateX: -5 }, { rotateZ: "-1deg" }] },
  to: { transform: [{ translateX: 0 }] },
};

export default function RegEntry({
  ref,
  index,
  highScore: { name, turns, collection },
  bgColorReg,
  bgColorAlt,
  isHighlighted = false,
  animStyle,
}: RegEntryProps) {
  return (
    // Show the regular high score entry as highlighted or not
    <AnimatedTableRow
      ref={ref}
      className={cn("items-center", isHighlighted && "bg-primary")}
      style={[
        animStyle,
        isHighlighted && { animationName: wobble, animationDuration: "2s", animationIterationCount: "infinite" },
        !isHighlighted && index % 2 === 0 && { backgroundColor: bgColorReg },
        !isHighlighted && index % 2 === 1 && { backgroundColor: bgColorAlt },
      ]}
    >
      <TableCell className="w-1/5">
        <Text className={cn("text-center text-5xl text-foreground", isHighlighted && "text-primary-foreground")}>{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className={cn("text-center text-3xl text-foreground", isHighlighted && "text-primary-foreground")}>{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Collection collectionCategory={collection} isHighlighted={isHighlighted} />
      </TableCell>
      <TableCell className="w-1/5">
        <Turns turns={turns} isHighlighted={isHighlighted} />
      </TableCell>
    </AnimatedTableRow>
  );
}
