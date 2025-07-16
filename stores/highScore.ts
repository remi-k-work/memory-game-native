// other libraries
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import highScoreStorage from "./highScoreStorage";

// types
import type { Difficulty, HighScore, HighScores } from "@/types/shared";

// constants
import { INIT_HIGH_SCORES } from "@/constants/high-scores";

export interface HighScoreState extends HighScores {
  _hasHydrated: boolean;
}

interface HighScoreActions {
  _setHasHydrated: () => void;
  enteredNewHighScore: (difficulty: Difficulty, newHighScoreIndex: number, newHighScore: HighScore) => void;
}

interface HighScoreDerived {
  hasMadeHighScore: (difficulty: Difficulty, turns: number) => boolean;
  getNewHighScoreIndex: (difficulty: Difficulty, turns: number) => number;
}

export type HighScoreStore = HighScoreState & HighScoreActions & HighScoreDerived;
export type HighScoreStoreApi = ReturnType<typeof createHighScoreStore>;

export const createHighScoreStore = (initState?: HighScoreState) => {
  const DEFAULT_STATE: HighScoreState = { _hasHydrated: false, ...INIT_HIGH_SCORES };

  return createStore<HighScoreStore>()(
    persist(
      (set, get) => ({
        ...DEFAULT_STATE,
        ...initState,

        // The store has been hydrated
        _setHasHydrated: () => set(() => ({ _hasHydrated: true })),

        // Player has entered a new high score
        enteredNewHighScore: (difficulty, newHighScoreIndex, newHighScore) =>
          set((state) => ({
            ...state,
            [difficulty]: [...state[difficulty].slice(0, newHighScoreIndex), newHighScore, ...state[difficulty].slice(newHighScoreIndex + 1)],
          })),

        // *** State-derived functions and selectors ***

        // Has the player made a high score for a given difficulty?
        hasMadeHighScore: (difficulty, turns) => {
          const highScores = get()[difficulty];
          return highScores.some((highScore) => highScore.turns >= turns);
        },

        // Get the index at which a new high score should be inserted for a given difficulty
        getNewHighScoreIndex: (difficulty, turns) => {
          const highScores = get()[difficulty];
          return highScores.findIndex((highScore) => highScore.turns >= turns);
        },
      }),
      {
        name: "highScore",
        version: 1,
        storage: createJSONStorage(() => highScoreStorage()),

        // Only persist the actual score data
        partialize: (state) => ({
          easy: state.easy,
          medium: state.medium,
          hard: state.hard,
        }),

        // Safely merge the persisted state with the initial state
        merge: (persistedState, currentState) => {
          const typedState = (persistedState as Partial<HighScoreState>) || {};
          return {
            ...currentState,

            // Check for race conditions, and use the current state if the persisted state is invalid
            easy: typedState.easy && typedState.easy.length > 0 ? typedState.easy : currentState.easy,
            medium: typedState.medium && typedState.medium.length > 0 ? typedState.medium : currentState.medium,
            hard: typedState.hard && typedState.hard.length > 0 ? typedState.hard : currentState.hard,
          };
        },

        // The store has been hydrated
        onRehydrateStorage: (state) => () => state._setHasHydrated(),
      },
    ),
  );
};
