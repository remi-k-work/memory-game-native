// react native
import { type ImageSourcePropType } from "react-native";

// types
export interface Card {
  uniqueId?: string;
  pairId: string;
  image: ImageSourcePropType;
  isFlipped: boolean;
}

export interface Collection {
  category: string;
  previewP: ImageSourcePropType;
  previewL: ImageSourcePropType;
}
