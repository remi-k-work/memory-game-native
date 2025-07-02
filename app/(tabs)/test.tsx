// react native

// components
import BodyScrollView from "@/components/BodyScrollView";
import CollectionSlider from "@/components/collection-slider";
import Button from "@/components/ui/custom/button3d";

// assets
import CheckCircle from "@/assets/icons/CheckCircle";
import Power from "@/assets/icons/Power";
import PuzzlePiece from "@/assets/icons/PuzzlePiece";
import XCircle from "@/assets/icons/XCircle";
import { useState } from "react";

export default function Screen() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <BodyScrollView>
      <CollectionSlider />
      <Button
        icon={<PuzzlePiece className="fill-primary-background size-9 stroke-input stroke-1" />}
        isLoading={isLoading}
        onPress={() => setIsLoading(!isLoading)}
      >
        default
      </Button>
      <Button icon={<Power className="size-9 fill-primary-foreground stroke-input stroke-1" />} onPress={() => console.log("pressed")}>
        default
      </Button>
      <Button variant="destructive" icon={<XCircle className="size-9 fill-destructive-foreground stroke-input stroke-1" />}>
        destructive
      </Button>
      <Button variant="outline" icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />}>
        outline
      </Button>
      <Button variant="secondary" icon={<CheckCircle className="size-9 fill-secondary-foreground stroke-input stroke-1" />}>
        secondary
      </Button>
      <Button variant="default" size="sm">
        default
      </Button>
      <Button variant="destructive" size="sm">
        destructive
      </Button>
      <Button variant="outline" size="sm">
        outline
      </Button>
      <Button variant="secondary" size="sm">
        secondary
      </Button>

      <Button variant="default" size="lg">
        default
      </Button>
      <Button variant="destructive" size="lg">
        destructive
      </Button>
      <Button variant="outline" size="lg">
        outline
      </Button>
      <Button variant="secondary" size="lg">
        secondary
      </Button>

      <Button variant="default" size="icon" isLoading>
        <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
      </Button>
      <Button variant="destructive" size="icon">
        <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
      </Button>
      <Button variant="outline" size="icon">
        <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
      </Button>
      <Button variant="secondary" size="icon">
        <PuzzlePiece className="size-12 fill-background stroke-input stroke-1" />
      </Button>
    </BodyScrollView>
  );
}
