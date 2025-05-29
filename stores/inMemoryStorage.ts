// other libraries
import { StateStorage } from "zustand/middleware";

// A simple in-memory object to simulate storage
const inMemoryStore: Record<string, string> = {};

export default function inMemoryStorage(): StateStorage {
  return {
    getItem: async (name: string): Promise<string | null> => {
      // simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const value = inMemoryStore[name] ?? null;
      console.log(`[InMemoryStorage] getItem: ${value}`);
      return value;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      // simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      inMemoryStore[name] = value;
      console.log(`[InMemoryStorage] setItem: ${value}`);
    },
    removeItem: async (name: string): Promise<void> => {
      // simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      delete inMemoryStore[name];
      console.log(`[InMemoryStorage] removeItem '${name}'`);
    },
  };
}
