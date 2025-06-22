// expo
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

// other libraries
import useAnimTabs from "@/features/animations/hooks/useAnimTabs";

// components
import TabButton from "@/components/TabButton";
import TabTurns from "@/components/TabTurns";

export default function Layout() {
  // Use the already encapsulated animation logic for this component
  const {
    backgroundColorIndex,
    widthIndex,
    borderRadiusIndex,
    fillIndex,
    backgroundColorSettings,
    widthSettings,
    borderRadiusSettings,
    fillSettings,
    backgroundColorHighScores,
    widthHighScores,
    borderRadiusHighScores,
    fillHighScores,
  } = useAnimTabs();

  return (
    <Tabs>
      <TabSlot />
      <TabList style={{ alignItems: "center", justifyContent: "space-around", paddingBlock: 4 }}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton iconName="PuzzlePiece" backgroundColor={backgroundColorIndex} width={widthIndex} borderRadius={borderRadiusIndex} fill={fillIndex} />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <TabButton
            iconName="WrenchScrewDriver"
            backgroundColor={backgroundColorSettings}
            width={widthSettings}
            borderRadius={borderRadiusSettings}
            fill={fillSettings}
          />
        </TabTrigger>
        <TabTrigger name="high-scores" href="/high-scores" asChild>
          <TabButton
            iconName="Trophy"
            backgroundColor={backgroundColorHighScores}
            width={widthHighScores}
            borderRadius={borderRadiusHighScores}
            fill={fillHighScores}
          />
        </TabTrigger>
        <TabTrigger name="turns" href="/turns" onPress={(ev) => ev.preventDefault()}>
          <TabTurns />
        </TabTrigger>
        <TabTrigger name="test" href="/test">
          <TabTurns />
        </TabTrigger>
        <TabTrigger name="congrats" href="/congrats">
          <TabTurns />
        </TabTrigger>
        {/* <TabTrigger name="game-over" href="/game-over" className="hidden" />
        <TabTrigger name="congrats" href="/congrats" className="hidden" /> */}
      </TabList>
    </Tabs>
  );
}
