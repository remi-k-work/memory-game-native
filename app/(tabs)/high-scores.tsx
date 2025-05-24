// react
import { useState } from "react";

// react native
import { ScrollView, Text } from "react-native";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Screen() {
  const [value, setValue] = useState("account");

  return (
    <ScrollView contentContainerClassName="items-center" className="mt-safe">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center">
          <CardTitle className="text-4xl">Hall of Fame</CardTitle>
          <CardDescription className="text-xl">High Scores</CardDescription>
        </CardHeader>
        <CardContent className="items-center gap-6 rounded-lg bg-muted pt-6">
          <Tabs value={value} onValueChange={setValue} className="mx-auto w-full max-w-[400px] flex-col gap-1.5">
            <TabsList className="w-full flex-row">
              <TabsTrigger value="account" className="flex-1">
                <Text>Account</Text>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex-1">
                <Text>Password</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Text>Account</Text>
            </TabsContent>
            <TabsContent value="password">
              <Text>Password</Text>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center pt-6">
          <Text className="text-foreground">You did not beat the high score, try again!</Text>
        </CardFooter>
      </Card>
    </ScrollView>
  );
}
