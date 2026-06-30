import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchVisitors } from "../api/visitorApi";
import type { Visitor } from "../api/visitorApi";

// Convert ISO country code to flag emoji
const flag = (code: string) =>
  code
    ? String.fromCodePoint(
        ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
      )
    : "🌐";

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const browserIcon: Record<string, string> = {
  Chrome: "🟡", Firefox: "🟠", Safari: "🔵", Edge: "🔷", Opera: "🔴",
};
const deviceIcon: Record<string, string> = {
  Mobile: "📱", Tablet: "📟", Desktop: "🖥️",
};

// ─── Login Screen ─────────────────────────────────────────────────────────────
const LoginScreen: React.FC<{ onLogin: (pw: string) => void; error: string }> = ({
  onLogin,
  error,
}) => {
  const [pw, setPw] = useState("");
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-xl" />
              <div className="relative m-[1.5px] bg-gray-950 rounded-[10px] px-3 py-1.5">
                <span className="text-2xl font-black tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-green-600">Ven</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">NDIK</span>
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-1">Portfolio visitor analytics</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(pw);
          }}
          className="space-y-4"
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-6">
          <a
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to portfolio
          </a>
        </p>
      </motion.div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: string | number; icon: string; color: string }> = ({
  label, value, icon, color,
}) => (
  <div className={`bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </div>
);

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
const AdminPanel: React.FC = () => {
  const [password, setPassword]     = useState(() => sessionStorage.getItem("vnd_admin_pw") || "");
  const [authed, setAuthed]         = useState(false);
  const [loginError, setLoginError] = useState("");
  const [visitors, setVisitors]     = useState<Visitor[]>([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch]         = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async (pw: string, silent = false) => {
    if (!silent) setLoading(true);
    setFetchError("");
    try {
      const data = await fetchVisitors(pw);
      setVisitors(data.visitors);
      setTotal(data.total);
      setLastUpdated(new Date());
      setAuthed(true);
      sessionStorage.setItem("vnd_admin_pw", pw);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      if (msg === "Wrong password") {
        setLoginError("Incorrect password. Try again.");
        setAuthed(false);
      } else {
        setFetchError(msg);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // Auto-login if password is already in sessionStorage
  useEffect(() => {
    if (password) load(password);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Real-time polling — silently refresh every 10 seconds
  useEffect(() => {
    if (!authed || !password) return;
    const interval = setInterval(() => load(password, true), 10000);
    return () => clearInterval(interval);
  }, [authed, password, load]);

  const handleLogin = (pw: string) => {
    setPassword(pw);
    setLoginError("");
    load(pw);
  };

  if (!authed) {
    return <LoginScreen onLogin={handleLogin} error={loginError} />;
  }

  // ─── Stats ──────────────────────────────────────────────────────────────────
  const today = new Date().toDateString();
  const todayCount  = visitors.filter((v) => new Date(v.created_at).toDateString() === today).length;
  const uniqueIPs   = new Set(visitors.map((v) => v.ip_address)).size;
  const countries   = new Set(visitors.map((v) => v.country).filter(Boolean)).size;

  // ─── Filtered table ─────────────────────────────────────────────────────────
  const q = search.toLowerCase();
  const filtered = visitors.filter(
    (v) =>
      !q ||
      v.country?.toLowerCase().includes(q) ||
      v.city?.toLowerCase().includes(q) ||
      v.browser?.toLowerCase().includes(q) ||
      v.os?.toLowerCase().includes(q) ||
      v.ip_address?.toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg" />
              <div className="relative m-[1.5px] bg-gray-950 rounded-[7px] px-2 py-1">
                <span className="text-base font-black tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-green-600">Ven</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">NDIK</span>
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-green-400 text-xs font-medium">Live</p>
              </div>
              {lastUpdated && (
                <p className="text-gray-500 text-xs">
                  Updated {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(password)}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <motion.span
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                className="inline-block"
              >
                🔄
              </motion.span>
              Refresh
            </button>
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-all"
            >
              ← Portfolio
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Visits"    value={total}      icon="👥" color="bg-blue-500/20"   />
          <StatCard label="Today"           value={todayCount} icon="📅" color="bg-purple-500/20" />
          <StatCard label="Unique IPs"      value={uniqueIPs}  icon="🌐" color="bg-green-500/20"  />
          <StatCard label="Countries"       value={countries}  icon="🗺️" color="bg-orange-500/20" />
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by country, city, browser, IP…"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-blue-500/50 text-sm transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition-all"
            >
              ✕ Clear
            </button>
          )}
          <span className="text-gray-400 text-sm whitespace-nowrap">
            {filtered.length} / {total}
          </span>
        </div>

        {/* Error */}
        <AnimatePresence>
          {fetchError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm"
            >
              ❌ {fetchError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">#</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Browser / OS</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Device</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">IP</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {loading && visitors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500">
                      Loading visitors…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500">
                      {search ? "No results match your search." : "No visitors recorded yet."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((v, i) => (
                    <motion.tr
                      key={v.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i < 20 ? i * 0.02 : 0 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-500">{total - i}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-white">{timeAgo(v.created_at)}</span>
                        <br />
                        <span className="text-gray-500 text-xs">
                          {new Date(v.created_at).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-lg mr-1">{flag(v.country_code)}</span>
                        <span className="text-white">{v.city || "—"}</span>
                        {v.region && v.region !== v.city && (
                          <span className="text-gray-400">, {v.region}</span>
                        )}
                        <br />
                        <span className="text-gray-400 text-xs">{v.country || "Unknown"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="mr-1">{browserIcon[v.browser] || "🌐"}</span>
                        <span className="text-white">{v.browser || "—"}</span>
                        <br />
                        <span className="text-gray-400 text-xs">{v.os || "—"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="mr-1">{deviceIcon[v.device] || "💻"}</span>
                        <span className="text-gray-300">{v.device || "—"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-400 font-mono text-xs">{v.ip_address || "—"}</span>
                      </td>
                      <td className="py-3 px-4 max-w-[180px]">
                        {v.referrer ? (
                          <span className="text-blue-400 text-xs truncate block" title={v.referrer}>
                            {v.referrer.replace(/^https?:\/\//, "").slice(0, 30)}
                            {v.referrer.length > 30 ? "…" : ""}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs">Direct</span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs pb-4">
          Showing most recent {filtered.length} visits · Total {total}
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
