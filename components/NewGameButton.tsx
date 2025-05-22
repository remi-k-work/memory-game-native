// react
import { useState } from "react";

// other libraries
import { useGameStore } from "@/stores/gameProvider";

// components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function NewGameButton() {
  // Get the state and actions we need from the game store
  const isGameInProgress = useGameStore((state) => state.isGameInProgress());
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  // Controls the alert dialog open state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="lg" disabled={!isGameInProgress} onPress={() => setIsOpen(true)}>
        <Text>Start a New Game</Text>
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please Confirm!</AlertDialogTitle>
            <AlertDialogDescription>Your game will be reset. Are you sure you want to continue?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={startedaNewGame}>
              <Text>Continue</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
