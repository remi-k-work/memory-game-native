// react native
import { ScrollView, Text, View } from "react-native";

// components
import CollectionSlider from "@/components/collection-slider";
import DifficultyChanger from "@/components/DifficultyChanger";
import IllustrationsSwitch from "@/components/IllustrationsSwitch";
import NewGameButton from "@/components/NewGameButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="items-center mt-safe">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>Change the difficulty, collection set, and card image type</CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-1">
            <Text className="text-muted-foreground">What Difficulty?</Text>
            <DifficultyChanger />
          </View>
          <View className="gap-1">
            <Text className="text-muted-foreground">Which Collection Set?</Text>
            <CollectionSlider />
          </View>
          <View className="gap-1">
            <Text className="text-muted-foreground">Photos or Illustrations?</Text>
            <IllustrationsSwitch />
          </View>
          <NewGameButton />
        </CardContent>
        <CardFooter>
          <Text className="text-muted-foreground">Card Footer</Text>
        </CardFooter>
      </Card>
    </ScrollView>
  );
}
