// react native
import { Image } from "react-native";

// types
import type { Card } from "@/types/shared";

// other libraries
import useOrientation from "@/hooks/useOrientation";

interface FlippedSideProps {
  card: Card;
  onImageLoading: () => void;
  onImageLoaded: () => void;
}

export default function FlippedSide({ card: { imageP, imageL }, onImageLoading, onImageLoaded }: FlippedSideProps) {
  // Determine the current screen orientation and size
  const { isPortrait } = useOrientation();

  return (
    <Image
      source={isPortrait ? imageP : imageL}
      resizeMode="contain"
      className="h-full w-full bg-muted"
      onLoadStart={onImageLoading}
      onLoadEnd={onImageLoaded}
    />
  );
}
