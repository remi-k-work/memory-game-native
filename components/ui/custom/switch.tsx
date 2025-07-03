// react native
import { Switch as RnSwitch } from "react-native";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";

// types
import type { ComponentPropsWithoutRef } from "react";

// constants
import { COLORS } from "@/constants/colors";

export default function Switch(props: ComponentPropsWithoutRef<typeof RnSwitch>) {
  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, primaryForeground, secondary, secondaryForeground } = COLORS[colorScheme];

  return <RnSwitch trackColor={{ true: primary, false: secondary }} thumbColor={props.value ? primaryForeground : secondaryForeground} {...props} />;
}
