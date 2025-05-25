// react
import { ReactNode } from "react";

// react native
import { ScrollView, View } from "react-native";

// types
interface BodyScrollViewProps {
  children: ReactNode;
}

export default function BodyScrollView({ children }: BodyScrollViewProps) {
  return (
    <View className="mt-safe flex-1 items-center justify-center">
      <ScrollView contentContainerClassName="items-center" className="w-full max-w-lg grow-0">
        {children}
      </ScrollView>
    </View>
  );
}
