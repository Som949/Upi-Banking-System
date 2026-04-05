import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, CreditCard, Lock, KeyRound, ShieldCheck } from "lucide-react";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    account_number: "",
    bank_pin: "",
    password: "",
    confirm_password: "",
  });
  const [show, setShow] = useState({
    bank_pin: false,
    password: false,
    confirm_password: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleShow = (field) =>
    setShow({ ...show, [field]: !show[field] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm_password) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await upiAPI.post("/upi/register", {
        account_number: form.account_number,
        bank_pin: form.bank_pin,
        password: form.password,
        confirm_password: form.confirm_password,
      });

      if (res.data.success) {
        toast.success("Account created! Now set your UPI PIN.");
        // account_number set-pin page ke liye save karo
        sessionStorage.setItem("reg_account", form.account_number);
        navigate("/set-pin");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Hero Text */}
        <div style={styles.heroText}>
          <h1 style={styles.heroH1}>
            Payments made{" "}
            <span style={styles.heroAccent}>simple & secure.</span>
          </h1>
          <p style={styles.heroSub}>
            Register with your bank account to start sending and receiving
            money instantly using BankUPI.
          </p>
        </div>

        {/* Features */}
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
          <h2 style={styles.cardTitle}>Create UPI Account</h2>
          <p style={styles.cardSub}>
            Verify your bank account to get started
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Account Number */}
            <Field
              label="ACCOUNT NUMBER"
              icon={<CreditCard size={16} color="#64748b" />}
              type="text"
              name="account_number"
              placeholder="Enter your 10-digit bank account number"
              value={form.account_number}
              onChange={handleChange}
              maxLength={10}
            />

            {/* Bank PIN */}
            <Field
              label="BANK PIN"
              icon={<KeyRound size={16} color="#64748b" />}
              type={show.bank_pin ? "text" : "password"}
              name="bank_pin"
              placeholder="4-6 digit PIN given at bank registration"
              value={form.bank_pin}
              onChange={handleChange}
              hint="This PIN was given when your bank account was created"
              rightIcon={
                <button type="button" style={styles.eyeBtn} onClick={() => toggleShow("bank_pin")}>
                  {show.bank_pin ? <EyeOff size={16} color="#64748b" /> : <Eye size={16} color="#64748b" />}
                </button>
              }
            />

            {/* Password */}
            <Field
              label="PASSWORD"
              icon={<Lock size={16} color="#64748b" />}
              type={show.password ? "text" : "password"}
              name="password"
              placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special"
              value={form.password}
              onChange={handleChange}
              rightIcon={
                <button type="button" style={styles.eyeBtn} onClick={() => toggleShow("password")}>
                  {show.password ? <EyeOff size={16} color="#64748b" /> : <Eye size={16} color="#64748b" />}
                </button>
              }
            />

            {/* Confirm Password */}
            <Field
              label="CONFIRM PASSWORD"
              icon={<Lock size={16} color="#64748b" />}
              type={show.confirm_password ? "text" : "password"}
              name="confirm_password"
              placeholder="Re-enter your password"
              value={form.confirm_password}
              onChange={handleChange}
              rightIcon={
                <button type="button" style={styles.eyeBtn} onClick={() => toggleShow("confirm_password")}>
                  {show.confirm_password ? <EyeOff size={16} color="#64748b" /> : <Eye size={16} color="#64748b" />}
                </button>
              }
            />

            {/* Info box */}
            <div style={styles.infoBox}>
              <ShieldCheck size={15} color="#6366f1" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={styles.infoText}>
                Your bank PIN is used only to verify your identity. It will
                not be stored in the UPI system.
              </span>
            </div>

            {/* Submit */}
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Verifying..." : "Create Account →"}
            </button>
          </form>

          <p style={styles.loginLink}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>

          {/* Footer badges */}
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

// ── Reusable Field Component ──────────────────────────────
function Field({ label, icon, type, name, placeholder, value, onChange, hint, rightIcon, maxLength }) {
  return (
    <div style={styles.fieldWrap}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        <span style={styles.leftIcon}>{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required
          style={styles.input}
        />
        {rightIcon && <span style={styles.rightIconWrap}>{rightIcon}</span>}
      </div>
      {hint && <p style={styles.hint}>{hint}</p>}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a1628 100%)",
  },
  // Left
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
    fontSize: 42,
    fontWeight: 800,
    color: "#f1f5f9",
    lineHeight: 1.2,
    marginBottom: 20,
  },
  heroAccent: {
    color: "#6366f1",
  },
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
  // Right
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
    maxWidth: 460,
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
    marginBottom: 28,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: "#64748b",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 10,
    padding: "0 14px",
    gap: 10,
  },
  leftIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
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
  rightIconWrap: {
    display: "flex",
    alignItems: "center",
  },
  eyeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
  },
  hint: {
    fontSize: 11,
    color: "#475569",
    marginTop: 2,
  },
  infoBox: {
    display: "flex",
    gap: 8,
    background: "#1e1b4b",
    border: "1px solid #312e81",
    borderRadius: 10,
    padding: "12px 14px",
  },
  infoText: {
    fontSize: 12,
    color: "#818cf8",
    lineHeight: 1.5,
  },
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
    transition: "opacity 0.2s",
  },
  loginLink: {
    textAlign: "center",
    fontSize: 13,
    color: "#64748b",
    marginTop: 20,
  },
  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: 600,
  },
  badges: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 24,
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