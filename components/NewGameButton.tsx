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
import Button from "@/components/ui/custom/button3d";

// assets
import Power from "@/assets/icons/Power";
import XCircle from "@/assets/icons/XCircle";

export default function NewGameButton() {
  // Get the state and actions we need from the game store
  const isGameInProgress = useGameStore((state) => state.isGameInProgress());
  const startedaNewGame = useGameStore((state) => state.startedaNewGame);

  // Controls the alert dialog open state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />} disabled={!isGameInProgress} onPress={() => setIsOpen(true)}>
        Start a New Game
      </Button>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your game will be reset!</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to continue?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary" icon={<XCircle className="size-9 fill-secondary-foreground stroke-input stroke-1" />}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction onPress={startedaNewGame} asChild>
              <Button icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />}>New Game</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
