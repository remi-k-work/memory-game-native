// react
import { useMemo, useState } from "react";

// react native
import { StyleSheet } from "react-native";

// other libraries
import Animated from "react-native-reanimated";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { LayoutRectangle } from "react-native";

export default function CrossedOut() {
  // Store the cell size, which is set once the layout is calculated
  const [cellSize, setCellSize] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  const angle = useMemo(() => {
    if (!cellSize.width || !cellSize.height) return "0deg";
    return `${Math.atan(cellSize.height / cellSize.width) * (180 / Math.PI)}deg`;
  }, [cellSize]);

  const crossOutLine1 = useMemo(
    () => ({
      from: { opacity: 0, transform: [{ rotateZ: angle }, { scaleX: 0 }], transformOrigin: "left center" },
      "30%": { opacity: 1 },
      to: { opacity: 1, transform: [{ rotateZ: angle }, { scaleX: 1 }], transformOrigin: "left center" },
    }),
    [angle],
  );

  const crossOutLine2 = useMemo(
    () => ({
      from: { opacity: 0, transform: [{ rotateZ: `-${angle}` }, { scaleX: 0 }], transformOrigin: "right center" },
      "30%": { opacity: 1 },
      to: { opacity: 1, transform: [{ rotateZ: `-${angle}` }, { scaleX: 1 }], transformOrigin: "right center" },
    }),
    [angle],
  );

  return (
    <TableCell className="pointer-events-none overflow-hidden" style={StyleSheet.absoluteFill} onLayout={(ev) => setCellSize(ev.nativeEvent.layout)}>
      <Animated.View
        className="absolute h-3 rounded-lg border-2 border-red-800 bg-red-700"
        style={{
          opacity: 0,
          width: Math.sqrt(cellSize.width ** 2 + cellSize.height ** 2),
          animationName: crossOutLine1,
          animationDuration: "2s",
          animationTimingFunction: "ease-in-out",
          animationFillMode: "forwards",
        }}
      />
      <Animated.View
        className="absolute right-0 h-3 rounded-lg border-2 border-red-800 bg-red-700"
        style={{
          opacity: 0,
          width: Math.sqrt(cellSize.width ** 2 + cellSize.height ** 2),
          animationName: crossOutLine2,
          animationDuration: "2s",
          animationTimingFunction: "ease-in-out",
          animationFillMode: "forwards",
          animationDelay: "1.9s",
        }}
      />
    </TableCell>
  );
}
