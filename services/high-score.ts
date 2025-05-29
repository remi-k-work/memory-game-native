// constants
import { HIGH_SCORE_API_URL } from "@/constants/high-score";

export async function getHighScoreStore(): Promise<string | null> {
  const response = await fetch(HIGH_SCORE_API_URL);
  if (!response.ok) throw new Error(await response.text());
  return (await response.text()) ?? null;
}

export async function setHighScoreStore(highScoreStore: string): Promise<void> {
  const response = await fetch(HIGH_SCORE_API_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: highScoreStore });
  if (!response.ok) throw new Error(await response.text());
}

export async function delHighScoreStore(): Promise<void> {
  const response = await fetch(HIGH_SCORE_API_URL, { method: "DELETE" });
  if (!response.ok) throw new Error(await response.text());
}
