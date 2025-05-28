// react native
import { Text, View } from "react-native";

// components
import BodyScrollView from "@/components/BodyScrollView";
import CollectionSlider from "@/components/collection-slider";
import DifficultyChanger from "@/components/DifficultyChanger";
import IllustrationsSwitch from "@/components/IllustrationsSwitch";
import NewGameButton from "@/components/NewGameButton";
import PixaBayBanner from "@/components/PixaBayBanner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Screen() {
  return (
    <BodyScrollView>
      <Card className="w-full">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Game Settings</CardTitle>
          <CardDescription className="text-xl">Adjust your game experience</CardDescription>
        </CardHeader>
        <CardContent className="items-center gap-6 rounded-lg bg-muted p-0 pt-6">
          <View className="items-center gap-2">
            <Text className="text-muted-foreground">What Difficulty?</Text>
            <DifficultyChanger />
          </View>
          <View className="items-center gap-2">
            <Text className="text-muted-foreground">Which Collection Set?</Text>
            <CollectionSlider />
          </View>
          <View className="items-center gap-2">
            <Text className="text-muted-foreground">Photos or Illustrations?</Text>
            <IllustrationsSwitch />
          </View>
          <NewGameButton />
        </CardContent>
        <CardFooter className="justify-center pt-6">
          <PixaBayBanner />
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
