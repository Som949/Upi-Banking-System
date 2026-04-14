import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Send, Wallet, History, User, Gift, LogOut, CreditCard,
} from "lucide-react";

const menuItems = [
  {
    icon: <Send size={28} color="#6366f1" />,
    label: "Send Money",
    desc: "Transfer via account or UPI ID",
    route: "/transfer",
    accent: "#1e1b4b",
    border: "#312e81",
  },
  {
    icon: <Wallet size={28} color="#0ea5e9" />,
    label: "Check Balance",
    desc: "View your current balance",
    route: "/balance",
    accent: "#0c1a2e",
    border: "#0369a1",
  },
  {
    icon: <History size={28} color="#10b981" />,
    label: "Transaction History",
    desc: "View all past transactions",
    route: "/transactions",
    accent: "#052e16",
    border: "#065f46",
  },
  {
    icon: <Gift size={28} color="#f59e0b" />,
    label: "Rewards",
    desc: "Your cashback & rewards",
    route: "/rewards",
    accent: "#1c1003",
    border: "#92400e",
  },
  {
    icon: <User size={28} color="#a78bfa" />,
    label: "Profile",
    desc: "View your account details",
    route: "/profile",
    accent: "#1a1040",
    border: "#4c1d95",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.root}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoIcon}>
            <CreditCard size={20} color="#6366f1" />
          </div>
          <span style={styles.logoText}>BankUPI</span>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {user?.full_name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p style={styles.userName}>{user?.full_name || "User"}</p>
              <p style={styles.upiId}>{user?.upi_address || ""}</p>
            </div>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={styles.main}>
        <div style={styles.welcomeBox}>
          <h1 style={styles.welcomeH1}>
            Welcome back,{" "}
            <span style={styles.accent}>
              {user?.full_name?.split(" ")[0] || "User"}!
            </span>
          </h1>
          <p style={styles.welcomeSub}>
            What would you like to do today?
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div style={styles.grid}>
          {menuItems.map((item) => (
            <div
              key={item.label}
              style={{
                ...styles.card,
                background: item.accent,
                border: `1px solid ${item.border}`,
              }}
              onClick={() => navigate(item.route)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={styles.cardIcon}>{item.icon}</div>
              <h3 style={styles.cardLabel}>{item.label}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
              <div style={styles.cardArrow}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={styles.footer}>
        {["AES-256", "BCRYPT", "JWT AUTH"].map((b) => (
          <span key={b} style={styles.badge}>{b}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a1628 100%)",
    display: "flex",
    flexDirection: "column",
  },
  // Header
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 48px",
    borderBottom: "1px solid #1e293b",
    background: "#0a0f1e",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    background: "#1e1b4b",
    borderRadius: 8,
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
  },
  userName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f1f5f9",
    margin: 0,
  },
  upiId: {
    fontSize: 11,
    color: "#64748b",
    margin: 0,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: "8px 14px",
    color: "#94a3b8",
    fontSize: 13,
    cursor: "pointer",
  },
  // Main
  main: {
    flex: 1,
    padding: "48px",
    maxWidth: 1100,
    margin: "0 auto",
    width: "100%",
  },
  welcomeBox: {
    marginBottom: 40,
  },
  welcomeH1: {
    fontSize: 36,
    fontWeight: 800,
    color: "#f1f5f9",
    marginBottom: 8,
  },
  accent: { color: "#6366f1" },
  welcomeSub: {
    fontSize: 15,
    color: "#64748b",
  },
  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  card: {
    borderRadius: 16,
    padding: "28px 24px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: 700,
    color: "#f1f5f9",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 1.5,
  },
  cardArrow: {
    position: "absolute",
    top: 24,
    right: 24,
    fontSize: 18,
    color: "#475569",
  },
  // Footer
  footer: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    padding: "20px",
    borderTop: "1px solid #1e293b",
  },
  badge: {
    fontSize: 10,
    color: "#334155",
    letterSpacing: "0.08em",
    fontWeight: 600,
  },
};