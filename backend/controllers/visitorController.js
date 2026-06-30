import { saveVisitor, getVisitors } from "../model/visitorModel.js";

// ─── User-Agent parser (no extra dependency) ─────────────────────────────────
function parseUA(ua = "") {
  const browser =
    /Edg\//.test(ua)          ? "Edge"    :
    /OPR\/|Opera/.test(ua)    ? "Opera"   :
    /Chrome\//.test(ua)       ? "Chrome"  :
    /Firefox\//.test(ua)      ? "Firefox" :
    /Safari\//.test(ua)       ? "Safari"  :
    "Unknown";

  const os =
    /Windows NT/.test(ua)          ? "Windows" :
    /Mac OS X/.test(ua)            ? "macOS"   :
    /Android/.test(ua)             ? "Android" :
    /iPhone|iPad/.test(ua)         ? "iOS"     :
    /Linux/.test(ua)               ? "Linux"   :
    "Unknown";

  const device =
    /iPhone|Android.*Mobile/.test(ua)     ? "Mobile"  :
    /iPad|Android(?!.*Mobile)/.test(ua)   ? "Tablet"  :
    "Desktop";

  return { browser, os, device };
}

// ─── Geolocate an IP via ip-api.com (free, no key, 45 req/min) ───────────────
async function geolocate(ip) {
  // Skip private / loopback IPs
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return { country: "Localhost", countryCode: "LH", city: "Local", region: "Dev", isp: "localhost" };
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,isp`,
      { signal: AbortSignal.timeout(4000) }
    );
    const data = await res.json();
    if (data.status === "success") {
      return {
        country: data.country,
        countryCode: data.countryCode,
        city: data.city,
        region: data.regionName,
        isp: data.isp,
      };
    }
  } catch (err) {
    console.warn("⚠️ Geolocation failed:", err.message);
  }
  return {};
}

// ─── POST /api/visitors/track ─────────────────────────────────────────────────
export const trackVisitor = async (req, res) => {
  try {
    // Real IP — trust proxy is already set in server.js
    const ip = (req.ip || "").replace("::ffff:", "");
    const ua = req.headers["user-agent"] || "";
    const { referrer = "", sessionId = "" } = req.body || {};

    const [geo, parsed] = await Promise.all([
      geolocate(ip),
      Promise.resolve(parseUA(ua)),
    ]);

    await saveVisitor({
      ip,
      ...geo,
      userAgent: ua,
      ...parsed,
      referrer,
      sessionId,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Visitor tracking error:", err.message);
    // Never let tracking errors surface to the visitor
    res.status(200).json({ success: true });
  }
};

// ─── GET /api/visitors — admin only ──────────────────────────────────────────
export const getVisitorList = async (req, res) => {
  try {
    const page  = parseInt(req.query.page  || "1",   10);
    const limit = parseInt(req.query.limit || "100", 10);
    const result = await getVisitors({ page, limit });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error("❌ Get visitors error:", err.message);
    res.status(500).json({ error: "Failed to retrieve visitors" });
  }
};
