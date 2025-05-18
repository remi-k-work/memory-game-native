// other libraries
import { createStore } from "zustand/vanilla";
import { shuffleCards } from "./cards";

// types
import type { Card } from "@/types/shared";

export interface GameState {
  cards: Card[];
  collection: "default" | string;
  difficulty: "easy" | "medium" | "hard";
  turns: number;
  choiceOne?: Card;
  choiceTwo?: Card;
  prevChoice?: Card;
}

interface GameActions {
  chosenaCard: (choice: Card) => void;
  chosenaPair: () => void;
  shuffleCards: (cols: number, rows: number, cards?: Card[]) => void;
  resetGame: () => void;
}

interface GameDerived {
  getCardsWithFlipped: (choice: Card) => Card[];
  getCardsWtihUnFlippedPair: (choiceOne: Card, choiceTwo: Card) => Card[];
  isGameOver: () => boolean;
}

export type GameStore = GameState & GameActions & GameDerived;
export type GameStoreApi = ReturnType<typeof createGameStore>;

export const createGameStore = (initState?: GameState) => {
  const DEFAULT_STATE: GameState = {
    cards: shuffleCards(3, 4),
    collection: "default",
    difficulty: "easy",
    turns: 0,
    choiceOne: undefined,
    choiceTwo: undefined,
  };

  return createStore<GameStore>()((set, get) => ({
    ...DEFAULT_STATE,
    ...initState,

    // Player has chosen a card
    chosenaCard: (choice) =>
      set((state) => {
        // Get the state, state-derived functions, and selectors we need
        const { choiceOne, choiceTwo, getCardsWithFlipped } = state;

        // Do we have a pair already selected?
        const hasPairSelected = !!choiceOne && !!choiceTwo;

        // Prevent interaction if a pair is already selected or the card is already flipped
        if (hasPairSelected || choice.isFlipped) return state;

        // We require two choices in order to compare cards, establish and save either the first or second one, and flip each card
        if (state.choiceOne) return { cards: getCardsWithFlipped(choice), choiceTwo: choice };
        else return { cards: getCardsWithFlipped(choice), choiceOne: choice };
      }),

    // Player has chosen a pair
    chosenaPair: () =>
      set((state) => {
        // Get the state, state-derived functions, and selectors we need
        const { choiceOne, choiceTwo, getCardsWtihUnFlippedPair } = state;

        // The pair has already been selected, but do we have a match?
        const isMatch = choiceOne?.pairId === choiceTwo?.pairId;

        if (isMatch) {
          // Yes, start a new turn and leave the cards flipped (revealing the match)
          return { turns: state.turns + 1, choiceOne: undefined, choiceTwo: undefined };
        } else {
          // No, start a new turn and unflip the previously flipped cards (no match)
          return { cards: getCardsWtihUnFlippedPair(choiceOne!, choiceTwo!), turns: state.turns + 1, choiceOne: undefined, choiceTwo: undefined };
        }
      }),

    // Shuffle cards
    shuffleCards: (cols, rows, cards) => set(() => ({ cards: shuffleCards(cols, rows, cards), turns: 0, choiceOne: undefined, choiceTwo: undefined })),

    // Reset the game
    resetGame: () => set(() => ({ ...DEFAULT_STATE })),

    // *** State-derived functions and selectors ***

    // Get cards with flipped
    getCardsWithFlipped: (choice) => {
      const { cards } = get();
      return cards.map((card) => (card.uniqueId === choice.uniqueId ? { ...card, isFlipped: true } : card));
    },

    // Get cards with unflipped pair
    getCardsWtihUnFlippedPair: (choiceOne, choiceTwo) => {
      const { cards } = get();
      return cards.map((card) => (card.uniqueId === choiceOne.uniqueId || card.uniqueId === choiceTwo.uniqueId ? { ...card, isFlipped: false } : card));
    },

    // Is the game over?
    isGameOver: () => {
      const { cards } = get();
      return cards.every((card) => card.isFlipped);
    },
  }));
};
