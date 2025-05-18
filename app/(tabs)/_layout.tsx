// expo
import { Tabs } from "expo-router";

// assets
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarInactiveTintColor: "#000000", tabBarActiveTintColor: "#ffd33d" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Game",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "game-controller-sharp" : "game-controller-outline"} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "settings-sharp" : "settings-outline"} color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="high-scores"
        options={{
          title: "High Scores",
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "list-sharp" : "list-outline"} color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
