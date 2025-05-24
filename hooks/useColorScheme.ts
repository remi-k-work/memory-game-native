// other libraries
import { useColorScheme as useNativewindColorScheme } from "nativewind";

export default function useColorScheme() {
  const { colorScheme } = useNativewindColorScheme();

  return { colorScheme: colorScheme ?? "dark", isDarkColorScheme: colorScheme === "dark" };
}
