// react
import { useState } from "react";

// react native
import { StyleSheet } from "react-native";

// other libraries
import useAnimCrossedOutEntry from "@/features/animations/hooks/useAnimCrossedOutEntry";
import Animated from "react-native-reanimated";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { LayoutRectangle } from "react-native";

export default function CrossedOutEntry() {
  // Store the cell size, which is set once the layout is calculated
  const [cellSize, setCellSize] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  // Use the already encapsulated animation logic for this component
  const { animStyleCrossOutLine1, animStyleCrossOutLine2 } = useAnimCrossedOutEntry(cellSize);

  return (
    <TableCell className="pointer-events-none" style={StyleSheet.absoluteFill} onLayout={(ev) => setCellSize(ev.nativeEvent.layout)}>
      <Animated.View className="absolute h-3 rounded-lg border-2 border-red-800 bg-red-700" style={animStyleCrossOutLine1} />
      <Animated.View className="absolute right-0 h-3 rounded-lg border-2 border-red-800 bg-red-700" style={animStyleCrossOutLine2} />
    </TableCell>
  );
}
