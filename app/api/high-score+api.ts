// services
import { Pool } from "pg";

const poolSingleton = () => new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

declare global {
  // eslint-disable-next-line no-var
  var pool: undefined | ReturnType<typeof poolSingleton>;
}

const pool = globalThis.pool ?? poolSingleton();

// constants
const HIGH_SCORE_KEY = "highScore";

export async function GET() {
  const client = await pool.connect();
  try {
    const row = (await client.query("SELECT value FROM high_score_storage WHERE key = $1", [HIGH_SCORE_KEY])).rows[0];

    // Make sure the row exists
    if (!row) return new Response(null, { status: 200 });
    const { value } = row;

    return new Response(JSON.stringify(value) ?? null, { status: 200 });
  } catch (error) {
    console.error("Error getting key from PostgreSQL", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function POST(request: Request) {
  const client = await pool.connect();
  try {
    await client.query("INSERT INTO high_score_storage (key, value) VALUES ($1, $2::jsonb) ON CONFLICT (key) DO UPDATE SET value = $2::jsonb", [
      HIGH_SCORE_KEY,
      await request.text(),
    ]);
  } catch (error) {
    console.error("Error setting key in PostgreSQL", error);
    throw error;
  } finally {
    client.release();
  }

  return new Response(null, { status: 200 });
}

export async function DELETE() {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM high_score_storage WHERE key = $1", [HIGH_SCORE_KEY]);
  } catch (error) {
    console.error("Error removing key from PostgreSQL", error);
    throw error;
  } finally {
    client.release();
  }

  return new Response(null, { status: 200 });
}
