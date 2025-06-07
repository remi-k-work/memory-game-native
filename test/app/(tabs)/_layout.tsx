// expo
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

// components
import TabButton from "@/components/TabButton";
import TabTurns from "@/components/TabTurns";

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={{ alignItems: "center", justifyContent: "space-around" }}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <TabButton />
        </TabTrigger>
        <TabTrigger name="high-scores" href="/high-scores" asChild>
          <TabButton />
        </TabTrigger>
        <TabTrigger name="turns" href="/turns" onPress={(ev) => ev.preventDefault()} asChild>
          <TabTurns />
        </TabTrigger>
        <TabTrigger name="game-over" href="/game-over" asChild>
          <TabButton />
        </TabTrigger>
        <TabTrigger name="congrats" href="/congrats" asChild>
          <TabButton />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
