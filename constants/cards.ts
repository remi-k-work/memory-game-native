// expo
import { randomUUID } from "expo-crypto";

// types
import type { Card } from "@/types/shared";

// The initial fallback card set to choose from (with 28 images)
export const INIT_CARDS: Card[] = [
  { pairId: randomUUID(), image: require("@/assets/images/animals/animal-47047_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/baby-elephant-3526681_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/bee-24633_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/bird-34663_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/bird-295026_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/butterfly-2028591_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/cat-46676_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/chicken-159496_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/crocodile-1458819_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/dog-48490_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/dog-3542195_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/dolphin-41436_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/dragon-310237_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/fish-33712_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/frog-30524_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/giraffe-48393_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/hamster_5389261.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/horse-1297225_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/koala_3069172.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/ladybug-156624_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/lamb-1388937_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/parrot-1417286_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/penguin-158551_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/rat-152162_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/tiger-160601_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/tiger-161802_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/wolf-30695_640.png"), isFlipped: false },
  { pairId: randomUUID(), image: require("@/assets/images/animals/zebra-152604_640.png"), isFlipped: false },
] as const;
