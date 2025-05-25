// other libraries
import { createStore } from "zustand/vanilla";

// types
import type { HighScores } from "@/types/shared";

// constants
import { INIT_HIGH_SCORES } from "@/constants/high-scores";

export interface HighScoreState extends HighScores {}

interface HighScoreActions {}

interface HighScoreDerived {}

export type HighScoreStore = HighScoreState & HighScoreActions & HighScoreDerived;
export type HighScoreStoreApi = ReturnType<typeof createHighScoreStore>;

export const createHighScoreStore = (initState?: HighScoreState) => {
  const DEFAULT_STATE: HighScoreState = INIT_HIGH_SCORES;

  return createStore<HighScoreStore>()((set, get) => ({
    ...DEFAULT_STATE,
    ...initState,
  }));
};
