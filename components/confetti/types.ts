// types

export interface FlakeSize {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Rotation {
  x: number;
  z: number;
}

export interface RandomOffset {
  x?: Range;
  y?: Range;
}

export interface ConfettiPiece {
  index: number;
  position: Position;
  colorIndex: number;
  rotationSpeed: number;
  fallingSpeed: number;
  flipSeed: number;

  clockwise: boolean;
  maxRotation: Rotation;
  randomXs: number[];
  initialRandomY: number;
  initialRotation: number;
  randomSpeed: number;
  randomOffsetX: number;
  randomOffsetY: number;
}
