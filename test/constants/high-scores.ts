// types
import type { HighScores } from "@/types/shared";

// The initial fallback for high scores
export const INIT_HIGH_SCORES: HighScores = {
  easy: [
    // Easy = 3x4 cards = 12 cards = 6 pairs (the best turns = 6)
    // Average trying ratio = 4 tries per pair
    // Reference worst turns = 6 * 4 = 24 turns
    { name: "AAA", turns: 1 * 24, collection: "default" },
    { name: "AAA", turns: 2 * 24, collection: "default" },
    { name: "AAA", turns: 3 * 24, collection: "default" },
    { name: "AAA", turns: 4 * 24, collection: "default" },
    { name: "AAA", turns: 5 * 24, collection: "default" },
    { name: "AAA", turns: 6 * 24, collection: "default" },
    { name: "AAA", turns: 7 * 24, collection: "default" },
    { name: "AAA", turns: 8 * 24, collection: "default" },
    { name: "AAA", turns: 9 * 24, collection: "default" },
    { name: "AAA", turns: 10 * 24, collection: "default" },
  ],
  medium: [
    // Medium = 4x5 cards = 20 cards = 10 pairs (the best turns = 10)
    // Average trying ratio = 5 tries per pair
    // Reference worst turns = 10 * 5 = 50 turns
    { name: "AAA", turns: 1 * 50, collection: "default" },
    { name: "AAA", turns: 2 * 50, collection: "default" },
    { name: "AAA", turns: 3 * 50, collection: "default" },
    { name: "AAA", turns: 4 * 50, collection: "default" },
    { name: "AAA", turns: 5 * 50, collection: "default" },
    { name: "AAA", turns: 6 * 50, collection: "default" },
    { name: "AAA", turns: 7 * 50, collection: "default" },
    { name: "AAA", turns: 8 * 50, collection: "default" },
    { name: "AAA", turns: 9 * 50, collection: "default" },
    { name: "AAA", turns: 10 * 50, collection: "default" },
  ],
  hard: [
    // Hard = 5x6 cards = 30 cards = 15 pairs (the best turns = 15)
    // Average trying ratio = 6 tries per pair
    // Reference worst turns = 15 * 6 = 90 turns
    { name: "AAA", turns: 1 * 90, collection: "default" },
    { name: "AAA", turns: 2 * 90, collection: "default" },
    { name: "AAA", turns: 3 * 90, collection: "default" },
    { name: "AAA", turns: 4 * 90, collection: "default" },
    { name: "AAA", turns: 5 * 90, collection: "default" },
    { name: "AAA", turns: 6 * 90, collection: "default" },
    { name: "AAA", turns: 7 * 90, collection: "default" },
    { name: "AAA", turns: 8 * 90, collection: "default" },
    { name: "AAA", turns: 9 * 90, collection: "default" },
    { name: "AAA", turns: 10 * 90, collection: "default" },
  ],
} as const;
