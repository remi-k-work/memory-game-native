// react native
import { ActivityIndicator, View } from "react-native";

// other libraries
import useFetchRandomCards from "@/hooks/useFetchRandomCards";
import useOrientation from "@/hooks/useOrientation";
import { useGameStore } from "@/stores/gameProvider";

// components
import CardGrid from "@/components/CardGrid";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Fetch a random card set for the specified collection category
  const { isLoading } = useFetchRandomCards();

  // If the cards are still being fetched, show a loading indicator
  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );

  switch (difficulty) {
    case "easy":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={3} rows={4} /> : <CardGrid cols={4} rows={3} />}</View>;
    case "medium":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={4} rows={5} /> : <CardGrid cols={5} rows={4} />}</View>;
    case "hard":
      return <View className="flex-1">{isPortrait ? <CardGrid cols={5} rows={6} /> : <CardGrid cols={6} rows={5} />}</View>;
  }
}
