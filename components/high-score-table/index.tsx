// react native
import { Text } from "react-native";

// other libraries
import { useHighScoreStore } from "@/stores/highScoreProvider";

// components
import { AnimatedTable, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./entry";

// types
import type { Difficulty } from "@/types/shared";
import type { ComponentPropsWithoutRef, RefObject } from "react";
import type { ColorValue, View, ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

interface HighScoreTableProps extends ComponentPropsWithoutRef<typeof AnimatedTable> {
  targetEntryRefs?: RefObject<(View | null)[]>;
  difficulty: Difficulty;
  newHighScoreIndex?: number;
  highScoreIndexToHighlight?: number;
  bgColorReg?: ColorValue;
  bgColorAlt?: ColorValue;
  animStyles?: AnimatedStyle<ViewStyle>[];
  className?: string;
}

export default function HighScoreTable({
  targetEntryRefs,
  difficulty,
  newHighScoreIndex = -1,
  highScoreIndexToHighlight = -1,
  bgColorReg,
  bgColorAlt,
  animStyles,
  className,
  ...props
}: HighScoreTableProps) {
  // Get the state and actions we need from the high score store
  const highScores = useHighScoreStore((state) => state[difficulty]);

  // If the new high score is being inserted, we will only show a 3-high-score window (previous, new, next)
  const prevHighScoreIndex = newHighScoreIndex === 0 ? 0 : newHighScoreIndex === 9 ? 7 : newHighScoreIndex - 1;
  const nextHighScoreIndex = newHighScoreIndex === 0 ? 3 : newHighScoreIndex === 9 ? 10 : newHighScoreIndex + 2;

  return (
    <AnimatedTable className={className} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/5">
            <Text className="text-center font-bold text-foreground">#</Text>
          </TableHead>
          <TableHead className="w-1/5">
            <Text className="text-center font-bold text-foreground">Name</Text>
          </TableHead>
          <TableHead className="w-2/5">
            <Text className="text-center font-bold text-foreground">Collection</Text>
          </TableHead>
          <TableHead className="w-1/5">
            <Text className="text-center font-bold text-foreground">Turns</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Is the new high score being inserted? Show only a 3-high-score window (previous, new, next) */}
        {newHighScoreIndex !== -1
          ? highScores.slice(prevHighScoreIndex, nextHighScoreIndex).map((highScore, index) => {
              // Determine the actual index in the original high scores array before slicing occurred
              const origHighScoreIndex = prevHighScoreIndex + index;
              return (
                <Entry
                  key={difficulty + origHighScoreIndex}
                  index={origHighScoreIndex}
                  highScore={highScore}
                  isNewHighScore={origHighScoreIndex === newHighScoreIndex}
                />
              );
            })
          : // Otherwise, display the whole high score table for the specified difficulty
            highScores.map((highScore, index) => (
              <Entry
                key={difficulty + index}
                ref={(ref) => {
                  targetEntryRefs!.current[index] = ref;
                }}
                index={index}
                highScore={highScore}
                bgColorReg={bgColorReg}
                bgColorAlt={bgColorAlt}
                isHighlighted={index === highScoreIndexToHighlight}
                animStyle={animStyles?.[index]}
              />
            ))}
      </TableBody>
    </AnimatedTable>
  );
}
