// react native
import { useWindowDimensions, View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import CardGrid from "@/components/CardGrid";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation
  const { height, width } = useWindowDimensions();
  const isPortrait = height >= width;

  switch (difficulty as "easy" | "medium" | "hard") {
    case "easy":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={3} rows={4} /> : <CardGrid cols={4} rows={3} />}</View>;
    case "medium":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={4} rows={5} /> : <CardGrid cols={5} rows={4} />}</View>;
    case "hard":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={5} rows={6} /> : <CardGrid cols={6} rows={5} />}</View>;
  }
}
