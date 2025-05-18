// react native
import { View } from "react-native";

// other libraries
import { useSafeAreaInsets } from "react-native-safe-area-context";

// components
import CollectionSlider from "@/components/collection-slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Text } from "~/components/ui/text";

export default function Screen() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card Content</Text>
          <CollectionSlider test={1} />
          <Select defaultValue={{ value: "apple", label: "Apple" }} onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue className="native:text-lg text-sm text-foreground" placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-[250px]">
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem label="Apple" value="apple">
                  Apple
                </SelectItem>
                <SelectItem label="Banana" value="banana">
                  Banana
                </SelectItem>
                <SelectItem label="Blueberry" value="blueberry">
                  Blueberry
                </SelectItem>
                <SelectItem label="Grapes" value="grapes">
                  Grapes
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
                <SelectItem label="Pineapple" value="pineapple">
                  Pineapple
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
