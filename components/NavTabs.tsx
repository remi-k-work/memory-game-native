// expo
import { TabTrigger } from "expo-router/ui";

// other libraries
import useAnimNavTabs from "@/features/animations/hooks/useAnimNavTabs";

// components
import TabButton from "@/components/TabButton";

export default function NavTabs() {
  // Use the already encapsulated animation logic for this component
  const { animStyleIndex, animPropsIndex, animStyleSettings, animPropsSettings, animStyleHighScores, animPropsHighScores } = useAnimNavTabs();

  return (
    <>
      <TabTrigger name="index" href="/" asChild>
        <TabButton iconName="PuzzlePiece" animStyle={animStyleIndex} animProps={animPropsIndex} />
      </TabTrigger>
      <TabTrigger name="settings" href="/settings" asChild>
        <TabButton iconName="WrenchScrewDriver" animStyle={animStyleSettings} animProps={animPropsSettings} />
      </TabTrigger>
      <TabTrigger name="high-scores" href="/high-scores" asChild>
        <TabButton iconName="Trophy" animStyle={animStyleHighScores} animProps={animPropsHighScores} />
      </TabTrigger>
    </>
  );
}
