// other libraries
import { createStore } from "zustand/vanilla";

// types
import type { Difficulty, HighScores } from "@/types/shared";

// constants
import { INIT_HIGH_SCORES } from "@/constants/high-scores";

export interface HighScoreState extends HighScores {}

interface HighScoreActions {}

interface HighScoreDerived {
  hasMadeHighScore: (difficulty: Difficulty, turns: number) => boolean;
  getHighScoreInsertIndex: (difficulty: Difficulty, turns: number) => number;
}

export type HighScoreStore = HighScoreState & HighScoreActions & HighScoreDerived;
export type HighScoreStoreApi = ReturnType<typeof createHighScoreStore>;

export const createHighScoreStore = (initState?: HighScoreState) => {
  const DEFAULT_STATE: HighScoreState = INIT_HIGH_SCORES;

  return createStore<HighScoreStore>()((set, get) => ({
    ...DEFAULT_STATE,
    ...initState,

    // *** State-derived functions and selectors ***

    // Has the player made a high score for a given difficulty?
    hasMadeHighScore: (difficulty, turns) => {
      const highScores = get()[difficulty];
      return highScores.some((highScore) => highScore.turns >= turns);
    },

    // Get the index at which a new high score should be inserted for a given difficulty
    getHighScoreInsertIndex: (difficulty, turns) => {
      const highScores = get()[difficulty];
      return highScores.findIndex((highScore) => highScore.turns >= turns);
    },
  }));
};
