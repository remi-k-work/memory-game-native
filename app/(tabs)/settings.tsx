// react native
import { Text, TouchableOpacity, View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import CollectionSlider from "@/components/collection-slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function Screen() {
  // Get the state and actions we need from the game store
  const difficulty = useGameStore((state) => state.difficulty);
  const changedDifficulty = useGameStore((state) => state.changedDifficulty);

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>Change the difficulty and collection</CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-1">
            <Text className="text-muted-foreground">Select Difficulty</Text>
            <RadioGroup
              value={difficulty}
              onValueChange={(value) => changedDifficulty(value as "easy" | "medium" | "hard")}
              className="flex-row items-center justify-center gap-0"
            >
              <TouchableOpacity
                className="pointer-events-box-only flex-row items-center gap-1 rounded-l-xl bg-green-500 p-4"
                onPress={() => changedDifficulty("easy")}
              >
                <RadioGroupItem value="easy" aria-labelledby="label-for-easy" />
                <Label nativeID="label-for-easy" className="native:text-xl">
                  EASY
                </Label>
              </TouchableOpacity>
              <TouchableOpacity className="pointer-events-box-only flex-row items-center gap-1 bg-yellow-500 p-4" onPress={() => changedDifficulty("medium")}>
                <RadioGroupItem value="medium" aria-labelledby="label-for-medium" />
                <Label nativeID="label-for-medium" className="native:text-xl">
                  MEDIUM
                </Label>
              </TouchableOpacity>
              <TouchableOpacity
                className="pointer-events-box-only flex-row items-center gap-1 rounded-r-xl bg-red-500 p-4"
                onPress={() => changedDifficulty("hard")}
              >
                <RadioGroupItem value="hard" aria-labelledby="label-for-hard" />
                <Label nativeID="label-for-hard" className="native:text-xl">
                  HARD
                </Label>
              </TouchableOpacity>
            </RadioGroup>
          </View>
          <View className="gap-1">
            <Text className="text-muted-foreground">Select Collection</Text>
            <CollectionSlider test={1} />
          </View>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
