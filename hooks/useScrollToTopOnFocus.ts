// react
import { useCallback, useRef } from "react";

// react native
import { ScrollView } from "react-native";

// expo
import { useFocusEffect } from "expo-router";

// Automatically scroll to the top when the screen is focused
export function useScrollToTopOnFocus<T extends ScrollView>() {
  // To be able to scroll to the top
  const scrollViewRef = useRef<T>(null);

  // When the screen is focused, scroll to the top
  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, []),
  );

  return scrollViewRef;
}
