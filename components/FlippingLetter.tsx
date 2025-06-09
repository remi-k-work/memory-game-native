// react
import { useEffect } from "react";

// react native
import { Text, View } from "react-native";

// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import { useSharedValue } from "react-native-reanimated";

// components
import FlipCard, { FlipCardFlippedContent, FlipCardRegularContent } from "@/components/flip-card";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import Trophy from "@/assets/icons/Trophy";
import WrenchScrewDriver from "@/assets/icons/WrenchScrewDriver";

// types
interface FlippingLetterProps {
  letter: string | "PuzzlePiece" | "Trophy" | "WrenchScrewDriver";
}

// constants
import { COLORS } from "@/constants/colors";

export default function FlippingLetter({ letter }: FlippingLetterProps) {
  const isFlipped = useSharedValue(false);

  useEffect(() => {
    isFlipped.value = isFlipped.value ? false : true; //withDelay(1000, withTiming(1, { duration: 1000 })) === 1;
  }, []);

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primaryForeground } = COLORS[colorScheme];

  return (
    <FlipCard isFlipped={isFlipped}>
      <FlipCardRegularContent>
        <View className="overflow-hidden rounded-xl bg-muted" style={{ width: 64, height: 64 }}>
          <Text className="line-clamp-1 text-center text-4xl text-muted-foreground" style={{ lineHeight: 64 }} adjustsFontSizeToFit>
            .
          </Text>
        </View>
      </FlipCardRegularContent>
      <FlipCardFlippedContent>
        {letter === "PuzzlePiece" || letter === "Trophy" || letter === "WrenchScrewDriver" ? (
          <View className="items-center justify-center rounded-xl bg-primary" style={{ width: 64, height: 64 }}>
            {letter === "PuzzlePiece" && <PuzzlePiece width={48} height={48} fill={primaryForeground} />}
            {letter === "Trophy" && <Trophy width={48} height={48} fill={primaryForeground} />}
            {letter === "WrenchScrewDriver" && <WrenchScrewDriver width={48} height={48} fill={primaryForeground} />}
          </View>
        ) : (
          <View className="overflow-hidden rounded-xl bg-muted" style={{ width: 64, height: 64 }}>
            <Text className="line-clamp-1 text-center text-4xl text-muted-foreground" style={{ lineHeight: 64 }} adjustsFontSizeToFit>
              {letter}
            </Text>
          </View>
        )}
      </FlipCardFlippedContent>
    </FlipCard>
  );
}
