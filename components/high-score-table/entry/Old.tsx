// react native
import { Text } from "react-native";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";

// types
import type { HighScore } from "@/types/shared";

interface OldEntryProps {
  index: number;
  highScore: HighScore;
}

export default function OldEntry({ index, highScore: { name, turns, collection } }: OldEntryProps) {
  return (
    // Show the old high score entry, which is being replaced, crossed out
    <TableRow className="items-center bg-background">
      <TableCell className="w-1/5">
        <Text className="text-center text-foreground line-through">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-foreground line-through">{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Text className="text-center text-foreground line-through">{collection}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-foreground line-through">{turns}</Text>
      </TableCell>
    </TableRow>
  );
}
