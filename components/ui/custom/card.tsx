// react native
import { Text, type TextProps, View, type ViewProps } from "react-native";

// other libraries
import { cn } from "@/lib/utils";

function Card({ className, ...props }: ViewProps) {
  return <View className={cn("w-[98%] rounded-lg border border-border bg-card shadow-sm shadow-foreground/10", className)} {...props} />;
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn("mx-1 my-3 gap-3", className)} {...props} />;
}

function CardTitle({ className, ...props }: ViewProps) {
  return <View className={cn("flex-row flex-wrap justify-center gap-1", className)} {...props} />;
}

function CardDescription({ className, ...props }: TextProps) {
  return <Text className={cn("text-center text-xl text-muted-foreground", className)} {...props} />;
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn("items-center gap-6 rounded-lg bg-muted px-0 py-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: ViewProps) {
  return <View className={cn("items-center justify-center gap-4 p-6", className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
