import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";
import { ArrowLeft, Building2, Smartphone, Info, Zap, CheckCircle, CreditCard } from "lucide-react";

// ── Stage 1: Transfer Form ────────────────────────────────
function TransferForm({ onProceed }) {
  const [tab, setTab] = useState("account");
  const [form, setForm] = useState({ receiver: "", amount: "" });

  const handleProceed = () => {
    if (!form.receiver || !form.amount) {
      toast.error("Please fill all fields.");
      return;
    }
    if (Number(form.amount) <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }
    if (Number(form.amount) > 25000) {
      toast.error("Per transaction limit is Rs. 25,000.");
      return;
    }
    onProceed({ tab, ...form });
  };

  return (
    <div style={s.card}>
      <h2 style={s.cardTitle}>Transfer Money</h2>
      <p style={s.cardSub}>Move funds instantly and securely.</p>

      {/* Tabs */}
      <div style={s.tabs}>
        <button
          style={{ ...s.tab, ...(tab === "account" ? s.tabActive : {}) }}
          onClick={() => { setTab("account"); setForm({ receiver: "", amount: "" }); }}
        >
          <Building2 size={15} /> By Account Number
        </button>
        <button
          style={{ ...s.tab, ...(tab === "upi" ? s.tabActive : {}) }}
          onClick={() => { setTab("upi"); setForm({ receiver: "", amount: "" }); }}
        >
          <Smartphone size={15} /> By UPI Address
        </button>
      </div>

      {/* Receiver Field */}
      <div style={s.fieldWrap}>
        <label style={s.label}>
          {tab === "account" ? "RECEIVER ACCOUNT NUMBER" : "RECEIVER UPI ADDRESS"}
        </label>
        <div style={s.inputWrap}>
          {tab === "account"
            ? <Building2 size={16} color="#64748b" />
            : <Smartphone size={16} color="#64748b" />}
          <input
            style={s.input}
            type="text"
            placeholder={tab === "account" ? "Enter 10-digit account number" : "e.g. 9876543210@bankupi"}
            value={form.receiver}
            onChange={(e) => setForm({ ...form, receiver: e.target.value })}
            maxLength={tab === "account" ? 10 : 30}
          />
        </div>
      </div>

      {/* Amount Field */}
      <div style={{ ...s.fieldWrap, marginTop: 16 }}>
        <label style={s.label}>AMOUNT (RS.)</label>
        <div style={s.inputWrap}>
          <span style={{ color: "#6366f1", fontWeight: 700, fontSize: 18 }}>₹</span>
          <input
            style={{ ...s.input, fontSize: 22, fontWeight: 600 }}
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            min={1}
            max={25000}
          />
        </div>
      </div>

      {/* Send Button */}
      <button style={s.btnPrimary} onClick={handleProceed}>
        Send Money →
      </button>

      {/* Limits */}
      <div style={s.limitsRow}>
        <div style={s.limitPill}>
          <Info size={13} color="#6366f1" />
          <div>
            <p style={s.limitLabel}>TRANSACTION LIMIT</p>
            <p style={s.limitVal}>Per Transaction Max: Rs. 25,000</p>
          </div>
        </div>
        <div style={s.limitPill}>
          <Zap size={13} color="#f59e0b" />
          <div>
            <p style={s.limitLabel}>DAILY LIMIT</p>
            <p style={s.limitVal}>Daily UPI Limit: Rs. 1,00,000</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={s.footerBadges}>
        {["PCI-DSS COMPLIANT", "256-BIT AES ENCRYPTION", "NPCI CERTIFIED"].map(b => (
          <span key={b} style={s.badge}>{b}</span>
        ))}
      </div>
    </div>
  );
}

