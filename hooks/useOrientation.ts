// react native
import { useWindowDimensions } from "react-native";

// Determine the current screen orientation and size
export default function useOrientation() {
  const { height, width } = useWindowDimensions();
  const isPortrait = height >= width;

  return { height, width, isPortrait };
}
