// other libraries
import { Easing } from "react-native-reanimated";

// types
import type { TimingConfig } from "@/features/animations/types";

// constants
export const DEFAULT_TIMING_CONFIG: Required<TimingConfig> = { to: 1, easing: Easing.inOut(Easing.ease), duration: 600 } as const;
