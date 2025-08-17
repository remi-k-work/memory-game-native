// react native
import { Text } from "react-native";

// other libraries
import { useHighScoreTableContext } from "@/components/high-score-table/Context";
import { cn } from "@/lib/utils";

// components
import Collection from "@/components/preview/Collection";
import Turns from "@/components/preview/Turns";
import { AnimatedTableRow, TableCell, TableRow } from "@/components/ui/custom/table";

// types
import type { HighScore } from "@/types/shared";
import type { CSSAnimationKeyframes } from "react-native-reanimated";

interface RegEntryProps {
  index: number;
  highScore: HighScore;
}

// constants
const wobble: CSSAnimationKeyframes = {
  from: { transform: [{ translateX: 0 }] },
  "15%": { transform: [{ translateX: -25 }, { rotateZ: "-5deg" }] },
  "30%": { transform: [{ translateX: 20 }, { rotateZ: "3deg" }] },
  "45%": { transform: [{ translateX: -15 }, { rotateZ: "-3deg" }] },
  "60%": { transform: [{ translateX: 10 }, { rotateZ: "2deg" }] },
  "75%": { transform: [{ translateX: -5 }, { rotateZ: "-1deg" }] },
  to: { transform: [{ translateX: 0 }] },
};

export default function RegEntry({ index, highScore: { name, turns, collection } }: RegEntryProps) {
  const highScoreTableContext = useHighScoreTableContext();

  // Show the regular high score entry as highlighted or not (this is the animated version for the "all-high-score" mode)
  if (highScoreTableContext.kind === "all-high-score") {
    const { targetEntryRefs, highScoreIndexToHighlight, entryBgColorReg, entryBgColorAlt, entryAnimStyles } = highScoreTableContext;
    const isHighlighted = highScoreIndexToHighlight === index;

    return (
      <AnimatedTableRow
        ref={(ref) => {
          targetEntryRefs.current[index] = ref;
        }}
        className={cn("items-center", isHighlighted && "bg-primary")}
        style={[
          entryAnimStyles[index],
          isHighlighted && { animationName: wobble, animationDuration: "2s", animationIterationCount: "infinite" },
          !isHighlighted && index % 2 === 0 && { backgroundColor: entryBgColorReg },
          !isHighlighted && index % 2 === 1 && { backgroundColor: entryBgColorAlt },
        ]}
      >
        <TableCell className="w-1/5">
          <Text className={cn("text-center text-5xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl", isHighlighted && "text-primary-foreground")}>
            {index + 1}
          </Text>
        </TableCell>
        <TableCell className="w-1/5">
          <Text className={cn("text-center text-3xl text-foreground sm:text-4xl md:text-5xl lg:text-6xl", isHighlighted && "text-primary-foreground")}>
            {name}
          </Text>
        </TableCell>
        <TableCell className="w-2/5">
          <Collection collectionCategory={collection} isHighlighted={isHighlighted} />
        </TableCell>
        <TableCell className="w-1/5">
          <Turns turns={turns} isHighlighted={isHighlighted} />
        </TableCell>
      </AnimatedTableRow>
    );
  }

  // Show the regular high score entry (this is the non-animated and simple version for the "new-high-score" mode)
  return (
    <TableRow className="items-center bg-background">
      <TableCell className="w-1/5">
        <Text className="text-center text-5xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl">{index + 1}</Text>
      </TableCell>
      <TableCell className="w-1/5">
        <Text className="text-center text-3xl text-foreground sm:text-4xl md:text-5xl lg:text-6xl">{name}</Text>
      </TableCell>
      <TableCell className="w-2/5">
        <Collection collectionCategory={collection} />
      </TableCell>
      <TableCell className="w-1/5">
        <Turns turns={turns} />
      </TableCell>
    </TableRow>
  );
}
