// react
import { useState } from "react";

// react native
import { View } from "react-native";

// other libraries
import { useGameStore } from "@/stores/gameProvider";
import { useDebouncedCallback } from "use-debounce";

// components
import Switch from "@/components/ui/custom/switch";
import { Label } from "@/components/ui/label";

export default function IllustrationsSwitch() {
  // Get the state and actions we need from the game store
  const showIllustrations = useGameStore((state) => state.showIllustrations);
  const switchedIllustrations = useGameStore((state) => state.switchedIllustrations);

  // Use the local state to update the ui immediately, rather than waiting for the debounced callback
  const [currShowIllustrations, setCurrShowIllustrations] = useState(showIllustrations);

  // Use the debounced callback to initiate the relevant actions
  const handleShowIllustrationsChanged = useDebouncedCallback(() => {
    // Do nothing if the state hasn't changed
    if (currShowIllustrations === showIllustrations) return;
    switchedIllustrations();
  }, 600);

  return (
    <View className="flex-row items-center gap-2">
      <Switch
        nativeID="show-illustrations"
        value={currShowIllustrations}
        onValueChange={() => {
          setCurrShowIllustrations(!currShowIllustrations);
          handleShowIllustrationsChanged();
        }}
      />
      <Label
        nativeID="show-illustrations"
        className="native:text-xl"
        onPress={() => {
          setCurrShowIllustrations(!currShowIllustrations);
          handleShowIllustrationsChanged();
        }}
      >
        Show Illustrations
      </Label>
    </View>
  );
}
