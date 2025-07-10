// react
import { ReactNode, createContext, use, useRef } from "react";

// other libraries
import { useStore } from "zustand";
import { createGameStore } from "./game";

// components
import LiquidGaugeProgress from "@/components/liquid-gauge-progress";

// types
import type { GameState, GameStore, GameStoreApi } from "./game";

interface GameProviderProps {
  initState?: GameState;
  children: ReactNode;
}

const GameStoreContext = createContext<GameStoreApi | undefined>(undefined);

export const GameStoreProvider = ({ initState, children }: GameProviderProps) => {
  const storeRef = useRef<GameStoreApi>(undefined);
  if (!storeRef.current) storeRef.current = createGameStore(initState);

  // Hydration and asynchronous storages - wait until the store has been hydrated before showing anything
  const _hasHydrated = useStore(storeRef.current, (state) => state._hasHydrated);
  if (!_hasHydrated) return <LiquidGaugeProgress progress={0} />;

  return <GameStoreContext value={storeRef.current}>{children}</GameStoreContext>;
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
  const gameStoreContext = use(GameStoreContext);
  if (!gameStoreContext) throw new Error("useGameStore must be used within a GameStoreProvider.");
  return useStore(gameStoreContext, selector);
};
