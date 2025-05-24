// react
import type { ComponentProps } from "react";

// react native
import { Pressable } from "react-native";

// expo
import Ionicons from "@expo/vector-icons/Ionicons";
import type { TabTriggerSlotProps } from "expo-router/ui";

// other libraries
import { cssInterop } from "nativewind";

// types
type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface TabButtonProps extends TabTriggerSlotProps {
  regularIconName: IoniconsName;
  focusedIconName: IoniconsName;
}

// Resolve the classname strings into icon styles (so we can change the color prop with the classname prop)
cssInterop(Ionicons, { className: { target: "style", nativeStyleToProp: { color: true } } });

export default function TabButton({ isFocused, regularIconName, focusedIconName, ...props }: TabButtonProps) {
  return (
    <Pressable {...props}>
      <Ionicons name={isFocused ? focusedIconName : regularIconName} size={48} className="text-foreground" />
    </Pressable>
  );
}
