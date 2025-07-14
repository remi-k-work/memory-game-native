// types
export interface ConfettiPiece {
  currPositionX: number;
  currPositionY: number;
  colorIndex: number;
  clockwise: boolean;
  maxRotationX: number;
  maxRotationZ: number;
  randomXs: number[];
  initialRandomY: number;
  initialRotation: number;
  randomSpeed: number;
  randomOffsetX: number;
  randomOffsetY: number;
}
