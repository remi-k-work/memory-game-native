// react native
import { Text } from "react-native";

// components
import Collection from "@/components/preview/Collection";
import Turns from "@/components/preview/Turns";
import { TableCell, TableRow } from "@/components/ui/custom/table";
import CrossedOut from "./CrossedOut";

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
        <Text className="text-center text-5xl text-foreground">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-3xl text-foreground">{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Collection collectionCategory={collection} />
      </TableCell>
      <TableCell className="w-1/5">
        <Turns turns={turns} />
      </TableCell>

      <CrossedOut />
    </TableRow>
  );
}
