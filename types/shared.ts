// react native
import { type ImageSourcePropType } from "react-native";

// types
export interface Card {
  uniqueId?: string;
  pairId: string;
  imageP: ImageSourcePropType;
  imageL: ImageSourcePropType;
  isFlipped: boolean;
}

export interface Collection {
  category: CollectionCategory;
  previewP: ImageSourcePropType;
  previewL: ImageSourcePropType;
}

export type Difficulty = "easy" | "medium" | "hard";

export type CollectionCategory = "default" | string;

export type Orientation = "all" | "horizontal" | "vertical";

export type ImageType = "photo" | "illustration";

export interface HighScore {
  name: string;
  turns: number;
  collection: CollectionCategory;
}

export type HighScores = Record<Difficulty, HighScore[]>;
