// react
import { useState } from "react";

// react native
import { Text } from "react-native";

// expo
import { useLocalSearchParams } from "expo-router";

// other libraries
import useAnimHighScores from "@/hooks/anims/useAnimHighScores";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { useGameStore } from "@/stores/gameProvider";
import Animated from "react-native-reanimated";

// components
import BodyScrollView from "@/components/BodyScrollView";
import FlippingTitle from "@/components/FlippingTitle";
import HighScoreTable from "@/components/high-score-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { AnimatedTabsTrigger, Tabs, TabsContent, TabsList } from "@/components/ui/custom/tabs";

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

  // Use the already encapsulated animation logic for this component
  const { easyTabTriggerAnimatedStyle, mediumTabTriggerAnimatedStyle, hardTabTriggerAnimatedStyle, TAB_CONTENT_ENTERING, TAB_CONTENT_EXITING } =
    useAnimHighScores(difficultyTab);

  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <FlippingTitle icon="Trophy" text="Hall of Fame" />
          </CardTitle>
          <CardDescription>High Scores</CardDescription>
        </CardHeader>
        <CardContent className="bg-transparent">
          <Tabs value={difficultyTab} onValueChange={(value) => setDifficultyTab(value as Difficulty)}>
            <TabsList>
              <AnimatedTabsTrigger value="easy" className="min-w-32 bg-green-700" style={easyTabTriggerAnimatedStyle}>
                <Text className="bg-green-700 px-4 py-2 text-xl text-foreground">EASY</Text>
              </AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="medium" className="min-w-32 bg-yellow-700" style={mediumTabTriggerAnimatedStyle}>
                <Text className="bg-yellow-700 px-4 py-2 text-xl text-foreground">MEDIUM</Text>
              </AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="hard" className="min-w-32 bg-red-700" style={hardTabTriggerAnimatedStyle}>
                <Text className="bg-red-700 px-4 py-2 text-xl text-foreground">HARD</Text>
              </AnimatedTabsTrigger>
            </TabsList>
            <TabsContent value="easy">
              <Animated.View entering={TAB_CONTENT_ENTERING} exiting={TAB_CONTENT_EXITING} className="flex-1 bg-green-700">
                <HighScoreTable difficulty="easy" highScoreIndexToHighlight={forDifficulty === "easy" ? Number(highScoreIndexToHighlight ?? "-1") : -1} />
              </Animated.View>
            </TabsContent>
            <TabsContent value="medium">
              <Animated.View entering={TAB_CONTENT_ENTERING} exiting={TAB_CONTENT_EXITING} className="flex-1 bg-yellow-700">
                <HighScoreTable difficulty="medium" highScoreIndexToHighlight={forDifficulty === "medium" ? Number(highScoreIndexToHighlight ?? "-1") : -1} />
              </Animated.View>
            </TabsContent>
            <TabsContent value="hard">
              <Animated.View entering={TAB_CONTENT_ENTERING} exiting={TAB_CONTENT_EXITING} className="flex-1 bg-red-700">
                <HighScoreTable difficulty="hard" highScoreIndexToHighlight={forDifficulty === "hard" ? Number(highScoreIndexToHighlight ?? "-1") : -1} />
              </Animated.View>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </BodyScrollView>
  );
}
