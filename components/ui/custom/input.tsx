// react native
import { TextInput } from "react-native";

// other libraries
import { cn } from "@/lib/utils";

// types
import type { ComponentPropsWithRef } from "react";

export default function Input({ className, ...props }: ComponentPropsWithRef<typeof TextInput>) {
  return (
    <TextInput
      className={cn("bg-background p-3 text-lg text-foreground placeholder:text-muted-foreground", props.editable === false && "opacity-50", className)}
      {...props}
    />
  );
}
