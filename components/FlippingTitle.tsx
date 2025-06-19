// react
import { useMemo } from "react";

// other libraries
import useAnimFlippingTitle from "@/features/animations/hooks/useAnimFlippingTitle";

// components
import FlippingLetter from "@/components/FlippingLetter";

// types
import type { FlippingTitleIcon } from "@/types/shared";

interface FlippingTitleProps {
  icon: FlippingTitleIcon;
  text: string;
}

export default function FlippingTitle({ icon, text }: FlippingTitleProps) {
  // Derive ANIMATED_ITEMS from props
  const ANIMATED_ITEMS = useMemo(() => [icon, ...text.split("")], [icon, text]);

  // Use the already encapsulated animation logic for this component
  const { animationSharedValues } = useAnimFlippingTitle(ANIMATED_ITEMS);

  return (
    <>
      {ANIMATED_ITEMS.map((letter, index) => (
        <FlippingLetter
          key={index}
          letter={letter}
          rotateValueR={animationSharedValues[`rotateValueR${index}`]}
          rotateValueF={animationSharedValues[`rotateValueF${index}`]}
        />
      ))}
    </>
  );
}
