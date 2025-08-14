// react
import { useLayoutEffect } from "react";

// react native
import { ScrollView, View } from "react-native";

// other libraries
import { useScrollToTopOnFocus } from "@/hooks/useScrollToTopOnFocus";

// types
import type { ReactNode, RefObject } from "react";

interface BodyScrollViewProps {
  targetChildRefs?: RefObject<(View | null)[]>;
  scrollToIndex?: number;
  children: ReactNode;
}

export default function BodyScrollView({ targetChildRefs, scrollToIndex, children }: BodyScrollViewProps) {
  // Automatically scroll to the top when the screen is focused
  const scrollViewRef = useScrollToTopOnFocus<ScrollView>();

  // Whenever the index for scrolling changes, scroll to the corresponding target child
  useLayoutEffect(() => {
    // If there are no target children refs provided or the index is undefined, do nothing
    if (!targetChildRefs || scrollToIndex === undefined) return;

    const scrollView = scrollViewRef.current;
    const targetChild = targetChildRefs.current[scrollToIndex];
    if (!scrollView || !targetChild) return;

    // Measure the layout of the target child relative to the scroll view
    targetChild.measureLayout(scrollView as any, (_, y) => {
      // Y is now the correct offset within the scroll view's content area
      scrollView.scrollTo({ y });
    });
  }, [targetChildRefs, scrollToIndex]);

  return (
    <View className="mt-safe flex-1 items-center justify-center">
      <ScrollView ref={scrollViewRef} contentContainerClassName="items-center" className="w-full max-w-4xl grow-0">
        {children}
      </ScrollView>
    </View>
  );
}
