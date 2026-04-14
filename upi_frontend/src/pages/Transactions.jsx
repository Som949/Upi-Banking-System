import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { upiAPI } from "../utils/api";
import toast from "react-hot-toast";
import { ArrowLeft, CreditCard, Download, Printer } from "lucide-react";

export default function Transactions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const printRef = useRef();

  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  // Auto-fetch on mount
  useEffect(() => {
    if (user?.account_number) fetchTransactions();
  }, []);

  // Apply filters whenever data/filter changes
  useEffect(() => {
    applyFilter(transactions, filter, fromDate, toDate);
  }, [transactions, filter, fromDate, toDate]);

const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await upiAPI.get(
        `/upi/transactions/${user.account_number}`
      );
      console.log("API Response:", res.data); // console mein dekho structure
      
      // Har possible structure handle karo
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data.data?.transactions)) data = res.data.data.transactions;
      else if (Array.isArray(res.data.data)) data = res.data.data;
      
        setTransactions(data);
      console.log("First transaction:", data[0]); // ← ye add karo
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch transactions.");
      setTransactions([]); // error pe empty array
    } finally {
      setLoading(false);
    }
  };

 const applyFilter = (data, f, from, to) => {
    let result = [...data];

    // Source filter
    if (f === "bank") result = result.filter((t) => t.txn_source === "bank");
    if (f === "upi")  result = result.filter((t) => t.txn_source === "upi");

    // Date filter — txn.date field use karo (backend se "date" naam se aata hai)
    if (from) {
      const fromMs = new Date(from).getTime();
      result = result.filter((t) => {
        const txnDate = new Date(t.date || t.txn_timestamp);
        return txnDate.getTime() >= fromMs;
      });
    }

    if (to) {
      const toMs = new Date(to + "T23:59:59").getTime();
      result = result.filter((t) => {
        const txnDate = new Date(t.date || t.txn_timestamp);
        return txnDate.getTime() <= toMs;
      });
    }

    setFiltered(result);
  };

  // Determine credit/debit
  const getAmount = (txn) => {
    const isCredit =
      txn.receiver_account_no === user.account_number ||
      txn.txn_type === "deposit";
    return { isCredit, amount: Number(txn.amount) };
  };

