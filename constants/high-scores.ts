// types
import type { HighScores } from "@/types/shared";

// The initial fallback for high scores
export const INIT_HIGH_SCORES: HighScores = {
  easy: [
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
  ],
  medium: [
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
  ],
  hard: [
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
    { name: "JOE", turns: 99, collection: "default" },
  ],
} as const;
