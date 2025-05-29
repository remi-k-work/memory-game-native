import { Pool } from "pg";

const poolSingleton = () => new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

declare global {
  // eslint-disable-next-line no-var
  var pool: undefined | ReturnType<typeof poolSingleton>;
}

const pool = globalThis.pool ?? poolSingleton();

export default pool;
