import "./globals.css";

// react
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// react native
import { Platform, View } from "react-native";

// expo
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// other libraries
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";

// components
import { GameStoreProvider } from "@/stores/gameProvider";
import { PortalHost } from "@rn-primitives/portal";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function Layout() {
  const hasMounted = useRef(false);
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const { isDarkColorScheme } = useColorScheme();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;

    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <GameStoreProvider>
        <View className="pt-safe flex-1">
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </GameStoreProvider>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect = Platform.OS === "web" && typeof window === "undefined" ? useEffect : useLayoutEffect;
