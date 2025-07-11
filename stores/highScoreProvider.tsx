// react
import { ReactNode, createContext, use, useRef } from "react";

// other libraries
import { useStore } from "zustand";
import { createHighScoreStore } from "./highScore";

// components
import LiquidGaugeProgress from "@/components/liquid-gauge-progress";

// types
import type { HighScoreState, HighScoreStore, HighScoreStoreApi } from "./highScore";

interface HighScoreProviderProps {
  initState?: HighScoreState;
  children: ReactNode;
}

const HighScoreStoreContext = createContext<HighScoreStoreApi | undefined>(undefined);

export const HighScoreStoreProvider = ({ initState, children }: HighScoreProviderProps) => {
  const storeRef = useRef<HighScoreStoreApi>(undefined);
  if (!storeRef.current) storeRef.current = createHighScoreStore(initState);

  // Hydration and asynchronous storages - wait until the store has been hydrated before showing anything
  const _hasHydrated = useStore(storeRef.current, (state) => state._hasHydrated);
  if (!_hasHydrated) return <LiquidGaugeProgress progress={0} />;

  return <HighScoreStoreContext value={storeRef.current}>{children}</HighScoreStoreContext>;
};

export const useHighScoreStore = <T,>(selector: (store: HighScoreStore) => T): T => {
  const highScoreStoreContext = use(HighScoreStoreContext);
  if (!highScoreStoreContext) throw new Error("useHighScoreStore must be used within a HighScoreStoreProvider.");
  return useStore(highScoreStoreContext, selector);
};

export const useRehydrateHighScore = () => {
  const highScoreStoreContext = use(HighScoreStoreContext);
  if (!highScoreStoreContext) throw new Error("useRehydrateHighScore must be used within a HighScoreStoreProvider.");
  return highScoreStoreContext.persist.rehydrate;
};
