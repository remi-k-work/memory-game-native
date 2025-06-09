// react
import { type ReactNode } from "react";

// react native
import { View } from "react-native";

// other libraries
import { type SharedValue } from "react-native-reanimated";

// components
import { FlipCardContext } from "./FlipCardContext";
import FlippedContent from "./FlippedContent";
import RegularContent from "./RegularContent";

// types
interface FlipCardProps {
  isFlipped: SharedValue<boolean>;
  direction?: "x" | "y";
  duration?: number;
  children: ReactNode;
}

export default function FlipCard({ isFlipped, direction = "y", duration = 500, children }: FlipCardProps) {
  return (
    <FlipCardContext value={{ isFlipped, direction, duration }}>
      <View>{children}</View>
    </FlipCardContext>
  );
}

export { FlippedContent as FlipCardFlippedContent, RegularContent as FlipCardRegularContent };
