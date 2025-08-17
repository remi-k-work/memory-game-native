// react native
import { Text } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

export default function Difficulty() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  return (
    <>
      {difficulty === "easy" && <Text className="rounded-xl bg-green-700 px-4 py-2 text-xl text-foreground sm:text-2xl md:text-3xl lg:text-4xl">EASY</Text>}
      {difficulty === "medium" && (
        <Text className="rounded-xl bg-yellow-700 px-4 py-2 text-xl text-foreground sm:text-2xl md:text-3xl lg:text-4xl">MEDIUM</Text>
      )}
      {difficulty === "hard" && <Text className="rounded-xl bg-red-700 px-4 py-2 text-xl text-foreground sm:text-2xl md:text-3xl lg:text-4xl">HARD</Text>}
    </>
  );
}
