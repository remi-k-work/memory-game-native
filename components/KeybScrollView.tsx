// react
import { ReactNode } from "react";

// react native
import { ScrollView, View } from "react-native";

// other libraries
import { useScrollToTopOnFocus } from "@/hooks/useScrollToTopOnFocus";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// types
interface KeybScrollViewProps {
  children: ReactNode;
}

export default function KeybScrollView({ children }: KeybScrollViewProps) {
  // Automatically scroll to the top when the screen is focused
  const scrollViewRef = useScrollToTopOnFocus<ScrollView>();

  return (
    <View className="mt-safe flex-1 items-center justify-center">
      <KeyboardAwareScrollView ref={scrollViewRef} contentContainerClassName="items-center" className="w-full max-w-4xl grow-0">
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
}
