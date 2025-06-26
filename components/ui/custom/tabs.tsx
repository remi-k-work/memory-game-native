// other libraries
import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@rn-primitives/tabs";
import Animated from "react-native-reanimated";

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }: TabsPrimitive.ListProps) {
  return <TabsPrimitive.List className={cn("h-28 flex-row items-end justify-center overflow-hidden p-0", className)} {...props} />;
}

function TabsTrigger({ className, ...props }: TabsPrimitive.TriggerProps) {
  return <TabsPrimitive.Trigger className={cn("h-16 items-center justify-center rounded-t-xl", props.disabled && "opacity-50", className)} {...props} />;
}

function TabsContent({ className, ...props }: TabsPrimitive.ContentProps) {
  return <TabsPrimitive.Content className={cn("overflow-hidden rounded-lg", className)} {...props} />;
}

// Create animated versions of some of the above components that we might need
const AnimatedTabsTrigger = Animated.createAnimatedComponent(TabsTrigger);

export { AnimatedTabsTrigger, Tabs, TabsContent, TabsList, TabsTrigger };
