// react native
import { Text, View } from "react-native";

// other libraries
import useAnimFlippingLetter from "@/hooks/anims/useAnimFlippingLetter";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Star from "@/assets/icons/Star";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
import type { FlippingLetterType } from "@/types/shared";

interface FlippingLetterProps {
  letter: FlippingLetterType;
}

export default function FlippingLetter({ letter }: FlippingLetterProps) {
  // Use the already encapsulated animation logic for this component
  const { ICON_WIDTH, LETTER_WIDTH, HEIGHT, isIcon, isFlipped, primaryForeground } = useAnimFlippingLetter(letter);

  return (
    <View style={{ width: isIcon ? ICON_WIDTH : LETTER_WIDTH, height: HEIGHT }}>
      <FlipCard isFlipped={isFlipped} direction={Math.random() < 0.5 ? "x" : "y"}>
        <FlipCardRegularContent>
          <View className="overflow-hidden rounded-xl bg-muted" style={{ width: isIcon ? ICON_WIDTH : LETTER_WIDTH, height: HEIGHT }}>
            <Text className="line-clamp-1 text-center text-4xl text-muted-foreground" style={{ lineHeight: HEIGHT }} adjustsFontSizeToFit>
              •
            </Text>
          </View>
        </FlipCardRegularContent>
        <FlipCardFlippedContent>
          {isIcon ? (
            <View className="items-center justify-center rounded-xl bg-primary" style={{ width: ICON_WIDTH, height: HEIGHT }}>
              {letter === "PuzzlePiece" && <PuzzlePiece width={48} height={48} fill={primaryForeground} />}
              {letter === "Trophy" && <Trophy width={48} height={48} fill={primaryForeground} />}
              {letter === "WrenchScrewDriver" && <WrenchScrewDriver width={48} height={48} fill={primaryForeground} />}
              {letter === "Star" && <Star width={48} height={48} fill={primaryForeground} />}
            </View>
          ) : (
            <View className="overflow-hidden rounded-xl bg-muted" style={{ width: LETTER_WIDTH, height: HEIGHT }}>
              <Text className="line-clamp-1 text-center text-4xl text-muted-foreground" style={{ lineHeight: HEIGHT }} adjustsFontSizeToFit>
                {letter}
              </Text>
            </View>
          )}
        </FlipCardFlippedContent>
      </FlipCard>
    </View>
  );
}
