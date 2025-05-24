// react native
import { Text } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

export default function Difficulty() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  return (
    <>
      {difficulty === "easy" && <Text className="rounded-xl bg-green-500 px-4 py-2 text-xl text-foreground">EASY</Text>}
      {difficulty === "medium" && <Text className="rounded-xl bg-yellow-500 px-4 py-2 text-xl text-foreground">MEDIUM</Text>}
      {difficulty === "hard" && <Text className="rounded-xl bg-red-500 px-4 py-2 text-xl text-foreground">HARD</Text>}
    </>
  );
}
