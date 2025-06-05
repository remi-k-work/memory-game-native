// other libraries
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { fetchRandomCards } from "@/stores/cards";
import { useGameStore } from "@/stores/gameProvider";
import { useQuery } from "@tanstack/react-query";

// constants
import { INIT_CARDS } from "@/constants/cards";

// Fetch a random card set for the specified collection category
export default function useFetchRandomCards() {
  // Get the state and actions we need from the game store
  const collection = useGameStore((state) => state.collection);
  const showIllustrations = useGameStore((state) => state.showIllustrations);
  const hasFetchedCards = useGameStore((state) => state.hasFetchedCards);

  // Fetch a random card set for the specified collection category
  const {
    data: cards,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["randomCards", collection, showIllustrations],
    queryFn: async ({ signal }) => {
      // Do not try to fetch the initial fallback card set, which is the default one
      if (collection !== "default") return await fetchRandomCards(showIllustrations ? "illustration" : "photo", collection, signal);
      return INIT_CARDS;
    },

    // Keep the data even if the query becomes inactive, good for initial fallback
    staleTime: Infinity,
  });

  useDidUpdateEffect(() => {
    // A new set of cards has been fetched
    if (isSuccess && cards) hasFetchedCards(cards);
  }, [isSuccess, cards]);

  useDidUpdateEffect(() => {
    // There was an error fetching a random card set; log it
    if (isError && error) {
      console.error("Error fetching a random card set:", error);

      // Fall back to the initial fallback card set
      hasFetchedCards(INIT_CARDS);
    }
  }, [isError, error]);

  return { isLoading };
}
