// services
import { delHighScoreStore, getHighScoreStore, setHighScoreStore } from "@/services/high-score";

// types
import type { StateStorage } from "zustand/middleware";

export default function highScoreStorage(): StateStorage {
  return {
    getItem: async (name: string): Promise<string | null> => await getHighScoreStore(),
    setItem: async (name: string, value: string): Promise<void> => await setHighScoreStore(value),
    removeItem: async (name: string): Promise<void> => await delHighScoreStore(),
  };
}
