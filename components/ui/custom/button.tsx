// react native
import { ActivityIndicator, Pressable, Text } from "react-native";

// other libraries
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// types
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
}

// constants
const buttonVariants = cva("group items-center justify-center rounded-xl", {
  variants: {
    variant: {
      default: "bg-primary active:opacity-90",
      destructive: "bg-destructive active:opacity-90",
      outline: "border border-input bg-background active:bg-accent",
      secondary: "bg-secondary active:opacity-80",
      ghost: "active:bg-accent",
    },
    size: {
      default: "px-6 py-4",
      sm: "px-4 py-2",
      lg: "px-8 py-6",
      icon: "rounded-full p-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground group-active:text-accent-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground group-active:text-accent-foreground",
    },
    size: {
      default: "text-xl",
      sm: "text-lg leading-5",
      lg: "text-2xl leading-7",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function Button({ variant, size, icon, isLoading = false, className, children, ...props }: ButtonProps) {
  if (size === "icon") {
    return isLoading ? (
      <Pressable role="button" disabled className={cn("opacity-50", buttonVariants({ variant, size, className }))} {...props}>
        <ActivityIndicator size="large" className="size-12" />
      </Pressable>
    ) : (
      <Pressable role="button" className={cn(props.disabled && "opacity-50", buttonVariants({ variant, size, className }))} {...props}>
        {children}
      </Pressable>
    );
  }

  return isLoading ? (
    <Pressable role="button" disabled className={cn("flex-row gap-2 opacity-50", buttonVariants({ variant, size, className }))} {...props}>
      <ActivityIndicator size="large" className="size-9" />
      <Text className={cn("line-clamp-1 shrink", buttonTextVariants({ variant, size }))}>{children}</Text>
    </Pressable>
  ) : icon ? (
    <Pressable role="button" className={cn(props.disabled && "opacity-50", "flex-row gap-2", buttonVariants({ variant, size, className }))} {...props}>
      {icon}
      <Text className={cn("line-clamp-1 shrink", buttonTextVariants({ variant, size }))}>{children}</Text>
    </Pressable>
  ) : (
    <Pressable role="button" className={cn(props.disabled && "opacity-50", buttonVariants({ variant, size, className }))} {...props}>
      <Text className={cn("line-clamp-1 shrink", buttonTextVariants({ variant, size }))}>{children}</Text>
    </Pressable>
  );
}
