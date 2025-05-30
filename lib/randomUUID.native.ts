// expo
import { randomUUID as expoRandomUUID } from "expo-crypto";

// Generate a random UUID
export default function randomUUID() {
  // For react native, use expo-crypto
  return expoRandomUUID();
}
