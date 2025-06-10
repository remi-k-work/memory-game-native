// react native
import { View, type ViewProps } from "react-native";

// other libraries
import { cn } from "~/lib/utils";

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

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow };
