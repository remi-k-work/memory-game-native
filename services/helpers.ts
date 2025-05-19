// constants
import { PIXABBAY_API_URL } from "@/constants/pixabay";

// Generate a suitable URL for the Pixabay API request
export function generatePixabayUrl(category: string) {
  const pixabayUrl = new URL(PIXABBAY_API_URL);

  pixabayUrl.searchParams.append("key", process.env.EXPO_PUBLIC_PIXABAY_KEY!);
  // pixabayUrl.searchParams.append("q", "animals");
  pixabayUrl.searchParams.append("image_type", "photo");
  pixabayUrl.searchParams.append("category", category);
  pixabayUrl.searchParams.append("per_page", "28");

  return pixabayUrl;
}

// Get the number of images accessible through Pixabay's API
export async function getPixabayTotalHits(pixabayUrl: URL) {
  const response = await fetch(pixabayUrl);
  if (!response.ok) throw new Error(await response.text());

  const hits = await response.json();
  return hits.totalHits;
}

// The response headers tell you everything you need to know about your current rate limit status
export function getPixabayRateLimitStatus(response: Response) {
  const rateLimitHeaders = response.headers;

  const rateLimit = {
    limit: Number(rateLimitHeaders.get("X-RateLimit-Limit")),
    remaining: Number(rateLimitHeaders.get("X-RateLimit-Remaining")),
    reset: Number(rateLimitHeaders.get("X-RateLimit-Reset")),
  };

  return rateLimit;
}

// Get the image from the specified URL and save the result as a blob
export async function fetchImageAsBlob(imageUrl: URL) {
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(await response.text());

  const imageBlob = await response.blob();
  return imageBlob;
}
