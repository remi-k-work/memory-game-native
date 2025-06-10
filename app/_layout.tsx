import "./globals.css";

// react native
import { View } from "react-native";

// expo
import { Slot } from "expo-router";

// other libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

// components
import { GameStoreProvider } from "@/stores/gameProvider";
import { HighScoreStoreProvider } from "@/stores/highScoreProvider";
import { PortalHost } from "@rn-primitives/portal";

// logger configuration for react native reanimated
configureReanimatedLogger({ level: ReanimatedLogLevel.warn, strict: true });

// Create a client
const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameStoreProvider>
        <HighScoreStoreProvider>
          <View className="mb-safe flex-1 bg-background">
            <Slot />
          </View>
          <PortalHost />
        </HighScoreStoreProvider>
      </GameStoreProvider>
    </QueryClientProvider>
  );
}
