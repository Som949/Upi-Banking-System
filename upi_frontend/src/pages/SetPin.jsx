import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CreditCard } from "lucide-react";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";

export default function SetPin() {
  const navigate = useNavigate();
  const [upi_pin, setUpiPin] = useState("");
  const [confirm_upi_pin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);

  const account_number = sessionStorage.getItem("reg_account");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (upi_pin !== confirm_upi_pin) {
      toast.error("PINs do not match.");
      return;
    }

    if (upi_pin.length < 4 || upi_pin.length > 6) {
      toast.error("PIN must be 4 to 6 digits.");
      return;
    }

    if (!account_number) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      const res = await upiAPI.post("/upi/set-pin", {
        account_number,
        upi_pin,
        confirm_upi_pin,
      });

      if (res.data.success) {
        toast.success("UPI PIN set successfully! Please login.");
        sessionStorage.removeItem("reg_account");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to set PIN.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      {/* ── Left Panel ── */}
      <div style={styles.left}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <CreditCard size={22} color="#6366f1" />
          </div>
          <span style={styles.logoText}>BankUPI</span>
        </div>

        <div style={styles.heroText}>
          <h1 style={styles.heroH1}>
            Almost{" "}
            <span style={styles.heroAccent}>there.</span>
          </h1>
          <p style={styles.heroSub}>
            Set your UPI transaction PIN. This PIN will be required every
            time you make a payment — keep it secret.
          </p>
        </div>

        <div style={styles.features}>
          {[
            { icon: "🔐", label: "Required for every payment" },
            { icon: "🚫", label: "Never share with anyone" },
            { icon: "✅", label: "Like Google Pay / PhonePe PIN" },
          ].map((f) => (
            <div key={f.label} style={styles.featurePill}>
              <span>{f.icon}</span>
              <span style={styles.featurePillText}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={styles.right}>
        <div style={styles.card}>
          {/* Shield Icon */}
          <div style={styles.shieldWrap}>
            <Shield size={36} color="#6366f1" />
          </div>

          <h2 style={styles.cardTitle}>Set Transaction PIN</h2>
          <p style={styles.cardSub}>
            This PIN will be used to authorize every UPI payment.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* UPI PIN */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>UPI PIN</label>
              <input
                type="password"
                placeholder="Enter 4-6 digit PIN"
                value={upi_pin}
                onChange={(e) => setUpiPin(e.target.value.replace(/\D/, ""))}
                maxLength={6}
                required
                style={styles.input}
                inputMode="numeric"
              />
            </div>

            {/* Confirm PIN */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>CONFIRM PIN</label>
              <input
                type="password"
                placeholder="Re-enter your PIN"
                value={confirm_upi_pin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/, ""))}
                maxLength={6}
                required
                style={styles.input}
                inputMode="numeric"
              />
            </div>

            {/* Info Box */}
            <div style={styles.infoBox}>
              <Shield size={14} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={styles.infoText}>
                Never share your PIN with anyone — not even bank officials.
              </span>
            </div>

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Setting PIN..." : "Set PIN & Continue →"}
            </button>
          </form>

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
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: {
    background: "#1e1b4b",
    borderRadius: 10,
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 18, fontWeight: 700, color: "#f1f5f9" },
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
  heroSub: { fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 380 },
  features: { display: "flex", flexDirection: "column", gap: 10 },
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
  featurePillText: { fontSize: 14, color: "#94a3b8" },
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
  shieldWrap: {
    width: 68,
    height: 68,
    borderRadius: 16,
    background: "#1e1b4b",
    border: "1px solid #312e81",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  cardTitle: { fontSize: 28, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 },
  cardSub: { fontSize: 14, color: "#64748b", marginBottom: 28 },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#64748b" },
  input: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 10,
    padding: "13px 16px",
    fontSize: 18,
    color: "#f1f5f9",
    outline: "none",
    letterSpacing: "0.3em",
    width: "100%",
  },
  infoBox: {
    display: "flex",
    gap: 8,
    background: "#1e1b4b",
    border: "1px solid #312e81",
    borderRadius: 10,
    padding: "12px 14px",
  },
  infoText: { fontSize: 12, color: "#818cf8", lineHeight: 1.5 },
  btn: {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 4,
  },
  badges: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid #1e293b",
  },
  badge: { fontSize: 10, color: "#475569", letterSpacing: "0.08em", fontWeight: 600 },
};