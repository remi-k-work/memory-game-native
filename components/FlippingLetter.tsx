// react native
import { Text, View } from "react-native";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Star from "@/assets/icons/Star";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
import type { FlippingLetterType } from "@/types/shared";
import type { SharedValue } from "react-native-reanimated";

interface FlippingLetterProps {
  letter: FlippingLetterType;
  rotateValueR: SharedValue<number>;
  rotateValueF: SharedValue<number>;
}

// constants
const ICON_WIDTH = 64;
const LETTER_WIDTH = 46;
const HEIGHT = 64;

export default function FlippingLetter({ letter, rotateValueR, rotateValueF }: FlippingLetterProps) {
  // Are we showing an icon instead of a simple letter?
  const isIcon = letter === "PuzzlePiece" || letter === "Trophy" || letter === "WrenchScrewDriver" || letter === "Star";

  return (
    <View style={{ width: isIcon ? ICON_WIDTH : LETTER_WIDTH, height: HEIGHT }}>
      <FlipCard kind="animated-already" rotateValueR={rotateValueR} rotateValueF={rotateValueF} direction={Math.random() < 0.5 ? "x" : "y"}>
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
              {letter === "PuzzlePiece" && <PuzzlePiece className="size-14 fill-primary-foreground stroke-muted-foreground stroke-1" />}
              {letter === "Trophy" && <Trophy className="size-14 fill-primary-foreground stroke-muted-foreground stroke-1" />}
              {letter === "WrenchScrewDriver" && <WrenchScrewDriver className="size-14 fill-primary-foreground stroke-muted-foreground stroke-1" />}
              {letter === "Star" && <Star className="size-14 fill-primary-foreground stroke-muted-foreground stroke-1" />}
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
