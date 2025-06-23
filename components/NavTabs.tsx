// expo
import { TabTrigger } from "expo-router/ui";

// other libraries
import useAnimNavTabs from "@/features/animations/hooks/useAnimNavTabs";

// components
import TabButton from "@/components/TabButton";

export default function NavTabs() {
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
  } = useAnimNavTabs();

  return (
    <>
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
    </>
  );
}
