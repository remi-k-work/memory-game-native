// react native
import { View } from "react-native";

// other libraries
import { useHighScoreTableContext } from "@/components/high-score-table/Context";

// components
import MorphedEntry from "./Morphed";
import NewEntry from "./New";
import OldEntry from "./Old";
import RegEntry from "./Reg";

// types
import type { HighScore } from "@/types/shared";

interface EntryProps {
  index: number;
  highScore: HighScore;
}

export default function Entry({ index, highScore }: EntryProps) {
  // Show either a new high score entry or a regular high score entry
  const highScoreTableContext = useHighScoreTableContext();

  if (highScoreTableContext.kind === "new-high-score") {
    const { newHighScoreIndex } = highScoreTableContext;
    const isNewHighScore = index === newHighScoreIndex;

    return isNewHighScore ? (
      <>
        <OldEntry index={index} highScore={highScore} />
        <View>
          <MorphedEntry index={index} />
        </View>
        <NewEntry index={index} />
      </>
    ) : (
      <RegEntry index={index} highScore={highScore} />
    );
  }

  return <RegEntry index={index} highScore={highScore} />;
}
