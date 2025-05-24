// react
import { useState } from "react";

// react native
import { ActivityIndicator, View } from "react-native";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import useOrientation from "@/hooks/useOrientation";
import { fetchRandomCards } from "@/stores/cards";
import { useGameStore } from "@/stores/gameProvider";

// components
import CardGrid from "@/components/CardGrid";

// constants
import { INIT_CARDS } from "@/constants/cards";

export default function Screen() {
  // Get the state and actions we need from the game store
  const collection = useGameStore((state) => state.collection);
  const difficulty = useGameStore((state) => state.difficulty);
  const showIllustrations = useGameStore((state) => state.showIllustrations);
  const hasFetchedCards = useGameStore((state) => state.hasFetchedCards);

  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  const [isLoading, setLoading] = useState(false);

  useDidUpdateEffect(() => {
    // Fetch a random card set for the specified collection category
    const controller = new AbortController();

    const fetchCards = async () => {
      try {
        setLoading(true);
        hasFetchedCards(await fetchRandomCards(showIllustrations ? "illustration" : "photo", collection, controller.signal));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Error fetching a random card set:", error);
      } finally {
        setLoading(false);
      }
    };

    // Do not try to fetch the initial fallback card set, which is the default one
    if (collection !== "default") fetchCards();
    else hasFetchedCards(INIT_CARDS);

    return () => controller.abort();
  }, [collection, showIllustrations]);

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
