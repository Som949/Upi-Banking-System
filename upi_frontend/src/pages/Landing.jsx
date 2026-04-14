import { useNavigate } from "react-router-dom";
import { CreditCard, Zap, Shield, Gift } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      {/* ── Left Panel ── */}
      <div style={styles.left}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <CreditCard size={22} color="#6366f1" />
          </div>
          <span style={styles.logoText}>BankUPI</span>
        </div>

        {/* Hero */}
        <div style={styles.heroText}>
          <h1 style={styles.heroH1}>
            Securing the{" "}
            <span style={styles.heroAccent}>Digital Frontier.</span>
          </h1>
          <p style={styles.heroSub}>
            BankUPI provides bank-grade payment infrastructure for instant,
            secure, and rewarding transactions.
          </p>
        </div>

        {/* Feature Pills */}
        <div style={styles.features}>
          {[
            { icon: <Zap size={15} color="#6366f1" />, label: "Instant Transfers" },
            { icon: <Shield size={15} color="#6366f1" />, label: "Bank-Grade Security" },
            { icon: <Gift size={15} color="#6366f1" />, label: "Cashback on Every Payment" },
          ].map((f) => (
            <div key={f.label} style={styles.featurePill}>
              {f.icon}
              <span style={styles.featurePillText}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome to BankUPI</h2>
          <p style={styles.cardSub}>
            Enter your secure credentials to access your account.
          </p>

          <div style={styles.btnGroup}>
            <button
              style={styles.btnPrimary}
              onClick={() => navigate("/login")}
            >
              Login →
            </button>
            <button
              style={styles.btnSecondary}
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>

          {/* Info box */}
          <div style={styles.infoBox}>
            <Shield size={15} color="#6366f1" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={styles.infoText}>
              A bank account is required to register. Your bank PIN will be
              used to verify your identity.
            </span>
          </div>

          {/* Badges */}
          <div style={styles.badges}>
            {["AES-256", "BCRYPT", "JWT AUTH"].map((b) => (
              <span key={b} style={styles.badge}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a1628 100%)",
  },
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "48px",
    borderRight: "1px solid #1e293b",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logoIcon: {
    background: "#1e1b4b",
    borderRadius: 10,
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: "#f1f5f9",
  },
  heroText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 48,
  },
  heroH1: {
    fontSize: 48,
    fontWeight: 800,
    color: "#f1f5f9",
    lineHeight: 1.2,
    marginBottom: 20,
  },
  heroAccent: { color: "#6366f1" },
  heroSub: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.7,
    maxWidth: 380,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  featurePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: "10px 16px",
    width: "fit-content",
  },
  featurePillText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 40px",
  },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 20,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 420,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#f1f5f9",
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 32,
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnSecondary: {
    background: "transparent",
    color: "#f1f5f9",
    border: "1px solid #334155",
    borderRadius: 10,
    padding: "14px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  infoBox: {
    display: "flex",
    gap: 8,
    background: "#1e1b4b",
    border: "1px solid #312e81",
    borderRadius: 10,
    padding: "12px 14px",
    marginBottom: 24,
  },
  infoText: {
    fontSize: 12,
    color: "#818cf8",
    lineHeight: 1.5,
  },
  badges: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
    borderTop: "1px solid #1e293b",
  },
  badge: {
    fontSize: 10,
    color: "#475569",
    letterSpacing: "0.08em",
    fontWeight: 600,
  },
};