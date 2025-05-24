// react native
import { ScrollView, Text, View } from "react-native";

// components
import Collection from "@/components/preview/Collection";
import Difficulty from "@/components/preview/Difficulty";
import Turns from "@/components/preview/Turns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="items-center" className="mt-safe">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Game Over!</CardTitle>
          <CardDescription className="text-xl">You have completed the game!</CardDescription>
        </CardHeader>
        <CardContent className="items-center gap-6 rounded-lg bg-muted pt-6">
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
        <CardFooter className="justify-center pt-6">
          <Text className="text-foreground">You did not beat the high score, try again!</Text>
        </CardFooter>
      </Card>
    </ScrollView>
  );
}
