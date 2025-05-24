// react native
import { ImageBackground, Text, View } from "react-native";

// other libraries
import useOrientation from "@/hooks/useOrientation";
import { cn } from "@/lib/utils";

// types
import type { Collection } from "@/types/shared";

interface SlideProps {
  collection: Collection;
}

export default function Slide({ collection: { category, previewP, previewL } }: SlideProps) {
  // Determine the current screen orientation and size
  const { width, isPortrait } = useOrientation();

  return (
    <View className="flex-1 items-center justify-center" style={{ width }}>
      <ImageBackground
        source={isPortrait ? previewP : previewL}
        resizeMode="cover"
        className={cn("flex-1 items-center justify-center overflow-hidden rounded-lg p-4", isPortrait ? "w-48" : "w-80")}
      >
        <View className="rounded-lg bg-background/75 p-4">
          <Text className="text-lg text-foreground">{category}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
