import "./globals.css";

// react native
import { View } from "react-native";

// expo
import { Slot } from "expo-router";

// components
import { getHighScore } from "@/services/high-score";
import { GameStoreProvider } from "@/stores/gameProvider";
import { HighScoreStoreProvider } from "@/stores/highScoreProvider";
import { PortalHost } from "@rn-primitives/portal";

export default function Layout() {
  // *** TEST CODE ***
  getHighScore()
    .then((highScore) => console.log(highScore))
    .catch((error) => console.error(error));
  // *** TEST CODE ***

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
