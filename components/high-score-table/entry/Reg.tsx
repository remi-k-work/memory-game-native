// react native
import { Text } from "react-native";

// other libraries
import { cn } from "@/lib/utils";

// components
import { AnimatedTableRow, TableCell } from "@/components/ui/custom/table";

// types
import type { HighScore } from "@/types/shared";
import type { ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

interface RegEntryProps {
  index: number;
  highScore: HighScore;
  isHighlighted?: boolean;
  animStyle?: AnimatedStyle<ViewStyle>;
}

export default function RegEntry({ index, highScore: { name, turns, collection }, isHighlighted = false, animStyle }: RegEntryProps) {
  return (
    // Show the regular high score entry as highlighted or not
    <AnimatedTableRow className={cn("items-center", isHighlighted && "bg-primary")} style={animStyle}>
      <TableCell className="w-1/5">
        <Text className={cn("text-center text-foreground", isHighlighted && "text-primary-foreground")}>{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className={cn("text-center text-foreground", isHighlighted && "text-primary-foreground")}>{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Text className={cn("text-center text-foreground", isHighlighted && "text-primary-foreground")}>{collection}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className={cn("text-center text-foreground", isHighlighted && "text-primary-foreground")}>{turns}</Text>
      </TableCell>
    </AnimatedTableRow>
  );
}
