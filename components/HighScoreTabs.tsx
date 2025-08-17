// react
import { useState } from "react";

// react native
import { Text, View } from "react-native";

// expo
import { useLocalSearchParams } from "expo-router";

// other libraries
import useAnimHighScoreTabs from "@/features/animations/hooks/useAnimHighScoreTabs";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { useGameStore } from "@/stores/gameProvider";

// components
import HighScoreTable from "@/components/high-score-table";
import { AnimatedTabsTrigger, Tabs, TabsContent, TabsList } from "@/components/ui/custom/tabs";

// types
import type { Difficulty } from "@/types/shared";
import type { RefObject } from "react";

interface HighScoreTabsProps {
  targetEntryRefs: RefObject<(View | null)[]>;
}

// constants
import COLORS from "tailwindcss/colors";

export default function HighScoreTabs({ targetEntryRefs }: HighScoreTabsProps) {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Get access to the local search parameters
  const { forDifficulty } = useLocalSearchParams<{ highScoreIndexToHighlight?: string; forDifficulty?: string }>();

  // The currently active high score tab for which high scores are being displayed
  const [highScoreTab, setHighScoreTab] = useState<Difficulty>(difficulty);

  // When the difficulty changes, update the active high score tab (keep them in sync)
  useDidUpdateEffect(() => {
    setHighScoreTab(difficulty);
    if (forDifficulty) setHighScoreTab(forDifficulty as Difficulty);
  }, [difficulty, forDifficulty]);

  // Use the already encapsulated animation logic for this component
  const { animStyleEasyTab, animStyleMediumTab, animStyleHardTab, animStyleEasyEntries, animStyleMediumEntries, animStyleHardEntries } =
    useAnimHighScoreTabs(highScoreTab);

  return (
    <Tabs value={highScoreTab} onValueChange={(value) => setHighScoreTab(value as Difficulty)}>
      <TabsList>
        <AnimatedTabsTrigger value="easy" className="min-w-32 bg-green-700" style={animStyleEasyTab}>
          <Text className="bg-green-700 px-4 py-2 text-2xl text-foreground">EASY</Text>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger value="medium" className="min-w-32 bg-yellow-700" style={animStyleMediumTab}>
          <Text className="bg-yellow-700 px-4 py-2 text-2xl text-foreground">MEDIUM</Text>
        </AnimatedTabsTrigger>
        <AnimatedTabsTrigger value="hard" className="min-w-32 bg-red-700" style={animStyleHardTab}>
          <Text className="bg-red-700 px-4 py-2 text-2xl text-foreground">HARD</Text>
        </AnimatedTabsTrigger>
      </TabsList>
      <TabsContent value="easy">
        <HighScoreTable
          kind="all-high-score"
          targetEntryRefs={targetEntryRefs}
          difficultyToView="easy"
          entryBgColorReg={COLORS.green[700]}
          entryBgColorAlt={COLORS.green[800]}
          entryAnimStyles={animStyleEasyEntries!}
          className="bg-green-700"
        />
      </TabsContent>
      <TabsContent value="medium">
        <HighScoreTable
          kind="all-high-score"
          targetEntryRefs={targetEntryRefs}
          difficultyToView="medium"
          entryBgColorReg={COLORS.yellow[700]}
          entryBgColorAlt={COLORS.yellow[800]}
          entryAnimStyles={animStyleMediumEntries!}
          className="bg-yellow-700"
        />
      </TabsContent>
      <TabsContent value="hard">
        <HighScoreTable
          kind="all-high-score"
          targetEntryRefs={targetEntryRefs}
          difficultyToView="hard"
          entryBgColorReg={COLORS.red[700]}
          entryBgColorAlt={COLORS.red[800]}
          entryAnimStyles={animStyleHardEntries!}
          className="bg-red-700"
        />
      </TabsContent>
    </Tabs>
  );
}
