// react
import { useState } from "react";

// react native
import { Text } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

// types
import type { HighScore } from "@/types/shared";

interface EntryProps {
  index: number;
  highScore: HighScore;
  isNewHighScore?: boolean;
  isHighlighted?: boolean;
  onNameChanged?: (name: string) => void;
}

export default function Entry({ index, highScore: { name, turns, collection }, isNewHighScore = false, isHighlighted = false, onNameChanged }: EntryProps) {
  // Get the state and actions we need from the game store
  const currCollection = useGameStore((state) => state.collection);
  const currTurns = useGameStore((state) => state.turns);

  // The current player's name that they have entered
  const [currName, setCurrName] = useState("");

  return isNewHighScore ? (
    <TableRow className="items-center bg-primary">
      <TableCell className="w-1/5">
        <Text className="text-center text-primary-foreground">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Input
          autoCapitalize="characters"
          maxLength={3}
          autoFocus
          placeholder="AAA"
          value={currName}
          onChangeText={(value) => {
            setCurrName(value);
            onNameChanged?.(value);
          }}
        />
      </TableCell>
      <TableCell className="w-2/5">
        <Text className="text-center text-primary-foreground">{currCollection}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-primary-foreground">{currTurns}</Text>
      </TableCell>
    </TableRow>
  ) : isHighlighted ? (
    <TableRow className="items-center bg-primary">
      <TableCell className="w-1/5">
        <Text className="text-center text-primary-foreground">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-primary-foreground">{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Text className="text-center text-primary-foreground">{collection}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-primary-foreground">{turns}</Text>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow className="items-center">
      <TableCell className="w-1/5">
        <Text className="text-center text-foreground">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-foreground">{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Text className="text-center text-foreground">{collection}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-foreground">{turns}</Text>
      </TableCell>
    </TableRow>
  );
}
