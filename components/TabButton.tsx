// react
import type { ComponentProps } from "react";

// react native
import { Pressable } from "react-native";

// expo
import Ionicons from "@expo/vector-icons/Ionicons";
import type { TabTriggerSlotProps } from "expo-router/ui";

// types
type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface TabButtonProps extends TabTriggerSlotProps {
  regularIconName: IoniconsName;
  focusedIconName: IoniconsName;
}

export default function TabButton({ isFocused, regularIconName, focusedIconName, ...props }: TabButtonProps) {
  return (
    <Pressable {...props}>
      <Ionicons name={isFocused ? focusedIconName : regularIconName} color="#fff" size={48} />
    </Pressable>
  );
}
