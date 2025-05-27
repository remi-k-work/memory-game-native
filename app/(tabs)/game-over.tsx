// react native
import { View } from "react-native";

// expo
import { useRouter } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import Collection from "@/components/preview/Collection";
import Difficulty from "@/components/preview/Difficulty";
import Turns from "@/components/preview/Turns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function Screen() {
  // Get the state and actions we need from the game store
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  const router = useRouter();

  function handleOKPressed() {
    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.back();
  }

  return (
    <BodyScrollView>
      <Card className="w-full">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Game Over!</CardTitle>
          <CardDescription className="text-xl">You have completed the game!</CardDescription>
        </CardHeader>
        <CardContent className="items-center gap-6 rounded-lg bg-muted px-0 pt-6">
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Number of Turns</Text>
            <Turns />
          </View>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Difficulty Level</Text>
            <Difficulty />
          </View>
          <View className="items-center gap-1">
            <Text className="text-muted-foreground">Collection Set</Text>
            <Collection />
          </View>
          <Text className="text-foreground">You haven't beaten the high score yet; try again!</Text>
        </CardContent>
        <CardFooter className="justify-center pt-6">
          <Button size="lg" onPress={handleOKPressed}>
            <Text>OK</Text>
          </Button>
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
