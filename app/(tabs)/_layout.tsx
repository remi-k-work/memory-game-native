// expo
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

// components
import NavTabs from "@/components/NavTabs";
import TabTurns from "@/components/TabTurns";

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={{ alignItems: "center", justifyContent: "space-around", paddingBlock: 4 }}>
        <NavTabs />
        <TabTrigger name="index" href="/" className="hidden" />
        <TabTrigger name="settings" href="/settings" className="hidden" />
        <TabTrigger name="high-scores" href="/high-scores" className="hidden" />
        <TabTrigger name="turns" href="/turns" onPress={(ev) => ev.preventDefault()}>
          <TabTurns />
        </TabTrigger>
        {/* <TabTrigger name="congrats" href="/congrats">
          <TabTurns />
        </TabTrigger>
        <TabTrigger name="test" href="/test">
          <TabTurns />
        </TabTrigger> */}
        <TabTrigger name="game-over" href="/game-over" className="hidden" />
        <TabTrigger name="congrats" href="/congrats" className="hidden" />
      </TabList>
    </Tabs>
  );
}
