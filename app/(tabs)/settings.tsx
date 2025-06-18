// react native
import { Text, View } from "react-native";

// components
import BodyScrollView from "@/components/BodyScrollView";
import CollectionSlider from "@/components/collection-slider";
import DifficultyChanger from "@/components/DifficultyChanger";
import IllustrationsSwitch from "@/components/IllustrationsSwitch";
import NewGameButton from "@/components/NewGameButton";
import PixaBayBanner from "@/components/PixaBayBanner";
import SettingsTitle from "@/components/titles/Settings";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";

export default function Screen() {
  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <SettingsTitle />
          </CardTitle>
          <CardDescription>Adjust your game experience</CardDescription>
        </CardHeader>
        <CardContent>
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
        <CardFooter>
          <PixaBayBanner />
        </CardFooter>
      </Card>
    </BodyScrollView>
  );
}
