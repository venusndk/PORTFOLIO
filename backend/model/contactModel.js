import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localStorePath = path.join(__dirname, "..", "data", "contacts.json");

const insertContactQuery = `
  INSERT INTO contacts (full_name, email, subject, message)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

const readLocalContacts = async () => {
  try {
    const raw = await fs.readFile(localStorePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

const saveLocally = async (contact) => {
  await fs.mkdir(path.dirname(localStorePath), { recursive: true });

  const contacts = await readLocalContacts();
  contacts.push(contact);

  await fs.writeFile(localStorePath, JSON.stringify(contacts, null, 2), "utf8");
  return contact;
};

export const saveContact = async (name, email, subject, message) => {
  const values = [name, email, subject, message];

  try {
    const result = await pool.query(insertContactQuery, values);
    return { ...result.rows[0], storage: "postgresql" };
  } catch (error) {
    console.warn("⚠️ PostgreSQL unavailable, storing contact locally:", error.message);

    return saveLocally({
      id: `local-${Date.now()}`,
      full_name: name,
      email,
      subject,
      message,
      created_at: new Date().toISOString(),
      storage: "local-file",
    });
  }
};
