// expo
import { randomUUID } from "expo-crypto";

// services
import { fetchRandomImageUrls } from "@/services/pixabay";

// types
import type { Card, CollectionCategory } from "@/types/shared";
import type { ImageSourcePropType } from "react-native";

// Generate a shuffled array of card pairs that fits in the defined grid and includes the previously fetched cards at random
export function createShuffledCardPairs(cols: number, rows: number, fetchedCards: Card[]): Card[] {
  // Pick a random subset of the fetched cards (our fetched card set always contains 28 images, which is more than we need)
  const pickedFetchedCards = [...fetchedCards].sort(() => Math.random() - 0.5).slice(0, (cols * rows) / 2);

  // Increase the number of cards per card to two (original plus matching) so that they share the same pair id; also, assign a unique id to each card
  const shuffledCardPairs = [...pickedFetchedCards, ...pickedFetchedCards].map((card) => ({ ...card, uniqueId: randomUUID() }));

  // Randomize the array's element order, resulting in a shuffled array of card pairs
  return shuffledCardPairs.sort(() => Math.random() - 0.5);
}

// Replace the images of the current cards with the images from the fetched card set
export function replaceCardImages(currentCards: Card[], fetchedCards: Card[]): Card[] {
  // Pick a random subset of the fetched cards (our fetched card set always contains 28 images, which is more than we need)
  const pickedFetchedCards = [...fetchedCards].sort(() => Math.random() - 0.5).slice(0, currentCards.length / 2);

  // Retrieve all unique pair ids from the current cards, as each pair's image will be switched
  const uniquePairIds = new Set<string>(currentCards.map((card) => card.pairId));

  // Make a mapping from each unique pair id to the new unique image we are exchanging with
  const pairIdToNewImageMap = new Map<string, { imageP: ImageSourcePropType; imageL: ImageSourcePropType }>();

  let cardIndex = 0;
  for (const pairId of uniquePairIds) {
    const { imageP, imageL } = pickedFetchedCards[cardIndex];
    pairIdToNewImageMap.set(pairId, { imageP, imageL });
    cardIndex++;
  }

  return currentCards.map((card) => ({ ...card, imageP: pairIdToNewImageMap.get(card.pairId)!.imageP, imageL: pairIdToNewImageMap.get(card.pairId)!.imageL }));
}

// Fetch a random card set for the specified collection category
export async function fetchRandomCards(collectionCategory: CollectionCategory): Promise<Card[]> {
  // Generate a batch of 28 random images in portrait and landscape orientations, as well as the chosen collection category
  const imagesP = await fetchRandomImageUrls("vertical", collectionCategory);
  const imagesL = await fetchRandomImageUrls("horizontal", collectionCategory);

  // Create an array of cards from the fetched images
  const fetchedCards: Card[] = [];
  for (let i = 0; i < 28; i++) fetchedCards.push({ pairId: randomUUID(), imageP: imagesP[i], imageL: imagesL[i], isFlipped: false });

  return fetchedCards;
}
