// react native
import { Text } from "react-native";

// other libraries
import { useHighScoreTableContext } from "@/components/high-score-table/Context";

// components
import Collection from "@/components/preview/Collection";
import Turns from "@/components/preview/Turns";
import { AnimatedTableRow, TableCell } from "@/components/ui/custom/table";

// types
import type { CSSAnimationKeyframes } from "react-native-reanimated";

interface MorphedEntryProps {
  index: number;
}

// constants
const morphIn: CSSAnimationKeyframes = {
  from: { opacity: 0, transform: [{ translateY: "100%" }] },
  "50%": { opacity: 1, transform: [{ translateY: 0 }] },
  "75%": { opacity: 1 },
  to: { opacity: 0 },
};

export default function MorphedEntry({ index }: MorphedEntryProps) {
  const { currName } = useHighScoreTableContext("new-high-score");

  return (
    <AnimatedTableRow
      className="absolute items-center bg-primary"
      style={{ animationName: morphIn, animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
    >
      <TableCell className="w-1/5">
        <Text className="text-center text-5xl text-primary-foreground">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-3xl text-primary-foreground">{currName}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Collection isHighlighted />
      </TableCell>
      <TableCell className="w-1/5">
        <Turns isHighlighted />
      </TableCell>
    </AnimatedTableRow>
  );
}
