// other libraries
import useColorScheme from "@/hooks/useColorScheme";
import useOrientation from "@/hooks/useOrientation";
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useScrollViewOffset, withTiming } from "react-native-reanimated";

// types
import type { AnimatedRef, SharedValue } from "react-native-reanimated";

// constants
import { COLORS } from "@/constants/colors";

const SLIDE_SIZE_P = 192;
const SLIDE_SIZE_L = 320;

// Encapsulate the animation logic in a custom hook
export default function useAnimCollectionSlider(scrollViewRef: AnimatedRef<Animated.ScrollView>) {
  // Establish the slide dimensions according to the screen orientation
  const { slideWidth, slideHeight } = useSlideDimensions();

  // Return all that is needed to trigger the animation
  return { slideWidth, slideHeight, scrollOffset: useScrollViewOffset(scrollViewRef) };
}

// Encapsulate the animation logic in a custom hook
export function useAnimSlide(scrollOffset: SharedValue<number>, slideIndex: number) {
  // Establish the slide dimensions according to the screen orientation
  const { isPortrait, slideWidth, slideHeight } = useSlideDimensions();

  const animStyleSlide = useAnimatedStyle(() => {
    // Which "slide index" the user is currently looking at?
    const activeIndex = scrollOffset.value / slideWidth;

    return {
      transform: [
        // Counteract the native scroll and then apply a calculated, interpolated offset
        {
          translateX:
            scrollOffset.value +
            interpolate(
              activeIndex,
              [slideIndex - 2, slideIndex - 1, slideIndex, slideIndex + 1],
              [slideWidth / 2, slideWidth / 4, 0, -slideWidth],
              Extrapolation.CLAMP,
            ),
        },

        // Apply a scale transform that makes distant slides smaller
        { scale: interpolate(activeIndex, [slideIndex - 2, slideIndex - 1, slideIndex, slideIndex + 1], [0.8, 0.9, 1, 1], Extrapolation.CLAMP) },
      ],

      // Slides that appear earlier in the list are always visually on top of the slides that come after them (z-index)
      zIndex: -slideIndex,
    };
  });

  // Return all that is needed to trigger the animation
  return { isPortrait, slideWidth, slideHeight, animStyleSlide };
}

// Encapsulate the animation logic in a custom hook
export function useAnimDot(scrollOffset: SharedValue<number>, slideIndex: number) {
  // Establish the slide dimensions according to the screen orientation
  const { slideWidth, slideHeight } = useSlideDimensions();

  // Get the current user's desired color scheme and extract the appropriate colors
  const { colorScheme } = useColorScheme();
  const { primary, secondary } = COLORS[colorScheme];

  const animStyleDot = useAnimatedStyle(() => {
    // Which "slide index" the user is currently looking at?
    const activeIndex = scrollOffset.value / slideWidth;

    // Animate the dot to indicate which slide the user is currently looking at
    return {
      backgroundColor: withTiming(interpolateColor(slideIndex === activeIndex ? 1 : 0, [1, 0], [primary, secondary])),
      width: withTiming(slideIndex === activeIndex ? slideWidth * 0.08 : slideWidth * 0.04),
      height: slideHeight * 0.05,
    };
  });

  // Return all that is needed to trigger the animation
  return { animStyleDot };
}

// Helper hook to establish the slide dimensions according to the screen orientation
function useSlideDimensions() {
  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Establish the width and height of each slide based on the screen orientation
  const slideWidth = isPortrait ? SLIDE_SIZE_P : SLIDE_SIZE_L;
  const slideHeight = isPortrait ? SLIDE_SIZE_L : SLIDE_SIZE_P;

  return { isPortrait, slideWidth, slideHeight };
}
