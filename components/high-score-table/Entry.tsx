// react native
import { Text } from "react-native";

// components
import { TableCell, TableRow } from "@/components/ui/table";

// types
import type { HighScore } from "@/types/shared";

interface EntryProps {
  index: number;
  highScore: HighScore;
}

export default function Entry({ index, highScore: { name, turns, collection } }: EntryProps) {
  return (
    <TableRow>
      <TableCell className="w-1/5">
        <Text className="text-center">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center">{name}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center">{turns}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Text className="text-center">{collection}</Text>
      </TableCell>
    </TableRow>
  );
}
