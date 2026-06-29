import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      // SSL required on Render, not needed locally
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    }
  : {
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "portfolio",
      password: process.env.DB_PASSWORD || "",
      port: Number.parseInt(process.env.DB_PORT || "5432", 10),
    };

export const pool = new Pool(poolConfig);
export default pool;