const formatDate = (ts) => {
    console.log("ts value:", ts); // ← add karo
    if (!ts) return "-";
    const d = new Date(ts);
    if (isNaN(d.getTime())) return "-";

    const dd   = String(d.getDate()).padStart(2, "0");
    const mm   = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh   = d.getHours();
    const min  = String(d.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "pm" : "am";
    const hh12 = String(hh % 12 || 12).padStart(2, "0");

    return `${dd}/${mm}/${yyyy}, ${hh12}:${min} ${ampm}`;
  };
  const formatType = (type) =>
    type?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Download CSV
  const downloadCSV = () => {
    const headers = ["Date & Time", "Type", "Amount", "Source", "Status"];
    const rows = filtered.map((t) => {
      const { isCredit, amount } = getAmount(t);
      return [
        formatDate(t.txn_timestamp),
        formatType(t.txn_type),
        `${isCredit ? "+" : "-"}Rs. ${amount}`,
        t.txn_source?.toUpperCase(),
        t.status,
      ];
    });
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${user.account_number}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  return (
    <div style={s.root}>
      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <button style={s.backBtn} onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 style={s.headerTitle}>Transaction History</h2>
            <p style={s.headerSub}>{user?.full_name}</p>
          </div>
        </div>
        <div style={s.headerRight}>
          <div style={s.headerLogo}>
            <div style={s.logoIcon}>
              <CreditCard size={18} color="#6366f1" />
            </div>
            <span style={s.logoText}>BankUPI</span>
          </div>
          <button style={s.iconBtn} onClick={downloadCSV} title="Download CSV">
            <Download size={18} color="#94a3b8" />
          </button>
          <button style={s.iconBtn} onClick={handlePrint} title="Print">
            <Printer size={18} color="#94a3b8" />
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={s.filterBar}>
        {/* Source Filter */}
        <div style={s.filterLeft}>
          {["all", "bank", "upi"].map((f) => (
            <button
              key={f}
              style={{ ...s.filterBtn, ...(filter === f ? s.filterBtnActive : {}) }}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "bank" ? "Bank Only" : "UPI Only"}
            </button>
          ))}
        </div>

        {/* Date Range */}
        <div style={s.dateRange}>
          <span style={s.dateLabel}>Date Range:</span>
          <input
            type="date"
            style={s.dateInput}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span style={s.dateLabel}>to</span>
          <input
            type="date"
            style={s.dateInput}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div style={s.tableWrap} ref={printRef}>
        <table style={s.table}>
          <thead>
            <tr style={s.thead}>
              <th style={s.th}>DATE & TIME</th>
              <th style={s.th}>TYPE</th>
              <th style={s.th}>AMOUNT</th>
              <th style={s.th}>SOURCE</th>
              <th style={s.th}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={s.emptyCell}>Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={s.emptyCell}>No transactions found.</td>
              </tr>
            ) : (
              filtered.map((txn, i) => {
                const { isCredit, amount } = getAmount(txn);
                return (
                  <tr
                    key={txn.txn_id || i}
                    style={{
                      ...s.tr,
                      background: i % 2 === 0 ? "#0a0f1e" : "#0d1526",
                    }}
                  >
                    <td style={s.td}>{formatDate(txn.date || txn.txn_timestamp)}</td>
                    <td style={s.td}>{formatType(txn.txn_type)}</td>
                    <td style={{ ...s.td, color: isCredit ? "#4ade80" : "#f87171", fontWeight: 700 }}>
                      {isCredit ? "+" : "-"}Rs. {amount.toLocaleString("en-IN")}
                    </td>
                    <td style={s.td}>
                      <span style={{
                        ...s.sourceBadge,
                        background: txn.txn_source === "upi" ? "#052e16" : "#0c1a2e",
                        border: `1px solid ${txn.txn_source === "upi" ? "#065f46" : "#0369a1"}`,
                        color: txn.txn_source === "upi" ? "#4ade80" : "#38bdf8",
                      }}>
                        {txn.txn_source === "upi" ? "🧾" : "🏦"} {txn.txn_source?.toUpperCase()}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={s.successBadge}>
                        ● {txn.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Bottom Buttons ── */}
      {filtered.length > 0 && (
        <div style={s.bottomBar}>
          <button style={s.printBtn} onClick={handlePrint}>
            <Printer size={16} /> Print
          </button>
          <button style={s.downloadBtn} onClick={downloadCSV}>
            <Download size={16} /> Download CSV
          </button>
        </div>
      )}
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
    padding: "20px 32px",
    borderBottom: "1px solid #1e293b",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 16 },
  backBtn: {
    background: "transparent", border: "1px solid #334155",
    borderRadius: 8, width: 36, height: 36,
    display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", color: "#94a3b8",
  },
  headerTitle: { fontSize: 22, fontWeight: 700, color: "#f1f5f9", margin: 0 },
  headerSub: { fontSize: 12, color: "#64748b", margin: 0 },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  headerLogo: { display: "flex", alignItems: "center", gap: 8 },
  logoIcon: {
    background: "#1e1b4b", borderRadius: 8,
    width: 32, height: 32, display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  logoText: { fontSize: 16, fontWeight: 700, color: "#f1f5f9" },
  iconBtn: {
    background: "transparent", border: "1px solid #334155",
    borderRadius: 8, width: 36, height: 36,
    display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer",
  },
  filterBar: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    borderBottom: "1px solid #1e293b",
    flexWrap: "wrap", gap: 12,
  },
  filterLeft: { display: "flex", gap: 8 },
  filterBtn: {
    background: "transparent", border: "1px solid #334155",
    borderRadius: 8, padding: "8px 18px",
    color: "#64748b", fontSize: 14,
    fontWeight: 600, cursor: "pointer",
  },
  filterBtnActive: {
    background: "#6366f1", border: "1px solid #6366f1",
    color: "#fff",
  },
  dateRange: { display: "flex", alignItems: "center", gap: 8 },
  dateLabel: { fontSize: 13, color: "#64748b" },
  dateInput: {
    background: "#1e293b", border: "1px solid #334155",
    borderRadius: 8, padding: "7px 12px",
    color: "#f1f5f9", fontSize: 13, outline: "none",
  },
  tableWrap: { flex: 1, overflowX: "auto", padding: "0 32px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
  thead: { borderBottom: "1px solid #1e293b" },
  th: {
    padding: "14px 16px", textAlign: "left",
    fontSize: 11, fontWeight: 700,
    letterSpacing: "0.06em", color: "#475569",
  },
  tr: { borderBottom: "1px solid #1e293b" },
  td: {
    padding: "14px 16px", fontSize: 14,
    color: "#cbd5e1",
  },
  emptyCell: {
    padding: "48px", textAlign: "center",
    color: "#475569", fontSize: 14,
  },
  sourceBadge: {
    display: "inline-flex", alignItems: "center", gap: 4,
    borderRadius: 20, padding: "4px 12px",
    fontSize: 12, fontWeight: 600,
  },
  successBadge: {
    display: "inline-flex", alignItems: "center", gap: 4,
    background: "#052e16", border: "1px solid #065f46",
    borderRadius: 20, padding: "4px 12px",
    fontSize: 12, fontWeight: 600, color: "#4ade80",
  },
  bottomBar: {
    display: "flex", justifyContent: "flex-end",
    gap: 12, padding: "20px 32px",
    borderTop: "1px solid #1e293b",
  },
  printBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "transparent", border: "1px solid #334155",
    borderRadius: 8, padding: "10px 20px",
    color: "#94a3b8", fontSize: 14,
    fontWeight: 600, cursor: "pointer",
  },
  downloadBtn: {
    display: "flex", alignItems: "center", gap: 8,
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    border: "none", borderRadius: 8,
    padding: "10px 20px", color: "#fff",
    fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
};