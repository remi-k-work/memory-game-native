// services
import { neon } from "@neondatabase/serverless";

// constants
const HIGH_SCORE_KEY = "highScore";

// Initialize the neon sql client
const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const row = (await sql`SELECT value FROM high_score_storage WHERE key = ${HIGH_SCORE_KEY}`)[0];

    // Make sure the row exists
    if (!row) return new Response(null, { status: 200 });
    const { value } = row;

    return new Response(JSON.stringify(value) ?? null, { status: 200 });
  } catch (error) {
    console.error("Error getting key from PostgreSQL", error);
    return new Response(null, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Get the raw text body
  const requestBody = await request.text();

  try {
    await sql`INSERT INTO high_score_storage (key, value) VALUES (${HIGH_SCORE_KEY}, ${requestBody}::jsonb) ON CONFLICT (key) DO UPDATE SET value = ${requestBody}::jsonb`;
  } catch (error) {
    console.error("Error setting key in PostgreSQL", error);
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 200 });
}

export async function DELETE() {
  try {
    await sql`DELETE FROM high_score_storage WHERE key = ${HIGH_SCORE_KEY}`;
  } catch (error) {
    console.error("Error removing key from PostgreSQL", error);
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 200 });
}
