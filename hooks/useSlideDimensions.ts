// other libraries
import useOrientation from "@/hooks/useOrientation";

// constants
const SLIDE_SIZE_P = 192;
const SLIDE_SIZE_L = 320;

// Helper hook to establish the slide dimensions according to the screen orientation
export default function useSlideDimensions() {
  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  // Establish the width and height of each slide based on the screen orientation
  const slideWidth = isPortrait ? SLIDE_SIZE_P : SLIDE_SIZE_L;
  const slideHeight = isPortrait ? SLIDE_SIZE_L : SLIDE_SIZE_P;

  return { isPortrait, slideWidth, slideHeight };
}
