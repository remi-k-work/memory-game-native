// react native
import { Text } from "react-native";

// other libraries
import { useHighScoreStore } from "@/stores/highScoreProvider";

// components
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Entry from "./Entry";

// types
import type { Difficulty } from "@/types/shared";

interface HighScoreTableProps {
  difficulty: Difficulty;
}

export default function HighScoreTable({ difficulty }: HighScoreTableProps) {
  // Get the state and actions we need from the high score store
  const highScores = useHighScoreStore((state) => state[difficulty]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/5">
            <Text className="text-center font-bold">#</Text>
          </TableHead>
          <TableHead className="w-1/5">
            <Text className="text-center font-bold">Name</Text>
          </TableHead>
          <TableHead className="w-1/5">
            <Text className="text-center font-bold">Turns</Text>
          </TableHead>
          <TableHead className="w-2/5">
            <Text className="text-center font-bold">Collection</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {highScores.map((highScore, index) => (
          <Entry key={difficulty + index} index={index} highScore={highScore} />
        ))}
      </TableBody>
    </Table>
  );
}
