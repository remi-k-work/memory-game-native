// react
import { useState } from "react";

// react native
import { Text } from "react-native";

// other libraries
import { cn } from "@/lib/utils";

// components
import BodyScrollView from "@/components/BodyScrollView";
import HighScoreTable from "@/components/high-score-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// types
import type { Difficulty } from "@/types/shared";

export default function Screen() {
  const [difficultyTab, setDifficultyTab] = useState<Difficulty>("easy");

  return (
    <BodyScrollView>
      <Card className="w-full">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Hall of Fame</CardTitle>
          <CardDescription className="text-xl">High Scores</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
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
              <HighScoreTable difficulty="easy" />
            </TabsContent>
            <TabsContent value="medium" className="mx-1 rounded-lg bg-yellow-700">
              <HighScoreTable difficulty="medium" />
            </TabsContent>
            <TabsContent value="hard" className="mx-1 rounded-lg bg-red-700">
              <HighScoreTable difficulty="hard" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </BodyScrollView>
  );
}
