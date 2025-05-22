// other libraries
import { createStore } from "zustand/vanilla";
import { createShuffledCardPairs, replaceCardImages } from "./cards";

// types
import type { Card, CollectionCategory, Difficulty } from "@/types/shared";

// constants
import { INIT_CARDS } from "@/constants/cards";

export interface GameState {
  fetchedCards: Card[];
  currentCards: Card[];
  collection: CollectionCategory;
  difficulty: Difficulty;
  showIllustrations: boolean;
  turns: number;
  choiceOne?: Card;
  choiceTwo?: Card;
}

interface GameActions {
  chosenaCard: (choice: Card) => void;
  chosenaPair: () => void;
  changedDifficulty: (difficulty: Difficulty) => void;
  changedCollection: (collection: CollectionCategory) => void;
  switchedIllustrations: () => void;
  startedaNewGame: () => void;
  hasFetchedCards: (fetchedCards: Card[]) => void;
}

interface GameDerived {
  getCardsWithFlipped: (choice: Card) => Card[];
  getCardsWtihUnFlippedPair: (choiceOne: Card, choiceTwo: Card) => Card[];
  isGameInProgress: () => boolean;
  isGameOver: () => boolean;
}

export type GameStore = GameState & GameActions & GameDerived;
export type GameStoreApi = ReturnType<typeof createGameStore>;

export const createGameStore = (initState?: GameState) => {
  const DEFAULT_STATE: GameState = {
    fetchedCards: INIT_CARDS,
    currentCards: createShuffledCardPairs("easy", INIT_CARDS),
    collection: "default",
    difficulty: "easy",
    showIllustrations: false,
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
        if (state.choiceOne) return { currentCards: getCardsWithFlipped(choice), choiceTwo: choice };
        else return { currentCards: getCardsWithFlipped(choice), choiceOne: choice };
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
          return { currentCards: getCardsWtihUnFlippedPair(choiceOne!, choiceTwo!), turns: state.turns + 1, choiceOne: undefined, choiceTwo: undefined };
        }
      }),

    // Player has changed the difficulty
    changedDifficulty: (difficulty) =>
      set((state) => ({
        currentCards: createShuffledCardPairs(difficulty, state.fetchedCards),
        difficulty,
        turns: 0,
        choiceOne: undefined,
        choiceTwo: undefined,
      })),

    // Player has changed the collection
    changedCollection: (collection) => set(() => ({ collection })),

    // Player has switched illustrations
    switchedIllustrations: () => set((state) => ({ showIllustrations: !state.showIllustrations })),

    // Player has started a new game
    startedaNewGame: () =>
      set((state) => ({ currentCards: createShuffledCardPairs(state.difficulty, state.fetchedCards), turns: 0, choiceOne: undefined, choiceTwo: undefined })),

    // A new set of cards has been fetched
    hasFetchedCards: (fetchedCards) =>
      set((state) => ({ fetchedCards, currentCards: replaceCardImages(state.currentCards, fetchedCards), choiceOne: undefined, choiceTwo: undefined })),

    // *** State-derived functions and selectors ***

    // Get cards with flipped
    getCardsWithFlipped: (choice) => {
      const { currentCards } = get();
      return currentCards.map((currentCard) => (currentCard.uniqueId === choice.uniqueId ? { ...currentCard, isFlipped: true } : currentCard));
    },

    // Get cards with unflipped pair
    getCardsWtihUnFlippedPair: (choiceOne, choiceTwo) => {
      const { currentCards } = get();
      return currentCards.map((currentCard) =>
        currentCard.uniqueId === choiceOne.uniqueId || currentCard.uniqueId === choiceTwo.uniqueId ? { ...currentCard, isFlipped: false } : currentCard,
      );
    },

    // Is the game in progress?
    isGameInProgress: () => {
      const { turns } = get();
      return turns > 0;
    },

    // Is the game over?
    isGameOver: () => {
      const { currentCards } = get();
      return currentCards.every((currentCard) => currentCard.isFlipped);
    },
  }));
};
