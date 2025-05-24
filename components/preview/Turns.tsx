// react native
import { Text } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

export default function Turns() {
  // Get the state and actions we need from the game store
  const turns = useGameStore((state) => state.turns);

  return <Text className="rounded-xl bg-foreground px-4 py-2 text-4xl text-background">{turns}</Text>;
}
