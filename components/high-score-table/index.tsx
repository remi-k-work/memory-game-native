// react native
import { Text } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore } from "@/stores/highScoreProvider";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";

// components
import { AnimatedTable, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import HighScoreTableProvider from "./Context";
import Entry from "./entry";

// types
import type { HighScoreTableProviderPropsWithoutChildren } from "./Context";
type HighScoreTableProps = HighScoreTableProviderPropsWithoutChildren & { className?: string };

// constants
const HIGH_SCORE_ENTERING = FadeInRight.springify().damping(80).mass(2).stiffness(50);
const HIGH_SCORE_EXITING = FadeOutLeft.springify().damping(80).mass(2).stiffness(50);

export default function HighScoreTable({ difficultyToView, className, ...props }: HighScoreTableProps) {
  // Get the state and actions we need from the game store
  const currTurns = useGameStore((state) => state.turns);

  // Get the state and actions we need from the high score store
  const highScores = useHighScoreStore((state) => state[difficultyToView]);
  const getNewHighScoreIndex = useHighScoreStore((state) => state.getNewHighScoreIndex);

  // If the new high score is being inserted, we will only show a 3-high-score window (previous, new, next)
  if (props.kind === "new-high-score") {
    const newHighScoreIndex = getNewHighScoreIndex(difficultyToView, currTurns);

    const prevHighScoreIndex = newHighScoreIndex === 0 ? 0 : newHighScoreIndex === 9 ? 7 : newHighScoreIndex - 1;
    const nextHighScoreIndex = newHighScoreIndex === 0 ? 3 : newHighScoreIndex === 9 ? 10 : newHighScoreIndex + 2;

    return (
      <HighScoreTableProvider kind="new-high-score" difficultyToView={difficultyToView}>
        <AnimatedTable entering={HIGH_SCORE_ENTERING} exiting={HIGH_SCORE_EXITING} className={className}>
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
            {highScores.slice(prevHighScoreIndex, nextHighScoreIndex).map((highScore, index) => {
              // Determine the actual index in the original high scores array before slicing occurred
              const origHighScoreIndex = prevHighScoreIndex + index;
              return <Entry key={difficultyToView + origHighScoreIndex} index={origHighScoreIndex} highScore={highScore} />;
            })}
          </TableBody>
        </AnimatedTable>
      </HighScoreTableProvider>
    );
  }

  // Otherwise, display the whole high score table for the specified difficulty
  const { targetEntryRefs, entryBgColorReg, entryBgColorAlt, entryAnimStyles } = props;

  return (
    <HighScoreTableProvider
      kind="all-high-score"
      targetEntryRefs={targetEntryRefs}
      difficultyToView={difficultyToView}
      entryBgColorReg={entryBgColorReg}
      entryBgColorAlt={entryBgColorAlt}
      entryAnimStyles={entryAnimStyles}
    >
      <AnimatedTable entering={HIGH_SCORE_ENTERING} exiting={HIGH_SCORE_EXITING} className={className}>
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
          {highScores.map((highScore, index) => (
            <Entry key={difficultyToView + index} index={index} highScore={highScore} />
          ))}
        </TableBody>
      </AnimatedTable>
    </HighScoreTableProvider>
  );
}
