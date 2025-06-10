// react
import { useState } from "react";

// react native
import { Text } from "react-native";

// expo
import { useLocalSearchParams } from "expo-router";

// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import FlippingLetter from "@/components/FlippingLetter";
import HighScoreTable from "@/components/high-score-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// types
import type { Difficulty } from "@/types/shared";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);

  // Get access to the search parameters
  const { highScoreIndexToHighlight, forDifficulty } = useLocalSearchParams<{ highScoreIndexToHighlight?: string; forDifficulty?: string }>();

  // The currently active difficulty tab for which high scores are being displayed
  const [difficultyTab, setDifficultyTab] = useState<Difficulty>(difficulty);

  // When the difficulty changes, update the active difficulty tab (keep them in sync)
  useDidUpdateEffect(() => setDifficultyTab(difficulty), [difficulty]);
  useDidUpdateEffect(() => {
    if (forDifficulty) setDifficultyTab(forDifficulty as Difficulty);
  }, [forDifficulty]);

  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <FlippingLetter letter="Trophy" />
            <FlippingLetter letter="H" />
            <FlippingLetter letter="a" />
            <FlippingLetter letter="l" />
            <FlippingLetter letter="l" />
            <FlippingLetter letter=" " />
            <FlippingLetter letter="o" />
            <FlippingLetter letter="f" />
            <FlippingLetter letter=" " />
            <FlippingLetter letter="F" />
            <FlippingLetter letter="a" />
            <FlippingLetter letter="m" />
            <FlippingLetter letter="e" />
          </CardTitle>
          <CardDescription>High Scores</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={difficultyTab} onValueChange={(value) => setDifficultyTab(value as Difficulty)}>
            <TabsList className="native:h-16 native:px-0 flex-row rounded-none bg-card p-0">
              <TabsTrigger value="easy" className={cn("h-16 rounded-t-xl bg-green-700", difficultyTab === "easy" && "h-20")}>
                <Text className="bg-green-700 px-4 py-2 text-center text-xl text-foreground">EASY</Text>
              </TabsTrigger>
              <TabsTrigger value="medium" className={cn("h-16 rounded-t-xl bg-yellow-700", difficultyTab === "medium" && "h-20")}>
                <Text className="bg-yellow-700 px-4 py-2 text-center text-xl text-foreground">MEDIUM</Text>
              </TabsTrigger>
              <TabsTrigger value="hard" className={cn("h-16 rounded-t-xl bg-red-700", difficultyTab === "hard" && "h-20")}>
                <Text className="bg-red-700 px-4 py-2 text-center text-xl text-foreground">HARD</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="easy" className="mx-1 rounded-lg bg-green-700">
              <HighScoreTable difficulty="easy" highScoreIndexToHighlight={forDifficulty === "easy" ? Number(highScoreIndexToHighlight ?? "-1") : -1} />
            </TabsContent>
            <TabsContent value="medium" className="mx-1 rounded-lg bg-yellow-700">
              <HighScoreTable difficulty="medium" highScoreIndexToHighlight={forDifficulty === "medium" ? Number(highScoreIndexToHighlight ?? "-1") : -1} />
            </TabsContent>
            <TabsContent value="hard" className="mx-1 rounded-lg bg-red-700">
              <HighScoreTable difficulty="hard" highScoreIndexToHighlight={forDifficulty === "hard" ? Number(highScoreIndexToHighlight ?? "-1") : -1} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </BodyScrollView>
  );
}
