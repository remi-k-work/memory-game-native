// react native
import { type ImageSourcePropType } from "react-native";

// other libraries
import { generatePixabayUrl, generateRandomPageNumber, getPixabayTotalHits } from "./helpers";

// types
import type { CollectionCategory, ImageType, Orientation } from "@/types/shared";

// Get a batch of 28 random images for a specific orientation and collection category
export async function fetchRandomImageUrls(
  imageType: ImageType,
  orientation: Orientation,
  collectionCategory: CollectionCategory,
): Promise<ImageSourcePropType[]> {
  // Unfortunately, we must use Pixabay's API twice, the first fetch to obtain the overall number of hits
  let pixabayUrl = generatePixabayUrl(imageType, orientation, collectionCategory, "true");
  let totalHits = await getPixabayTotalHits(pixabayUrl);

  // We need to be able to retrieve at least 28 images
  if (totalHits < 28) {
    // We cannot retrieve at least 28 images; try to be a bit more lenient
    pixabayUrl = generatePixabayUrl(imageType, orientation, collectionCategory);
    totalHits = await getPixabayTotalHits(pixabayUrl);

    // We really need to be able to retrieve at least 28 images - this time throw an error
    if (totalHits < 28) throw new Error("We need to be able to retrieve at least 28 images!");
  }

  // We can generate a random page number now that we know the overall number of hits
  const randomPageNumber = generateRandomPageNumber(totalHits, 28);

  // Now we send that page number to the API in order to retrieve a different group of images each time
  pixabayUrl.searchParams.append("page", String(randomPageNumber));

  // The second fetch is to get the list of images and their URLs; we need all 28 of them
  const response = await fetch(pixabayUrl);
  if (!response.ok) throw new Error(await response.text());

  const hits = await response.json();
  const imageUrls: ImageSourcePropType[] = [];
  for (const hit of hits.hits) imageUrls.push({ uri: hit.largeImageURL });

  return imageUrls;
}
