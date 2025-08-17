// react native
import { Text } from "react-native";

// other libraries
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";

// types
interface TurnsProps {
  turns?: number;
  isHighlighted?: boolean;
}

export default function Turns({ turns, isHighlighted = false }: TurnsProps) {
  // Get the state and actions we need from the game store
  let currentTurns = useGameStore((state) => state.turns);
  if (turns) currentTurns = turns;

  return (
    <Text
      className={cn(
        "rounded-xl bg-foreground px-4 py-2 text-4xl text-background sm:text-5xl md:text-6xl lg:text-7xl",
        (turns !== undefined || isHighlighted) && "mx-auto px-2 py-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
        isHighlighted && "bg-background text-foreground",
      )}
    >
      {currentTurns}
    </Text>
  );
}
