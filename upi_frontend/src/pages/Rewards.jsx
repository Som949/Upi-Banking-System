import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";
import { ArrowLeft, CreditCard, Trophy, Gift } from "lucide-react";

export default function Rewards() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await upiAPI.get(`/upi/rewards/${user.account_number}`);
      setData(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load rewards.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "—";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return "—";
    const dd   = String(d.getDate()).padStart(2, "0");
    const mm   = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // Extract percentage from reason string
  const extractPercent = (reason) => {
    const match = reason?.match(/(\d+\.\d+)%/);
    return match ? `${match[1]}%` : "—";
  };

  if (loading) {
    return (
      <div style={{ ...s.root, alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#64748b", fontSize: 16 }}>Loading rewards...</p>
      </div>
    );
  }

  return (
    <div style={s.root}>
      {/* ── Header ── */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} /> Back
        </button>
        <div style={s.headerLogo}>
          <div style={s.logoIcon}>
            <CreditCard size={18} color="#6366f1" />
          </div>
          <span style={s.logoText}>BankUPI</span>
        </div>
      </div>

      <div style={s.content}>

        {/* ── Total Cashback Banner ── */}
        <div style={s.banner}>
          <div style={s.trophyWrap}>
            <Trophy size={40} color="#f59e0b" />
          </div>
          <div style={s.bannerText}>
            <p style={s.bannerLabel}>TOTAL CASHBACK EARNED</p>
            <p style={s.bannerAmount}>
              ₹ {Number(data?.total_cashback || 0).toFixed(2)}
            </p>
            <p style={s.bannerSub}>
              From {data?.total_rewards || 0} transaction
              {data?.total_rewards !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* ── How It Works ── */}
        <div style={s.howItWorks}>
          {[
            { icon: "💳", title: "Make UPI Payment", desc: "Send money via UPI" },
            { icon: "🎲", title: "Get Random Cashback", desc: "0.1% to 0.6% per txn" },
            { icon: "💰", title: "Auto Credited", desc: "Added to your balance" },
          ].map((item, i) => (
            <div key={i} style={s.howCard}>
              <span style={s.howIcon}>{item.icon}</span>
              <p style={s.howTitle}>{item.title}</p>
              <p style={s.howDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Reward History ── */}
        <div style={s.historyCard}>
          <div style={s.historyHeader}>
            <Gift size={18} color="#f59e0b" />
            <span style={s.historyTitle}>Reward History</span>
          </div>

          {!data?.rewards?.length ? (
            <p style={s.emptyText}>
              No rewards yet. Make a UPI transfer to earn cashback!
            </p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr style={s.thead}>
                  <th style={s.th}>DATE</th>
                  <th style={s.th}>CASHBACK</th>
                  <th style={s.th}>PERCENTAGE</th>
                  <th style={s.th}>TRANSACTION</th>
                </tr>
              </thead>
              <tbody>
                {data.rewards.map((r, i) => (
                  <tr
                    key={r.reward_id}
                    style={{
                      ...s.tr,
                      background: i % 2 === 0 ? "#0a0f1e" : "#0d1526",
                    }}
                  >
                    <td style={s.td}>{formatDate(r.rewarded_at)}</td>
                    <td style={{ ...s.td, color: "#4ade80", fontWeight: 700 }}>
                      + ₹ {Number(r.reward_amount).toFixed(2)}
                    </td>
                    <td style={s.td}>
                      <span style={s.percentBadge}>
                        {extractPercent(r.reason)}
                      </span>
                    </td>
                    <td style={{ ...s.td, color: "#94a3b8", fontSize: 13 }}>
                      {r.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a1628 100%)",
    display: "flex", flexDirection: "column",
  },
  header: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #1e293b",
  },
  backBtn: {
    display: "flex", alignItems: "center", gap: 6,
    background: "transparent", border: "1px solid #334155",
    borderRadius: 8, padding: "8px 14px",
    color: "#94a3b8", fontSize: 14, cursor: "pointer",
  },
  headerLogo: { display: "flex", alignItems: "center", gap: 8 },
  logoIcon: {
    background: "#1e1b4b", borderRadius: 8,
    width: 32, height: 32, display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  logoText: { fontSize: 16, fontWeight: 700, color: "#f1f5f9" },
  content: {
    flex: 1, padding: "40px 48px",
    maxWidth: 900, margin: "0 auto", width: "100%",
  },

  // Banner
  banner: {
    background: "linear-gradient(135deg, #1c1003, #2d1a05)",
    border: "1px solid #92400e",
    borderRadius: 20, padding: "32px 40px",
    display: "flex", alignItems: "center",
    gap: 28, marginBottom: 24,
  },
  trophyWrap: {
    width: 80, height: 80, borderRadius: 16,
    background: "#1c1003", border: "1px solid #92400e",
    display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  bannerText: { flex: 1 },
  bannerLabel: {
    fontSize: 11, fontWeight: 700,
    letterSpacing: "0.1em", color: "#f59e0b",
    marginBottom: 8,
  },
  bannerAmount: {
    fontSize: 42, fontWeight: 800,
    color: "#f1f5f9", marginBottom: 6,
  },
  bannerSub: { fontSize: 14, color: "#78716c" },

  // How it works
  howItWorks: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16, marginBottom: 24,
  },
  howCard: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 14, padding: "20px",
    textAlign: "center",
  },
  howIcon: { fontSize: 28, display: "block", marginBottom: 10 },
  howTitle: {
    fontSize: 14, fontWeight: 700,
    color: "#f1f5f9", marginBottom: 4,
  },
  howDesc: { fontSize: 12, color: "#64748b" },

  // History
  historyCard: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 16, overflow: "hidden",
  },
  historyHeader: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "18px 24px",
    borderBottom: "1px solid #1e293b",
  },
  historyTitle: { fontSize: 15, fontWeight: 700, color: "#f1f5f9" },
  emptyText: {
    padding: "40px", textAlign: "center",
    color: "#475569", fontSize: 14,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { borderBottom: "1px solid #1e293b" },
  th: {
    padding: "12px 20px", textAlign: "left",
    fontSize: 11, fontWeight: 700,
    letterSpacing: "0.06em", color: "#475569",
  },
  tr: { borderBottom: "1px solid #1e293b" },
  td: { padding: "14px 20px", fontSize: 14, color: "#cbd5e1" },
  percentBadge: {
    background: "#1c1003", border: "1px solid #92400e",
    borderRadius: 20, padding: "4px 12px",
    fontSize: 12, fontWeight: 700, color: "#f59e0b",
  },
};