import "./globals.css";

// react native
import { View } from "react-native";

// expo
import { Slot } from "expo-router";

// components
import { GameStoreProvider } from "@/stores/gameProvider";
import { HighScoreStoreProvider } from "@/stores/highScoreProvider";
import { PortalHost } from "@rn-primitives/portal";

export default function Layout() {
  return (
    <GameStoreProvider>
      <HighScoreStoreProvider>
        <View className="mb-safe flex-1 bg-background">
          <Slot />
        </View>
        <PortalHost />
      </HighScoreStoreProvider>
    </GameStoreProvider>
  );
}
