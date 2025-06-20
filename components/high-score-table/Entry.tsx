// react
import { useState } from "react";

// react native
import { Keyboard, Text } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import { Input } from "@/components/ui/input";

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
    <>
      {/* Show the old high score entry, which is being replaced, crossed out */}
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

      {/* Show the new high score entry as highlighted and editable */}
      <TableRow className="items-center bg-primary">
        <TableCell className="w-1/5">
          <Text className="text-center text-primary-foreground">{index + 1}</Text>
        </TableCell>
        <TableCell className="w-1/5">
          <Input
            autoCapitalize="characters"
            maxLength={3}
            autoFocus
            placeholder={name}
            value={currName}
            onChangeText={(value) => {
              setCurrName(value);
              onNameChanged?.(value);

              // Dismiss the keyboard once the player has entered their name
              if (value.trim().length === 3) Keyboard.dismiss();
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
    </>
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
