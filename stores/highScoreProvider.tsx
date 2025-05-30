// react
import { ReactNode, createContext, use, useRef } from "react";

// react native
import { ActivityIndicator, View } from "react-native";

// other libraries
import { useStore } from "zustand";
import { type HighScoreState, type HighScoreStore, type HighScoreStoreApi, createHighScoreStore } from "./highScore";

// types
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
  if (!_hasHydrated)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );

  return <HighScoreStoreContext value={storeRef.current}>{children}</HighScoreStoreContext>;
};

export const useHighScoreStore = <T,>(selector: (store: HighScoreStore) => T): T => {
  const highScoreStoreContext = use(HighScoreStoreContext);
  if (!highScoreStoreContext) throw new Error("useHighScoreStore must be used within a HighScoreStoreProvider.");
  return useStore(highScoreStoreContext, selector);
};
