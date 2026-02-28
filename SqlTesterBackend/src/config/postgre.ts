import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectPostgre = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log(`PostgreSQL connected`);
    client.release();
  } catch (error: any) {
    console.error("PostgreSQL Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default pool;
