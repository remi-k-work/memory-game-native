// other libraries
import { generateHighScoreUrl } from "./helpers";

export async function getHighScore() {
  const highScoreUrl = generateHighScoreUrl();

  const response = await fetch(highScoreUrl);
  if (!response.ok) throw new Error(await response.text());

  const highScore = await response.json();
  return highScore;
}
