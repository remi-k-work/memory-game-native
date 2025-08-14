// components
import NewEntry from "./New";
import OldEntry from "./Old";
import RegEntry from "./Reg";

// types
import type { HighScore } from "@/types/shared";
import type { Ref } from "react";
import type { View, ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

interface EntryProps {
  ref?: Ref<View | null>;
  index: number;
  highScore: HighScore;
  isNewHighScore?: boolean;
  isHighlighted?: boolean;
  animStyle?: AnimatedStyle<ViewStyle>;
}

export default function Entry({ ref, index, highScore, isNewHighScore = false, isHighlighted = false, animStyle }: EntryProps) {
  // Show either a new high score entry or a regular high score entry
  return isNewHighScore ? (
    <>
      <OldEntry index={index} highScore={highScore} />
      <NewEntry index={index} highScore={highScore} />
    </>
  ) : (
    <RegEntry ref={ref!} index={index} highScore={highScore} isHighlighted={isHighlighted} animStyle={animStyle} />
  );
}
