// react native
import { View } from "react-native";

// other libraries
import { cn } from "@/lib/utils";
import Animated from "react-native-reanimated";

// types
import type { ViewProps } from "react-native";

function Table({ className, ...props }: ViewProps) {
  return <View role="table" className={cn("flex-1", className)} {...props} />;
}

function TableHeader({ className, ...props }: ViewProps) {
  return <View role="rowheader" className={className} {...props} />;
}

function TableBody({ className, ...props }: ViewProps) {
  return <View role="rowgroup" className={cn("flex-1", className)} {...props} />;
}

function TableFooter({ className, ...props }: ViewProps) {
  return <View role="rowgroup" className={cn("bg-muted/50", className)} {...props} />;
}

function TableRow({ className, ...props }: ViewProps) {
  return <View role="row" className={cn("flex-row border-b border-border", className)} {...props} />;
}

function TableHead({ className, ...props }: ViewProps) {
  return <View role="columnheader" className={cn("py-3", className)} {...props} />;
}

function TableCell({ className, ...props }: ViewProps) {
  return <View role="cell" className={cn("py-3", className)} {...props} />;
}

// Create animated versions of some of the above components that we might need
const AnimatedTable = Animated.createAnimatedComponent(Table);
const AnimatedTableRow = Animated.createAnimatedComponent(TableRow);

export { AnimatedTable, AnimatedTableRow, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };
