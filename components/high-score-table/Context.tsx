// react
import { createContext, use, useState } from "react";

// expo
import { useLocalSearchParams } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useHighScoreStore } from "@/stores/highScoreProvider";

// types
import type { Difficulty } from "@/types/shared";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import type { ColorValue, View, ViewStyle } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";

interface NewHighScore {
  kind: "new-high-score";
  newHighScoreIndex: number;
  currName: string;
  setCurrName: Dispatch<SetStateAction<string>>;
}

interface AllHighScore {
  kind: "all-high-score";
  targetEntryRefs: RefObject<(View | null)[]>;
  highScoreIndexToHighlight: number;
  entryBgColorReg: ColorValue;
  entryBgColorAlt: ColorValue;
  entryAnimStyles: AnimatedStyle<ViewStyle>[];
}

export type HighScoreTableContextType = NewHighScore | AllHighScore;
export type HighScoreTableProviderPropsWithoutChildren = (Pick<NewHighScore, "kind"> | Omit<AllHighScore, "highScoreIndexToHighlight">) & {
  difficultyToView: Difficulty;
};
type HighScoreTableProviderProps = HighScoreTableProviderPropsWithoutChildren & { children: ReactNode };

const HighScoreTableContext = createContext<HighScoreTableContextType | undefined>(undefined);

export function useHighScoreTableContext(kind: "new-high-score"): NewHighScore;
export function useHighScoreTableContext(kind: "all-high-score"): AllHighScore;
export function useHighScoreTableContext(kind?: undefined): HighScoreTableContextType;
export function useHighScoreTableContext(kind?: HighScoreTableContextType["kind"]) {
  const ctx = use(HighScoreTableContext);
  if (!ctx) throw new Error("useHighScoreTableContext must be used within a HighScoreTableProvider.");
  if (kind && ctx.kind !== kind) throw new Error(`Expected HighScoreTableContext of kind "${kind}", but got "${ctx.kind}".`);

  return ctx;
}

export default function HighScoreTableProvider(props: HighScoreTableProviderProps) {
  // Get the state and actions we need from the game store
  const currTurns = useGameStore((state) => state.turns);

  // Get the state and actions we need from the high score store
  const getNewHighScoreIndex = useHighScoreStore((state) => state.getNewHighScoreIndex);

  // The current player's name that they have entered
  const [currName, setCurrName] = useState("");

  // Get access to the local search parameters
  const { highScoreIndexToHighlight, forDifficulty } = useLocalSearchParams<{ highScoreIndexToHighlight?: string; forDifficulty?: string }>();

  if (props.kind === "new-high-score") {
    const { difficultyToView, children } = props;
    return (
      <HighScoreTableContext value={{ kind: "new-high-score", newHighScoreIndex: getNewHighScoreIndex(difficultyToView, currTurns), currName, setCurrName }}>
        {children}
      </HighScoreTableContext>
    );
  }

  const { targetEntryRefs, difficultyToView, entryBgColorReg, entryBgColorAlt, entryAnimStyles, children } = props;
  return (
    <HighScoreTableContext
      value={{
        kind: "all-high-score",
        targetEntryRefs,
        highScoreIndexToHighlight: (forDifficulty as Difficulty) === difficultyToView ? Number(highScoreIndexToHighlight ?? "-1") : -1,
        entryBgColorReg,
        entryBgColorAlt,
        entryAnimStyles,
      }}
    >
      {children}
    </HighScoreTableContext>
  );
}
