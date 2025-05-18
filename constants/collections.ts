// types
import type { Collection } from "@/types/shared";

// All accessible collections with their previews
export const COLLECTIONS: Collection[] = [
  {
    category: "default",
    previewP: require("@/assets/collections/preview/default-p.png"),
    previewL: require("@/assets/collections/preview/default-l.png"),
  },
  {
    category: "backgrounds",
    previewP: require("@/assets/collections/preview/backgrounds-p.jpg"),
    previewL: require("@/assets/collections/preview/backgrounds-l.jpg"),
  },
  {
    category: "fashion",
    previewP: require("@/assets/collections/preview/fashion-p.jpg"),
    previewL: require("@/assets/collections/preview/fashion-l.jpg"),
  },
  {
    category: "nature",
    previewP: require("@/assets/collections/preview/nature-p.jpg"),
    previewL: require("@/assets/collections/preview/nature-l.jpg"),
  },
  {
    category: "science",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "education",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "feelings",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "health",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "people",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "religion",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "places",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "animals",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "industry",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "computer",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "food",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "sports",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "transportation",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "travel",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "buildings",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "business",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
  {
    category: "music",
    previewP: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
    previewL: { uri: "https://images.unsplash.com/photo-1556740749-887f6717d7e4" },
  },
] as const;
