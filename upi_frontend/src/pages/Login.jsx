import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, CreditCard, Lock } from "lucide-react";
import { upiAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ account_number: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await upiAPI.post("/upi/login", {
        account_number: form.account_number,
        password: form.password,
      });

      if (res.data.success) {
        login(res.data.token, res.data.data);
        toast.success(`Welcome back, ${res.data.data.full_name}!`);
        navigate("/dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      // PIN set nahi hua
      if (err.response?.data?.next_step === "POST /upi/set-pin") {
        toast.error("Please set your UPI PIN first.");
        sessionStorage.setItem("reg_account", form.account_number);
        navigate("/set-pin");
        return;
      }
      toast.error(msg);
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
            Welcome{" "}
            <span style={styles.heroAccent}>back.</span>
          </h1>
          <p style={styles.heroSub}>
            Login with your account number and password to access your UPI
            dashboard securely.
          </p>
        </div>

        <div style={styles.features}>
          {[
            { icon: "⚡", label: "Instant Transfers" },
            { icon: "🔒", label: "Bank-Grade Security" },
            { icon: "🎁", label: "Cashback Rewards" },
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
          <h2 style={styles.cardTitle}>Login</h2>
          <p style={styles.cardSub}>
            Enter your secure credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Account Number */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>ACCOUNT NUMBER</label>
              <div style={styles.inputWrap}>
                <CreditCard size={16} color="#64748b" />
                <input
                  type="text"
                  name="account_number"
                  placeholder="Enter your 10-digit account number"
                  value={form.account_number}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.fieldWrap}>
              <label style={styles.label}>SECURE PASSWORD</label>
              <div style={styles.inputWrap}>
                <Lock size={16} color="#64748b" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass
                    ? <EyeOff size={16} color="#64748b" />
                    : <Eye size={16} color="#64748b" />}
                </button>
              </div>
            </div>

            {/* Info box */}
            <div style={styles.infoBox}>
              <span style={{ fontSize: 15 }}>🛡️</span>
              <span style={styles.infoText}>
                Your session is encrypted end-to-end. Never share your
                password with anyone.
              </span>
            </div>

            {/* Buttons */}
            <button type="submit" style={styles.btnPrimary} disabled={loading}>
              {loading ? "Logging in..." : "Login →"}
            </button>

          <p style={styles.registerText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.registerLink}>Register</Link>
            </p>
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
  cardTitle: { fontSize: 28, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 },
  cardSub: { fontSize: 14, color: "#64748b", marginBottom: 28 },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#64748b" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 10,
    padding: "0 14px",
    gap: 10,
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#f1f5f9",
    fontSize: 14,
    padding: "13px 0",
  },
  eyeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
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
  btnPrimary: {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
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
    width: "100%",
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
  
registerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },
  registerLink: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: 600,
  },
};