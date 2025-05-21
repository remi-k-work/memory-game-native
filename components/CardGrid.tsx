// react
import { useEffect } from "react";

// react native
import { View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import SingleCard from "@/components/SingleCard";

// types
interface CardGridProps {
  cols: number;
  rows: number;
}

export default function CardGrid({ cols, rows }: CardGridProps) {
  // Get the state and actions we need from the game store
  const currentCards = useGameStore((state) => state.currentCards);
  const choiceOne = useGameStore((state) => state.choiceOne);
  const choiceTwo = useGameStore((state) => state.choiceTwo);
  const chosenaPair = useGameStore((state) => state.chosenaPair);

  useEffect(() => {
    // Do we have a pair already selected?
    const hasPairSelected = !!choiceOne && !!choiceTwo;

    // Yes, the player has chosen a pair
    let timeoutId: number | undefined;
    if (hasPairSelected) timeoutId = setTimeout(() => chosenaPair(), 1500);

    return () => clearTimeout(timeoutId);
  }, [choiceOne, choiceTwo]);

  return (
    <View className="flex-1 gap-1">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View key={rowIndex} className="flex-1 flex-row gap-1">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <SingleCard key={currentCards[rowIndex * cols + colIndex].uniqueId} card={currentCards[rowIndex * cols + colIndex]} />
          ))}
        </View>
      ))}
    </View>
  );
}
