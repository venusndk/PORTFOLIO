const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Generates (or reuses) a random session ID stored in sessionStorage.
// This identifies a single browser session without tracking across visits.
function getSessionId(): string {
  const key = "vnd_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

// Call once on app mount. Uses sessionStorage to ensure only one
// beacon fires per browser session (refresh = same session, new tab = new session).
export async function trackVisit(): Promise<void> {
  const sentKey = "vnd_tracked";
  if (sessionStorage.getItem(sentKey)) return; // already sent this session

  try {
    await fetch(`${API_BASE}/api/visitors/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getSessionId(),
        referrer: document.referrer || "",
      }),
    });
    sessionStorage.setItem(sentKey, "1");
  } catch {
    // Silently fail — never interrupt the visitor's experience
  }
}

// Fetch all visitors for the admin panel.
export async function fetchVisitors(
  password: string,
  page = 1,
  limit = 100
): Promise<{ visitors: Visitor[]; total: number }> {
  const res = await fetch(
    `${API_BASE}/api/visitors?page=${page}&limit=${limit}`,
    { headers: { "x-admin-password": password } }
  );
  if (res.status === 401) throw new Error("Wrong password");
  if (!res.ok) throw new Error("Failed to load visitors");
  return res.json();
}

export interface Visitor {
  id: number;
  ip_address: string;
  country: string;
  country_code: string;
  city: string;
  region: string;
  isp: string;
  browser: string;
  os: string;
  device: string;
  referrer: string;
  session_id: string;
  created_at: string;
}
