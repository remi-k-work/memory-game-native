// react
import { useState } from "react";

// react native
import { Text } from "react-native";

// other libraries
import { cn } from "@/lib/utils";

// components
import BodyScrollView from "@/components/BodyScrollView";
import HighScoreTable from "@/components/high-score-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// types
import type { Difficulty } from "@/types/shared";

export default function Screen() {
  const [value, setValue] = useState<Difficulty>("easy");

  return (
    <BodyScrollView>
      <Card className="w-full">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Hall of Fame</CardTitle>
          <CardDescription className="text-xl">High Scores</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={value} onValueChange={(value) => setValue(value as Difficulty)}>
            <TabsList className="native:h-16 native:px-0 flex-row rounded-none bg-card p-0">
              <TabsTrigger value="easy" className={cn("h-16 rounded-t-xl bg-green-500", value === "easy" && "h-20")}>
                <Text className="bg-green-500 px-4 py-2 text-center text-xl text-foreground">EASY</Text>
              </TabsTrigger>
              <TabsTrigger value="medium" className={cn("h-16 rounded-t-xl bg-yellow-500", value === "medium" && "h-20")}>
                <Text className="bg-yellow-500 px-4 py-2 text-center text-xl text-foreground">MEDIUM</Text>
              </TabsTrigger>
              <TabsTrigger value="hard" className={cn("h-16 rounded-t-xl bg-red-500", value === "hard" && "h-20")}>
                <Text className="bg-red-500 px-4 py-2 text-center text-xl text-foreground">HARD</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="easy" className="mx-1 rounded-lg bg-green-500">
              <HighScoreTable difficulty="easy" />
            </TabsContent>
            <TabsContent value="medium" className="mx-1 rounded-lg bg-yellow-500">
              <HighScoreTable difficulty="medium" />
            </TabsContent>
            <TabsContent value="hard" className="mx-1 rounded-lg bg-red-500">
              <HighScoreTable difficulty="hard" />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center pt-6">
          <Text className="text-foreground">You did not beat the high score, try again!</Text>
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
