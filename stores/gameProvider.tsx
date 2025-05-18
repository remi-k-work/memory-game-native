// react
import { ReactNode, createContext, use, useRef } from "react";

// other libraries
import { useStore } from "zustand";
import { type GameState, type GameStore, type GameStoreApi, createGameStore } from "./game";

// types
interface GameProviderProps {
  initState?: GameState;
  children: ReactNode;
}

const GameStoreContext = createContext<GameStoreApi | undefined>(undefined);

export const GameStoreProvider = ({ initState, children }: GameProviderProps) => {
  const storeRef = useRef<GameStoreApi>(undefined);
  if (!storeRef.current) storeRef.current = createGameStore(initState);
  return <GameStoreContext value={storeRef.current}>{children}</GameStoreContext>;
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
  const gameStoreContext = use(GameStoreContext);
  if (!gameStoreContext) throw new Error("useGameStore must be used within a GameStoreProvider.");
  return useStore(gameStoreContext, selector);
};
