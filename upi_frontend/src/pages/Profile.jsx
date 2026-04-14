import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";
import {
  ArrowLeft, CreditCard, User, Phone, Calendar,
  Landmark, Shield, Clock, Hash,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await upiAPI.get(`/upi/profile/${user.account_number}`);
      const data = res.data.data || res.data.profile || res.data;
      setProfile(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const maskAccount = (acc) =>
    acc ? `XXXXXX${String(acc).slice(-4)}` : "—";

  const formatDate = (ts) => {
    if (!ts) return "—";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
  };

  if (loading) {
    return (
      <div style={{ ...s.root, alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#64748b", fontSize: 16 }}>Loading profile...</p>
      </div>
    );
  }

  const info = profile || {};

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

      {/* ── Content ── */}
      <div style={s.content}>

        {/* ── Profile Card ── */}
        <div style={s.profileCard}>
          {/* Avatar */}
          <div style={s.avatar}>
            {(info.full_name || user?.full_name || "U").charAt(0).toUpperCase()}
          </div>

          <h2 style={s.name}>{info.full_name || user?.full_name || "—"}</h2>

          {/* UPI Badge */}
          <div style={s.upiBadge}>
            <span style={s.upiText}>
              {info.upi_address || user?.upi_address || "—"}
            </span>
            <button
              style={s.copyBtn}
              onClick={() => {
                navigator.clipboard.writeText(info.upi_address || user?.upi_address || "");
                toast.success("UPI ID copied!");
              }}
            >
              Copy
            </button>
          </div>

          {/* Status */}
          <div style={s.statusBadge}>
            <span style={s.statusDot} />
            Active Account
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div style={s.grid}>

          {/* Account Details */}
          <div style={s.infoCard}>
            <div style={s.infoCardHeader}>
              <Landmark size={18} color="#6366f1" />
              <span style={s.infoCardTitle}>Account Details</span>
            </div>
            <InfoRow
              label="Account Number"
            value={info.account_number || user?.account_number || "—"}
            />
            <InfoRow
              label="User ID"
              value={info.user_id || "—"}
            />
          </div>

          {/* Personal Details */}
          <div style={s.infoCard}>
            <div style={s.infoCardHeader}>
              <User size={18} color="#a78bfa" />
              <span style={s.infoCardTitle}>Personal Details</span>
            </div>
            <InfoRow
              icon={<Phone size={14} color="#64748b" />}
              label="Phone Number"
              value={info.phone_number || "—"}
            />
            <InfoRow
              icon={<Calendar size={14} color="#64748b" />}
              label="Date of Birth"
              value={info.dob ? formatDate(info.dob) : "—"}
            />
          </div>

          {/* UPI Details */}
          <div style={s.infoCard}>
            <div style={s.infoCardHeader}>
              <Shield size={18} color="#0ea5e9" />
              <span style={s.infoCardTitle}>UPI Details</span>
            </div>
            <InfoRow
              icon={<Hash size={14} color="#64748b" />}
              label="UPI Address"
              value={info.upi_address || user?.upi_address || "—"}
            />

          </div>

          {/* Quick Stats */}
          <div style={s.infoCard}>
            <div style={s.infoCardHeader}>
              <CreditCard size={18} color="#10b981" />
              <span style={s.infoCardTitle}>Quick Stats</span>
            </div>
            <InfoRow
              label="Total Transactions"
              value={info.total_transactions ?? "—"}
            />
  
          </div>
        </div>

        {/* ── Logout Button ── */}
        <div style={s.logoutWrap}>
          <button style={s.logoutBtn} onClick={handleLogout}>
            Logout from BankUPI
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Reusable Info Row ─────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div style={r.row}>
      <span style={r.label}>{label}</span>
      <span style={r.value}>{value}</span>
    </div>
  );
}

const r = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #1e293b",
  },
  label: { fontSize: 13, color: "#64748b" },
  value: { fontSize: 14, fontWeight: 600, color: "#f1f5f9", textAlign: "right" },
};

// ── Styles ────────────────────────────────────────────────
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
  // Profile Card
  profileCard: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 20, padding: "36px",
    display: "flex", flexDirection: "column",
    alignItems: "center", marginBottom: 24,
  },
  avatar: {
    width: 80, height: 80, borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 32,
    fontWeight: 800, color: "#fff", marginBottom: 16,
  },
  name: {
    fontSize: 24, fontWeight: 700,
    color: "#f1f5f9", marginBottom: 12,
  },
  upiBadge: {
    display: "flex", alignItems: "center", gap: 10,
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: 20, padding: "8px 16px", marginBottom: 12,
  },
  upiText: { fontSize: 14, color: "#94a3b8" },
  copyBtn: {
    background: "#6366f1", border: "none",
    borderRadius: 6, padding: "4px 10px",
    color: "#fff", fontSize: 11,
    fontWeight: 600, cursor: "pointer",
  },
  statusBadge: {
    display: "flex", alignItems: "center", gap: 6,
    background: "#052e16", border: "1px solid #065f46",
    borderRadius: 20, padding: "6px 14px",
    fontSize: 13, color: "#4ade80", fontWeight: 600,
  },
  statusDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "#4ade80",
  },
  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16, marginBottom: 24,
  },
  infoCard: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 16, padding: "20px 24px",
  },
  infoCardHeader: {
    display: "flex", alignItems: "center", gap: 8,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottom: "1px solid #1e293b",
  },
  infoCardTitle: {
    fontSize: 15, fontWeight: 700, color: "#f1f5f9",
  },
  // Logout
  logoutWrap: { display: "flex", justifyContent: "center" },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #7f1d1d",
    borderRadius: 10, padding: "12px 32px",
    color: "#f87171", fontSize: 14,
    fontWeight: 600, cursor: "pointer",
  },
};