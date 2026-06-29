import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { pool } from "./db/pool.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Trust proxy — required on Render (sits behind a load balancer) ──────────
// Without this, express-rate-limit throws ERR_ERL_UNEXPECTED_X_FORWARDED_FOR
app.set('trust proxy', 1);

// ─── Security headers ────────────────────────────────────────────────────────
app.use(helmet());

// ─── Response compression ────────────────────────────────────────────────────
app.use(compression());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://portfolio-xlzv.onrender.com', // production frontend
];
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// ─── Body parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// ─── Rate limiting (contact form — 10 req / 15 min per IP) ───────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/contacts", contactLimiter, contactRoutes);

// ─── Root ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    name: "VenNDIK Portfolio API",
    status: "running",
    endpoints: ["/health", "/api/contacts/contact"],
  });
});

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ─── Centralised error handler ───────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Database init ───────────────────────────────────────────────────────────
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

// ─── Graceful shutdown ───────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received — shutting down gracefully`);
  server.close(async () => {
    await pool.end();
    console.log("✅ Database pool closed. Exiting.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
