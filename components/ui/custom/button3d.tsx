// react native
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

// other libraries
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// types
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";

// constants
const SHADOW_HEIGHT = 6;

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
}

// Defines the base styles and variants for the button container
const buttonVariants = cva("items-center justify-center rounded-xl", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
      outline: "border border-input bg-background",
      secondary: "bg-secondary",
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

// Defines the text styles that correspond to each button variant
const buttonTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
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

// The main button component, now simplified to handle only the content logic
export default function Button({ variant, size, icon, isLoading = false, className, children, ...props }: ButtonProps) {
  // Only render content side by side if the button is in a loading mode or has an icon but is not an icon button simultaneously
  const containerClassName = cn({ "flex-row gap-2": (isLoading || icon) && size !== "icon" }, className);

  return (
    <ButtonContainer variant={variant} size={size} isLoading={isLoading} className={containerClassName} {...props}>
      {isLoading ? (
        // If loading, show a spinner and, if applicable, the button text
        <>
          <ActivityIndicator size="large" className={cn(size === "icon" ? "size-12" : "size-9", "text-foreground")} />
          {size !== "icon" && <Text className={cn("line-clamp-1 shrink", buttonTextVariants({ variant, size }))}>{children}</Text>}
        </>
      ) : (
        // If not loading, show the icon and/or text content
        <>
          {icon && icon}
          {size !== "icon" ? <Text className={cn("line-clamp-1 shrink", buttonTextVariants({ variant, size }))}>{children}</Text> : children}
        </>
      )}
    </ButtonContainer>
  );
}

// A container component that encapsulates the button's pressable shell and 3d effect
function ButtonContainer({ variant, size, className, isLoading, children, ...props }: ButtonProps) {
  // Disable the button if it is already disabled or in the loading mode
  const isDisabled = props.disabled || isLoading;

  // Create a shared value to track the button's pressed state
  const isPressed = useSharedValue(false);

  // Animate the button to smoothly transition between pressed and unpressed states
  const animStyle = useAnimatedStyle(() => ({ transform: [{ translateY: withTiming(interpolate(Number(isPressed.value), [0, 1], [0, SHADOW_HEIGHT])) }] }));

  return (
    <Pressable
      role="button"
      hitSlop={16}
      disabled={isDisabled}
      className={cn("pointer-events-box-only mb-4", isDisabled && "opacity-50")}
      // When the user presses down, trigger the animation
      onPressIn={() => (isPressed.value = true)}
      // When the user releases the press, reverse the animation
      onPressOut={() => (isPressed.value = false)}
      {...props}
    >
      {/* This view creates the "shadow" or 3d bottom edge of the button */}
      <View className={cn("opacity-80", buttonVariants({ variant, size }))} style={[{ transform: [{ translateY: SHADOW_HEIGHT }] }, StyleSheet.absoluteFill]} />

      {/* This is the main, visible part of the button where content is rendered */}
      <Animated.View className={cn(buttonVariants({ variant, size, className }))} style={animStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
