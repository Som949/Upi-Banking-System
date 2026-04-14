import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";
import { ArrowLeft, CreditCard, Wallet, Eye, EyeOff } from "lucide-react";

export default function Balance() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();

    if (pin.length < 4) {
      toast.error("Enter a valid UPI PIN.");
      return;
    }

    setLoading(true);
    try {
      const res = await upiAPI.post("/upi/balance", {
        account_number: user.account_number,
        upi_pin: pin,
      });

   if (res.data.success) {
        // API response structure check — jo bhi field ho
        const bal =
          res.data.balance ??
          res.data.data?.balance ??
          res.data.data ??
          0;
        setBalance(bal);
        console.log("API Response:", res.data); // check karo console mein
        setPin("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch balance.");
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.root}>
      {/* Header */}
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

      {/* Content */}
      <div style={s.content}>
        <div style={s.card}>

          {/* Icon */}
          <div style={s.walletIcon}>
            <Wallet size={36} color="#0ea5e9" />
          </div>

          <h2 style={s.cardTitle}>Check Balance</h2>
          <p style={s.cardSub}>
            Enter your UPI PIN to view your available balance.
          </p>

          {/* Balance Display */}
         {balance !== null && (
            <>
              <div style={s.balanceBox}>
                <p style={s.balanceLabel}>AVAILABLE BALANCE</p>
                <p style={s.balanceAmt}>
                  ₹ {Number(balance).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p style={s.balanceAcc}>
                  Account: XXXXXX{user?.account_number?.slice(-4)}
                </p>
              </div>
              <button
                style={s.backToDashBtn}
                onClick={() => navigate("/dashboard")}
              >
                ← Back to Dashboard
              </button>
            </>
          )}

          {/* PIN Form */}
         {/* PIN Form — balance show hone ke baad hide ho jaayega */}
          <form onSubmit={handleCheck} style={{ ...s.form, display: balance !== null ? "none" : "flex" }}>
            <div style={s.fieldWrap}>
              <label style={s.label}>UPI PIN</label>
              <div style={s.inputWrap}>
                <span style={{ fontSize: 16 }}>🔑</span>
                <input
                  type={showPin ? "text" : "password"}
                  placeholder="Enter your UPI PIN"
                  value={pin}
                  onChange={(e) =>
                    setPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  inputMode="numeric"
                  autoFocus
                  required
                  style={{ ...s.input, letterSpacing: "0.3em", fontSize: 18 }}
                />
                <button
                  type="button"
                  style={s.eyeBtn}
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin
                    ? <EyeOff size={16} color="#64748b" />
                    : <Eye size={16} color="#64748b" />}
                </button>
              </div>
            </div>

            {/* Info */}
            <div style={s.infoBox}>
              <span>🛡️</span>
              <span style={s.infoText}>
                Your PIN is never stored. This is only used to verify your
                identity.
              </span>
            </div>

            <button
              type="submit"
              style={s.btnPrimary}
              disabled={loading || pin.length < 4}
            >
              {loading ? "Checking..." : "Check Balance →"}
            </button>
          </form>

          {/* Badges */}
          <div style={s.badges}>
            {["AES-256", "BCRYPT", "JWT AUTH"].map((b) => (
              <span key={b} style={s.badge}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {

    backToDashBtn: {
    width: "100%",
    background: "transparent",
    color: "#6366f1",
    border: "1px solid #312e81",
    borderRadius: 10,
    padding: "13px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 16,
  },    

  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f1e 0%, #0d1526 50%, #0a1628 100%)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
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
    flex: 1, display: "flex",
    alignItems: "center", justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 20, padding: "40px 36px",
    width: "100%", maxWidth: 440,
    display: "flex", flexDirection: "column",
    alignItems: "center",
  },
  walletIcon: {
    width: 72, height: 72, borderRadius: 16,
    background: "#0c1a2e", border: "1px solid #0369a1",
    display: "flex", alignItems: "center",
    justifyContent: "center", marginBottom: 20,
  },
  cardTitle: {
    fontSize: 26, fontWeight: 700,
    color: "#f1f5f9", marginBottom: 6,
    textAlign: "center",
  },
  cardSub: {
    fontSize: 14, color: "#64748b",
    marginBottom: 28, textAlign: "center",
    lineHeight: 1.6,
  },
  // Balance Box
  balanceBox: {
    width: "100%",
    background: "linear-gradient(135deg, #0c1a2e, #0d1f35)",
    border: "1px solid #0369a1",
    borderRadius: 14, padding: "24px",
    textAlign: "center", marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 10, fontWeight: 700,
    letterSpacing: "0.1em", color: "#0ea5e9",
    marginBottom: 8,
  },
  balanceAmt: {
    fontSize: 36, fontWeight: 800,
    color: "#f1f5f9", marginBottom: 8,
  },
  balanceAcc: {
    fontSize: 12, color: "#475569",
  },
  // Form
  form: {
    width: "100%",
    display: "flex", flexDirection: "column", gap: 16,
  },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontSize: 11, fontWeight: 600,
    letterSpacing: "0.08em", color: "#64748b",
  },
  inputWrap: {
    display: "flex", alignItems: "center",
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: 10, padding: "0 14px", gap: 10,
  },
  input: {
    flex: 1, background: "transparent",
    border: "none", outline: "none",
    color: "#f1f5f9", fontSize: 15,
    padding: "13px 0",
  },
  eyeBtn: {
    background: "none", border: "none",
    cursor: "pointer", display: "flex",
    alignItems: "center", padding: 0,
  },
  infoBox: {
    display: "flex", gap: 8,
    background: "#1e1b4b", border: "1px solid #312e81",
    borderRadius: 10, padding: "12px 14px",
  },
  infoText: { fontSize: 12, color: "#818cf8", lineHeight: 1.5 },
  btnPrimary: {
    width: "100%",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff", border: "none", borderRadius: 10,
    padding: "14px", fontSize: 15, fontWeight: 600,
    cursor: "pointer",
  },
  badges: {
    display: "flex", justifyContent: "center",
    gap: 12, marginTop: 24,
    paddingTop: 16, borderTop: "1px solid #1e293b",
    width: "100%",
  },
  badge: {
    fontSize: 9, color: "#334155",
    letterSpacing: "0.06em", fontWeight: 600,
  },
};