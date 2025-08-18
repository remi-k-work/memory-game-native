// react
import { useState } from "react";

// react native
import { Text } from "react-native";

// other libraries
import { useHighScoreTableContext } from "@/components/high-score-table/Context";
import useAnimMorphedEntry from "@/features/animations/hooks/useAnimMorphedEntry";

// components
import Collection from "@/components/preview/Collection";
import Turns from "@/components/preview/Turns";
import { AnimatedTableRow, TableCell } from "@/components/ui/custom/table";

// types
import type { LayoutRectangle } from "react-native";

interface MorphedEntryProps {
  index: number;
}

export default function MorphedEntry({ index }: MorphedEntryProps) {
  // Store the entry size, which is set once the layout is calculated
  const [entrySize, setEntrySize] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  // Use the already encapsulated animation logic for this component
  const { animStyleMorphIn } = useAnimMorphedEntry(entrySize);

  const { currName } = useHighScoreTableContext("new-high-score");

  return (
    <AnimatedTableRow
      className="pointer-events-none absolute z-10 items-center bg-primary"
      style={animStyleMorphIn}
      onLayout={(ev) => setEntrySize(ev.nativeEvent.layout)}
    >
      <TableCell className="w-1/5">
        <Text className="text-center text-5xl text-primary-foreground sm:text-6xl md:text-7xl lg:text-8xl">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-3xl text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">{currName}</Text>
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
