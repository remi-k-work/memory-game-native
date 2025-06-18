// react
import { type ReactNode } from "react";

// react native
import { View } from "react-native";

// components
import { FlipCardContext } from "./FlipCardContext";
import FlippedContent from "./FlippedContent";
import RegularContent from "./RegularContent";

// types
import { type SharedValue } from "react-native-reanimated";

interface AnimatedAlready {
  kind: "animated-already";
  rotateValueR: SharedValue<number>;
  rotateValueF: SharedValue<number>;
  direction?: "x" | "y";
  children: ReactNode;
}

interface NeedsToAnimate {
  kind: "needs-to-animate";
  isFlipped: SharedValue<boolean>;
  direction?: "x" | "y";
  duration?: number;
  children: ReactNode;
}

export type FlipCardProps = AnimatedAlready | NeedsToAnimate;

export default function FlipCard(props: FlipCardProps) {
  if (props.kind === "animated-already") {
    const { rotateValueR, rotateValueF, direction = "x", children } = props;
    return (
      <FlipCardContext value={{ kind: "animated-already", rotateValueR, rotateValueF, direction }}>
        <View className="flex-1">{children}</View>
      </FlipCardContext>
    );
  }

  const { isFlipped, direction = "x", duration = 600, children } = props;
  return (
    <FlipCardContext value={{ kind: "needs-to-animate", isFlipped, direction, duration }}>
      <View className="flex-1">{children}</View>
    </FlipCardContext>
  );
}

export { FlippedContent as FlipCardFlippedContent, RegularContent as FlipCardRegularContent };
