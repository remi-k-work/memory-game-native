// expo
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

// components
import TabButton from "@/components/TabButton";
import TabTurns from "@/components/TabTurns";

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={{ alignItems: "center", justifyContent: "space-around", paddingBlock: 4 }}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton iconName="PuzzlePiece" />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <TabButton iconName="WrenchScrewDriver" />
        </TabTrigger>
        <TabTrigger name="high-scores" href="/high-scores" asChild>
          <TabButton iconName="Trophy" />
        </TabTrigger>
        <TabTrigger name="turns" href="/turns" onPress={(ev) => ev.preventDefault()} asChild>
          <TabTurns />
        </TabTrigger>
        <TabTrigger name="game-over" href="/game-over" className="hidden" />
        <TabTrigger name="congrats" href="/congrats" className="hidden" />
      </TabList>
    </Tabs>
  );
}