// ── Stage 2: PIN Numpad Modal ─────────────────────────────
function PinModal({ txnData, onConfirm, onCancel, loading }) {
  const [pin, setPin] = useState("");

  return (
    <div style={s.overlay}>
      <div style={s.pinCard}>
        <div style={s.lockCircle}>🔐</div>

        <h3 style={s.pinTitle}>Confirm Payment</h3>
        <p style={s.pinSub}>Enter your UPI PIN to authorize</p>
        <p style={s.pinAmount}>
          AMOUNT:{" "}
          <span style={{ color: "#6366f1" }}>
            ₹ {Number(txnData.amount).toLocaleString("en-IN")}
          </span>
        </p>

       

        {/* Keyboard Input */}
        <div style={s.fieldWrap}>
          <label style={s.label}>ENTER UPI PIN</label>
          <div style={s.inputWrap}>
            <span style={{ fontSize: 18 }}>🔑</span>
            <input
              type="password"
              placeholder="Type your PIN"
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
              inputMode="numeric"
              autoFocus
              style={{ ...s.input, letterSpacing: "0.4em", fontSize: 20 }}
            />
          </div>
        </div>

        <button
          style={{ ...s.btnPrimary, marginTop: 16 }}
          onClick={() => onConfirm(pin)}
          disabled={pin.length < 4 || loading}
        >
          {loading ? "Processing..." : "Confirm Pay"}
        </button>
        <button style={s.btnCancel} onClick={onCancel}>
          Cancel
        </button>

        <p style={{ ...s.badge, marginTop: 16, textAlign: "center" }}>
          🔒 SECURED BY 256-BIT ENCRYPTION
        </p>
      </div>
    </div>
  );
}
// ── Stage 3: Success Screen ───────────────────────────────
function SuccessScreen({ result, txnData, onDashboard, onAnother }) {
  return (
    <div style={s.overlay}>
      <div style={s.successCard}>
        {/* Check Icon */}
        <div style={s.checkCircle}>
          <CheckCircle size={40} color="#6366f1" />
        </div>

        <h3 style={s.successTitle}>Transaction Successful</h3>
        <p style={s.successSub}>
          Rs. {Number(txnData.amount).toLocaleString("en-IN")} sent to{" "}
          <span style={{ color: "#6366f1", fontWeight: 600 }}>
            {result?.data?.receiver?.full_name || "Recipient"}
          </span>
        </p>

        {/* Cashback Box */}
        {result?.reward && (
          <div style={s.cashbackBox}>
            <div style={s.cashbackIcon}>💚</div>
            <div>
              <p style={s.cashbackLabel}>CASHBACK EARNED</p>
              <p style={s.cashbackText}>
                {result.reward.percentage} cashback! Rs.{" "}
                {result.reward.cashback_received} added to your account.
              </p>
            </div>
          </div>
        )}

        {/* New Balance */}
        <div style={s.balanceRow}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CreditCard size={16} color="#64748b" />
            <span style={s.balanceLabel}>New Balance</span>
          </div>
          <span style={s.balanceVal}>
            Rs. {Number(result?.data?.sender?.new_balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Buttons */}
        <button style={s.btnPrimary} onClick={onDashboard}>Dashboard</button>
        <button style={s.btnOutline} onClick={onAnother}>Another Transfer</button>

        <p style={{ ...s.badge, marginTop: 16, textAlign: "center" }}>🔒 SECURED BY BANKUPI ENCRYPTION</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
export default function Transfer() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stage, setStage] = useState(1); // 1=form, 2=pin, 3=success
  const [txnData, setTxnData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProceed = (data) => {
    setTxnData(data);
    setStage(2);
  };

  const handleConfirm = async (pin) => {
    if (!pin || pin.length < 4) {
      toast.error("Enter a valid PIN.");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (txnData.tab === "account") {
        res = await upiAPI.post("/upi/transfer/by-account", {
          sender_account_number: user.account_number,
          receiver_account_number: txnData.receiver,
          amount: Number(txnData.amount),
          upi_pin: pin,
        });
      } else {
        res = await upiAPI.post("/upi/transfer/by-upi", {
          sender_account_number: user.account_number,
          receiver_upi_address: txnData.receiver,
          amount: Number(txnData.amount),
          upi_pin: pin,
        });
      }

      if (res.data.success) {
        setResult(res.data);
        setStage(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed.");
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
          <div style={s.logoIcon}><CreditCard size={18} color="#6366f1" /></div>
          <span style={s.logoText}>BankUPI</span>
        </div>
      </div>

      {/* Content */}
      <div style={s.content}>
        {stage === 1 && <TransferForm onProceed={handleProceed} />}
        {stage === 2 && (
          <PinModal
            txnData={txnData}
            onConfirm={handleConfirm}
            onCancel={() => setStage(1)}
            loading={loading}
          />
        )}
        {stage === 3 && (
          <SuccessScreen
            result={result}
            txnData={txnData}
            onDashboard={() => navigate("/dashboard")}
            onAnother={() => { setStage(1); setTxnData(null); setResult(null); }}
          />
        )}
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────
const s = {
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
  // Card
  card: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 20, padding: "36px 32px",
    width: "100%", maxWidth: 480,
  },
  cardTitle: { fontSize: 26, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 },
  cardSub: { fontSize: 14, color: "#64748b", marginBottom: 24 },
  // Tabs
  tabs: {
    display: "flex", background: "#1e293b",
    borderRadius: 10, padding: 4, marginBottom: 24,
  },
  tab: {
    flex: 1, display: "flex", alignItems: "center",
    justifyContent: "center", gap: 6,
    background: "transparent", border: "none",
    borderRadius: 8, padding: "10px 12px",
    color: "#64748b", fontSize: 13,
    fontWeight: 600, cursor: "pointer",
  },
  tabActive: {
    background: "#0f172a",
    color: "#f1f5f9",
    border: "1px solid #334155",
  },
  // Fields
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "#64748b" },
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
  // Buttons
  btnPrimary: {
    width: "100%", background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff", border: "none", borderRadius: 10,
    padding: "14px", fontSize: 15, fontWeight: 600,
    cursor: "pointer", marginTop: 20,
  },
  btnCancel: {
    width: "100%", background: "transparent",
    color: "#94a3b8", border: "none",
    borderRadius: 10, padding: "12px",
    fontSize: 14, cursor: "pointer", marginTop: 8,
  },
  btnOutline: {
    width: "100%", background: "transparent",
    color: "#6366f1", border: "1px solid #312e81",
    borderRadius: 10, padding: "13px",
    fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 10,
  },
  // Limits
  limitsRow: {
    display: "flex", gap: 12, marginTop: 20,
  },
  limitPill: {
    flex: 1, display: "flex", gap: 8,
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: 10, padding: "10px 12px",
  },
  limitLabel: { fontSize: 9, color: "#475569", fontWeight: 600, letterSpacing: "0.06em", margin: 0 },
  limitVal: { fontSize: 12, color: "#94a3b8", margin: 0, marginTop: 2 },
  footerBadges: {
    display: "flex", justifyContent: "center",
    gap: 12, marginTop: 20,
    paddingTop: 16, borderTop: "1px solid #1e293b",
  },
  badge: { fontSize: 9, color: "#334155", letterSpacing: "0.06em", fontWeight: 600 },
  // Overlay
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: 100,
    backdropFilter: "blur(4px)",
  },
  // PIN Card
  pinCard: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 20, padding: "32px 28px",
    width: "100%", maxWidth: 360,
    display: "flex", flexDirection: "column",
    alignItems: "center",
  },
  lockCircle: {
    fontSize: 36, marginBottom: 16,
  },
  pinTitle: { fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 4, textAlign: "center" },
  pinSub: { fontSize: 13, color: "#64748b", marginBottom: 8, textAlign: "center" },
  pinAmount: { fontSize: 13, color: "#94a3b8", marginBottom: 16, textAlign: "center", fontWeight: 600 },
  pinDots: { display: "flex", gap: 10, marginBottom: 24 },
  dot: {
    width: 12, height: 12, borderRadius: "50%",
    border: "2px solid #334155", background: "transparent",
    transition: "background 0.2s",
  },
  dotFilled: { background: "#6366f1", border: "2px solid #6366f1" },
  numpad: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10, width: "100%",
  },
  numKey: {
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: 10, padding: "16px",
    color: "#f1f5f9", fontSize: 18, fontWeight: 600,
    cursor: "pointer",
  },
  numKeyEmpty: { background: "transparent", border: "none", cursor: "default" },
  // Success
  successCard: {
    background: "#0f172a", border: "1px solid #1e293b",
    borderRadius: 20, padding: "36px 32px",
    width: "100%", maxWidth: 380,
    display: "flex", flexDirection: "column",
    alignItems: "center",
  },
  checkCircle: {
    width: 72, height: 72, borderRadius: "50%",
    background: "#1e1b4b", border: "1px solid #312e81",
    display: "flex", alignItems: "center",
    justifyContent: "center", marginBottom: 20,
  },
  successTitle: { fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 6, textAlign: "center" },
  successSub: { fontSize: 14, color: "#94a3b8", marginBottom: 20, textAlign: "center" },
  cashbackBox: {
    display: "flex", gap: 10, alignItems: "flex-start",
    background: "#052e16", border: "1px solid #065f46",
    borderRadius: 10, padding: "12px 14px",
    width: "100%", marginBottom: 16,
  },
  cashbackIcon: { fontSize: 18 },
  cashbackLabel: { fontSize: 9, color: "#34d399", fontWeight: 700, letterSpacing: "0.06em", margin: 0 },
  cashbackText: { fontSize: 12, color: "#6ee7b7", margin: 0, marginTop: 2, lineHeight: 1.5 },
  balanceRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", width: "100%",
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: 10, padding: "12px 16px", marginBottom: 4,
  },
  balanceLabel: { fontSize: 14, color: "#94a3b8" },
  balanceVal: { fontSize: 16, fontWeight: 700, color: "#f1f5f9" },
};