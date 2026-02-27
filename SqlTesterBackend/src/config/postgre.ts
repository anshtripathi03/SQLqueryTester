import { Pool } from "pg";

const pool = new Pool({

  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },

});

export const connectPostgre = async(): Promise<void> => {

  try {

    const client = await pool.connect();
    console.log(`PostgreSQL connected`);
    client.release();

  } catch (error: any) {

    console.error("PostgreSQL Connection Failed", error.message);
    process.exit(1);

  }
};

export default pool;