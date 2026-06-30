import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localStorePath = path.join(__dirname, "..", "data", "visitors.json");

const readLocalVisitors = async () => {
  try {
    const raw = await fs.readFile(localStorePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const saveLocally = async (visitor) => {
  await fs.mkdir(path.dirname(localStorePath), { recursive: true });
  const visitors = await readLocalVisitors();
  visitors.push(visitor);
  await fs.writeFile(localStorePath, JSON.stringify(visitors, null, 2), "utf8");
  return visitor;
};

export const saveVisitor = async (data) => {
  const { ip, country, countryCode, city, region, isp, userAgent, browser, os, device, referrer, sessionId } = data;

  try {
    const result = await pool.query(
      `INSERT INTO visitors
        (ip_address, country, country_code, city, region, isp, user_agent, browser, os, device, referrer, session_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [ip, country || null, countryCode || null, city || null, region || null, isp || null,
       userAgent || null, browser || null, os || null, device || null, referrer || null, sessionId || null]
    );
    return { ...result.rows[0], storage: "postgresql" };
  } catch (err) {
    console.warn("⚠️ PostgreSQL unavailable, storing visitor locally:", err.message);
    return saveLocally({
      id: `local-${Date.now()}`,
      ip_address: ip,
      country, country_code: countryCode, city, region, isp,
      user_agent: userAgent, browser, os, device, referrer,
      session_id: sessionId,
      created_at: new Date().toISOString(),
      storage: "local-file",
    });
  }
};

export const getVisitors = async ({ page = 1, limit = 100 } = {}) => {
  const offset = (page - 1) * limit;
  try {
    const [rows, countRow] = await Promise.all([
      pool.query(`SELECT * FROM visitors ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [limit, offset]),
      pool.query(`SELECT COUNT(*) FROM visitors`),
    ]);
    return {
      visitors: rows.rows,
      total: parseInt(countRow.rows[0].count, 10),
      storage: "postgresql",
    };
  } catch (err) {
    console.warn("⚠️ PostgreSQL unavailable, reading visitors locally:", err.message);
    const all = await readLocalVisitors();
    const sorted = all.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return {
      visitors: sorted.slice(offset, offset + limit),
      total: sorted.length,
      storage: "local-file",
    };
  }
};
