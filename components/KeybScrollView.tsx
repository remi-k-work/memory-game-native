// react
import { ReactNode } from "react";

// react native
import { View } from "react-native";

// other libraries
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// types
interface KeybScrollViewProps {
  children: ReactNode;
}

export default function KeybScrollView({ children }: KeybScrollViewProps) {
  return (
    <View className="mt-safe flex-1 items-center justify-center">
      <KeyboardAwareScrollView contentContainerClassName="items-center" className="w-full max-w-4xl grow-0" bottomOffset={86}>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
}
