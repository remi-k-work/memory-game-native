// react native
import { Text, View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

export default function TabTurns() {
  // Get the state and actions we need from the game store
  const turns = useGameStore((state) => state.turns);

  return (
    <View className="h-12 w-16 items-center justify-center rounded-xl bg-foreground">
      <Text className="line-clamp-1 text-center text-4xl text-background">{turns}</Text>
    </View>
  );
}
