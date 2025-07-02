// react native

// components
import BodyScrollView from "@/components/BodyScrollView";
import CollectionSlider from "@/components/collection-slider";
import Button from "@/components/ui/custom/button3d";

// assets
import PuzzlePiece from "@/assets/icons/PuzzlePiece";

export default function Screen() {
  return (
    <BodyScrollView>
      <CollectionSlider />
      <Button icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />} onPress={() => console.log("pressed")}>
        default
      </Button>
      <Button isLoading icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />} onPress={() => console.log("pressed")}>
        default
      </Button>
      <Button variant="destructive" icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />}>
        destructive
      </Button>
      <Button variant="outline" icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />}>
        outline
      </Button>
      <Button variant="secondary" icon={<PuzzlePiece className="size-9 fill-background stroke-input stroke-1" />}>
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
