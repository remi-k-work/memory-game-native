// expo
import { randomUUID } from "expo-crypto";

// types
import type { Card } from "@/types/shared";

// constants
import { INIT_CARDS } from "@/constants/cards";

export function shuffleCards(cols: number, rows: number, cards: Card[] = INIT_CARDS): Card[] {
  // Create a copy of the original array to avoid modifying it directly
  let shuffledCards = [...cards];
  const selectedCards: Card[] = [];

  // Use a Fisher-Yates (Knuth) shuffle algorithm to randomize the array
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  // Take the first 'count' number of cards from the shuffled array
  selectedCards.push(...shuffledCards.slice(0, (cols * rows) / 2));

  // Increase the number of cards per card to two (original plus matching) and assign a unique id to each
  shuffledCards = [...selectedCards, ...selectedCards].map((card) => ({ ...card, uniqueId: randomUUID() }));

  // Randomize the array's element order, resulting in a shuffled array
  shuffledCards.sort(() => Math.random() - 0.5);

  return shuffledCards;
}
