import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/pool.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app' // We'll update this after Vercel deployment
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

const ensureContactsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

// Test DB connection, but keep the app alive if PostgreSQL is unavailable.
pool
  .query("SELECT 1")
  .then(async () => {
    await ensureContactsTable();
    console.log("✅ Connected to PostgreSQL database successfully");
  })
  .catch((err) => {
    console.warn("⚠️ PostgreSQL connection failed. Contact submissions will fall back to local storage.");
    console.warn(err.message);
  });

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});