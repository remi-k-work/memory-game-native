// react native
import { Text, View } from "react-native";

// components
import BodyScrollView from "@/components/BodyScrollView";
import CollectionSlider from "@/components/collection-slider";
import DifficultyChanger from "@/components/DifficultyChanger";
import FlippingLetter from "@/components/FlippingLetter";
import IllustrationsSwitch from "@/components/IllustrationsSwitch";
import NewGameButton from "@/components/NewGameButton";
import PixaBayBanner from "@/components/PixaBayBanner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";

export default function Screen() {
  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <FlippingLetter letter="WrenchScrewDriver" />
            <FlippingLetter letter="S" />
            <FlippingLetter letter="e" />
            <FlippingLetter letter="t" />
            <FlippingLetter letter="t" />
            <FlippingLetter letter="i" />
            <FlippingLetter letter="n" />
            <FlippingLetter letter="g" />
            <FlippingLetter letter="s" />
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
