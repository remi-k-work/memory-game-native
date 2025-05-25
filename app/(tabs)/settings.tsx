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
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>Adjust your game experience</CardDescription>
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
          <PixaBayBanner />
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
