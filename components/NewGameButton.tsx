// react
import { useState } from "react";

// react native
import { Modal, Text, View } from "react-native";

// expo
import { router } from "expo-router";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import Button from "@/components/ui/custom/button3d";

// assets
import Power from "@/assets/icons/Power";
import XCircle from "@/assets/icons/XCircle";

export default function NewGameButton() {
  // Get the state and actions we need from the game store
  const isGameInProgress = useGameStore((state) => state.isGameInProgress());
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  // Controls the alert modal open state
  const [isOpen, setIsOpen] = useState(false);

  function handleNewGamePressed() {
    // Close the alert modal
    setIsOpen(false);

    // Player has started a new game
    startedaNewGame();

    // Go back to the home screen
    router.back();
  }

  function handleCancelPressed() {
    // Close the alert modal
    setIsOpen(false);
  }

  return (
    <>
      <Button icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />} disabled={!isGameInProgress} onPress={() => setIsOpen(true)}>
        Start a New Game
      </Button>
      {isOpen && (
        <Modal animationType="fade" transparent onRequestClose={handleCancelPressed}>
          <View className="flex-1 items-center justify-center bg-background/90">
            <View className="m-3 gap-1 rounded-lg border border-border bg-card p-3">
              <Text className="text-center text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">Your game will be reset!</Text>
              <Text className="mb-4 text-center text-xl text-muted-foreground sm:text-2xl md:text-3xl lg:text-4xl">Are you sure you want to continue?</Text>
              <Button icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={handleNewGamePressed}>
                New Game
              </Button>
              <Button variant="secondary" icon={<XCircle className="size-9 fill-secondary-foreground stroke-input stroke-1" />} onPress={handleCancelPressed}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
