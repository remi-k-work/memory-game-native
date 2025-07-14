// Generate a random boolean value (true or false)
export function getRandomBoolean() {
  "worklet";

  return Math.random() >= 0.5;
}

// Generate a random number between the min and max values
export function getRandomValue(min: number, max: number) {
  "worklet";

  if (min === max) return min;
  return Math.random() * (max - min) + min;
}

// Create an array of random numbers with a specified length and range
export function randomXArray(length: number, min: number, max: number) {
  "worklet";

  return new Array(length).fill(0).map(() => getRandomValue(min, max));
}
