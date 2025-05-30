// other libraries
import randomUUID from "@/lib/randomUUID";

// types
import type { Card } from "@/types/shared";

// The initial fallback card set to choose from (with 28 images)
export const INIT_CARDS: Card[] = [
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/01-p.webp"),
    imageL: require("@/assets/collections/default/01-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/02-p.webp"),
    imageL: require("@/assets/collections/default/02-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/03-p.webp"),
    imageL: require("@/assets/collections/default/03-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/04-p.webp"),
    imageL: require("@/assets/collections/default/04-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/05-p.webp"),
    imageL: require("@/assets/collections/default/05-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/06-p.webp"),
    imageL: require("@/assets/collections/default/06-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/07-p.webp"),
    imageL: require("@/assets/collections/default/07-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/08-p.webp"),
    imageL: require("@/assets/collections/default/08-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/09-p.webp"),
    imageL: require("@/assets/collections/default/09-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/10-p.webp"),
    imageL: require("@/assets/collections/default/10-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/11-p.webp"),
    imageL: require("@/assets/collections/default/11-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/12-p.webp"),
    imageL: require("@/assets/collections/default/12-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/13-p.webp"),
    imageL: require("@/assets/collections/default/13-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/14-p.webp"),
    imageL: require("@/assets/collections/default/14-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/15-p.webp"),
    imageL: require("@/assets/collections/default/15-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/16-p.webp"),
    imageL: require("@/assets/collections/default/16-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/17-p.webp"),
    imageL: require("@/assets/collections/default/17-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/18-p.webp"),
    imageL: require("@/assets/collections/default/18-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/19-p.webp"),
    imageL: require("@/assets/collections/default/19-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/20-p.webp"),
    imageL: require("@/assets/collections/default/20-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/21-p.webp"),
    imageL: require("@/assets/collections/default/21-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/22-p.webp"),
    imageL: require("@/assets/collections/default/22-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/23-p.webp"),
    imageL: require("@/assets/collections/default/23-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/24-p.webp"),
    imageL: require("@/assets/collections/default/24-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/25-p.webp"),
    imageL: require("@/assets/collections/default/25-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/26-p.webp"),
    imageL: require("@/assets/collections/default/26-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/27-p.webp"),
    imageL: require("@/assets/collections/default/27-l.webp"),
    isFlipped: false,
  },
  {
    pairId: randomUUID(),
    imageP: require("@/assets/collections/default/28-p.webp"),
    imageL: require("@/assets/collections/default/28-l.webp"),
    isFlipped: false,
  },
] as const;
