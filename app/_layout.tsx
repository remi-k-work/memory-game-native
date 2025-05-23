import "./globals.css";

// react native
import { View } from "react-native";

// expo
import { Slot } from "expo-router";

// components
import { GameStoreProvider } from "@/stores/gameProvider";
import { PortalHost } from "@rn-primitives/portal";

export default function Layout() {
  return (
    <GameStoreProvider>
      <View className="mb-safe flex-1 bg-background">
        <Slot />
      </View>
      <PortalHost />
    </GameStoreProvider>
  );
}
