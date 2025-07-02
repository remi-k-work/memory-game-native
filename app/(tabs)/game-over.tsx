// react native
import { Text, View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import BodyScrollView from "@/components/BodyScrollView";
import FlippingTitle from "@/components/FlippingTitle";
import Collection from "@/components/preview/Collection";
import Difficulty from "@/components/preview/Difficulty";
import Turns from "@/components/preview/Turns";
import Button from "@/components/ui/custom/button3d";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";

export default function Screen() {
  // Get the state and actions we need from the game store
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  function handleOKPressed() {
    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.back();
  }

  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <FlippingTitle icon="PuzzlePiece" text="Game Over!" />
          </CardTitle>
          <CardDescription>High Score still awaits you!</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
          <Button icon={<CheckCircle className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={handleOKPressed}>
            OK
          </Button>
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
