export default function VaultTransactionHistory() {
  const transactions = [
    {
      date: "12/10/2023",
      time: "14:45",
      type: "UPI Transfer",
      icon: "send",
      iconColor: "#8fa5ff",
      source: "UPI",
      sourceBg: "rgba(16,185,129,0.1)",
      sourceColor: "#34d399",
      sourceBorder: "rgba(16,185,129,0.2)",
      status: "Success",
      statusIcon: "check_circle",
      statusColor: "#34d399",
      amount: "- $1,200.00",
      amountColor: "rgba(255,180,171,0.8)",
    },
    {
      date: "11/10/2023",
      time: "09:12",
      type: "Bank Deposit",
      icon: "account_balance",
      iconColor: "#bdc6e1",
      source: "Bank",
      sourceBg: "rgba(59,130,246,0.1)",
      sourceColor: "#60a5fa",
      sourceBorder: "rgba(59,130,246,0.2)",
      status: "Success",
      statusIcon: "check_circle",
      statusColor: "#34d399",
      amount: "+ $15,450.00",
      amountColor: "#34d399",
    },
    {
      date: "10/10/2023",
      time: "18:30",
      type: "Cashback Reward",
      icon: "card_giftcard",
      iconColor: "#ffb68b",
      source: "Cashback",
      sourceBg: "rgba(245,158,11,0.1)",
      sourceColor: "#fbbf24",
      sourceBorder: "rgba(245,158,11,0.2)",
      status: "Success",
      statusIcon: "check_circle",
      statusColor: "#34d399",
      amount: "+ $45.20",
      amountColor: "#34d399",
    },
    {
      date: "09/10/2023",
      time: "11:05",
      type: "Withdrawal",
      icon: "atm",
      iconColor: "#ffb4ab",
      source: "Bank",
      sourceBg: "rgba(59,130,246,0.1)",
      sourceColor: "#60a5fa",
      sourceBorder: "rgba(59,130,246,0.2)",
      status: "Failed",
      statusIcon: "error",
      statusColor: "rgba(255,180,171,0.8)",
      amount: "- $500.00",
      amountColor: "rgba(255,180,171,0.8)",
    },
    {
      date: "08/10/2023",
      time: "20:15",
      type: "UPI Received",
      icon: "call_received",
      iconColor: "#34d399",
      source: "UPI",
      sourceBg: "rgba(16,185,129,0.1)",
      sourceColor: "#34d399",
      sourceBorder: "rgba(16,185,129,0.2)",
      status: "Success",
      statusIcon: "check_circle",
      statusColor: "#34d399",
      amount: "+ $2,100.00",
      amountColor: "#34d399",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        :root {
          --surface-container: #11141d;
          --background: #090c14;
          --secondary: #bdc6e1;
          --surface-container-highest: #1c212e;
          --primary: #8fa5ff;
          --error: #ffb4ab;
          --surface: #090c14;
          --on-surface: #dee2f2;
          --surface-container-high: #151924;
          --surface-container-lowest: #06090f;
          --tertiary: #ffb68b;
          --outline-variant: #333742;
          --outline: #6d7081;
          --on-surface-variant: #a7a9b8;
          --on-primary-fixed: #001454;
          --primary-container: #6c88ff;
          --primary-fixed-dim: #b8c4ff;
          --surface-bright: #222735;
          --surface-container-low: #0d101a;
          --on-background: #dee2f2;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #090c14; }
        ::-webkit-scrollbar-thumb { background: #1c212e; border-radius: 10px; }

        .vault-filter-input {
          background-color: #0d101a;
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-size: 0.875rem;
          width: 100%;
          border-radius: 0.75rem;
          padding: 0.875rem 1rem 0.875rem 3rem;
          outline: none;
          box-sizing: border-box;
          transition: box-shadow 0.2s, border-color 0.2s;
        }

        .vault-filter-input::placeholder { color: rgba(109,112,129,0.4); }
        .vault-filter-input:focus {
          box-shadow: 0 0 0 2px rgba(143,165,255,0.2);
          border-color: rgba(143,165,255,0.5);
        }

        .vault-select {
          background-color: #0d101a;
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-size: 0.875rem;
          width: 100%;
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          outline: none;
          appearance: none;
          cursor: pointer;
          box-sizing: border-box;
          transition: box-shadow 0.2s, border-color 0.2s;
        }

        .vault-select:focus {
          box-shadow: 0 0 0 2px rgba(143,165,255,0.2);
          border-color: rgba(143,165,255,0.5);
        }

        .vault-tr:hover { background: rgba(255,255,255,0.02); }

        .vault-export-btn:hover { background: var(--surface-container-highest); }
        .vault-export-btn:active { transform: scale(0.95); }
        .vault-export-btn:hover .vault-export-icon { color: var(--on-surface); }

        .vault-advanced-btn:hover { background: var(--surface-container-highest); }
        .vault-advanced-btn:hover .vault-filter-icon { color: var(--on-surface); }

        .vault-page-btn:hover {
          color: var(--on-surface);
          background: var(--surface-container-highest);
        }
      `}</style>

      <div style={{ backgroundColor: "#090c14", color: "var(--on-surface)", fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
        <main style={{ width: "100%", minHeight: "100vh" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 2.5rem" }}>

            {/* Header */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem" }}>
              <div>
                {/* Breadcrumb */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--outline)", fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>
                  <span>Main</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "0.625rem" }}>chevron_right</span>
                  <span style={{ color: "var(--primary)" }}>History</span>
                </div>
                <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "3.75rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1rem", margin: 0 }}>
                  Transaction History
                </h1>
                <p style={{ color: "var(--on-surface-variant)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "42rem", marginTop: "1rem" }}>
                  Monitor your wealth movements with precise, real-time data across all connected accounts.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  className="vault-export-btn"
                  style={{
                    background: "rgba(28,33,46,0.4)",
                    color: "var(--on-surface)",
                    padding: "0.875rem 1.5rem",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span className="material-symbols-outlined vault-export-icon" style={{ fontSize: "1.25rem", color: "var(--outline)", transition: "color 0.2s" }}>download</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div style={{ background: "rgba(17,20,29,0.6)", borderRadius: "2.5rem", padding: "2.5rem", marginBottom: "2.5rem", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "4fr 3fr 3fr 2fr", gap: "2.5rem", alignItems: "flex-end" }}>

                {/* View Mode */}
                <div>
                  <label style={{ display: "block", fontSize: "0.625rem", fontWeight: 700, color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem", marginLeft: "0.25rem" }}>
                    View Mode
                  </label>
                  <div style={{ display: "flex", padding: "0.375rem", background: "#0d101a", borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <button style={{ flex: 1, padding: "0.625rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 700, background: "rgba(108,136,255,0.2)", color: "var(--primary)", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>All</button>
                    <button style={{ flex: 1, padding: "0.625rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>UPI Only</button>
                    <button style={{ flex: 1, padding: "0.625rem 1rem", borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Bank Only</button>
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label style={{ display: "block", fontSize: "0.625rem", fontWeight: 700, color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem", marginLeft: "0.25rem" }}>
                    Date Range
                  </label>
                  <div style={{ position: "relative" }}>
                    <span className="material-symbols-outlined" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--outline)", fontSize: "1.125rem" }}>calendar_month</span>
                    <input className="vault-filter-input" placeholder="Select duration..." type="text" />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label style={{ display: "block", fontSize: "0.625rem", fontWeight: 700, color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem", marginLeft: "0.25rem" }}>
                    Status
                  </label>
                  <div style={{ position: "relative" }}>
                    <select className="vault-select">
                      <option>All Statuses</option>
                      <option>Success</option>
                      <option>Failed</option>
                      <option>Processing</option>
                    </select>
                    <span className="material-symbols-outlined" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--outline)", pointerEvents: "none" }}>expand_more</span>
                  </div>
                </div>

                {/* Advanced Filter */}
                <div>
                  <button
                    className="vault-advanced-btn"
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      background: "rgba(28,33,46,0.4)",
                      color: "var(--on-surface)",
                      borderRadius: "0.75rem",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      border: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      fontFamily: "Inter, sans-serif",
                      transition: "background 0.2s",
                    }}
                  >
                    <span className="material-symbols-outlined vault-filter-icon" style={{ fontSize: "1.125rem", color: "var(--outline)", transition: "color 0.2s" }}>filter_list</span>
                    <span>Advanced Filters</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ background: "rgba(17,20,29,0.6)", borderRadius: "2.5rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(13,16,26,0.8)" }}>
                      {["Date & Time", "Transaction Type", "Source", "Status", "Amount"].map((h, i) => (
                        <th
                          key={h}
                          style={{
                            padding: "1.75rem 2rem 1.75rem " + (i === 0 || i === 4 ? "2.5rem" : "2rem"),
                            fontSize: "0.625rem",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "var(--outline)",
                            textAlign: i === 4 ? "right" : "left",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, idx) => (
                      <tr
                        key={idx}
                        className="vault-tr"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.15s" }}
                      >
                        {/* Date */}
                        <td style={{ padding: "2rem 2rem 2rem 2.5rem" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                            <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>{tx.date}</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--outline)", fontWeight: 500 }}>{tx.time}</span>
                          </div>
                        </td>
                        {/* Type */}
                        <td style={{ padding: "2rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem", background: "var(--surface-container-lowest)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
                              <span className="material-symbols-outlined" style={{ color: tx.iconColor, fontSize: "1.25rem" }}>{tx.icon}</span>
                            </div>
                            <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>{tx.type}</span>
                          </div>
                        </td>
                        {/* Source */}
                        <td style={{ padding: "2rem" }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            fontSize: "0.5625rem",
                            fontWeight: 900,
                            background: tx.sourceBg,
                            color: tx.sourceColor,
                            border: `1px solid ${tx.sourceBorder}`,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}>
                            {tx.source}
                          </span>
                        </td>
                        {/* Status */}
                        <td style={{ padding: "2rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: tx.statusColor }}>
                            <span className="material-symbols-outlined" style={{ fontSize: "1.125rem", fontVariationSettings: "'FILL' 1" }}>{tx.statusIcon}</span>
                            <span style={{ fontSize: "0.625rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>{tx.status}</span>
                          </div>
                        </td>
                        {/* Amount */}
                        <td style={{ padding: "2rem 2.5rem 2rem 2rem", textAlign: "right" }}>
                          <span style={{ fontSize: "1.125rem", fontWeight: 900, fontFamily: "Manrope, sans-serif", color: tx.amountColor }}>{tx.amount}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ padding: "2rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(13,16,26,0.5)" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--outline)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Showing <span style={{ color: "var(--on-surface)" }}>1-10</span> of <span style={{ color: "var(--on-surface)" }}>452</span> entries
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {/* Prev */}
                  <button className="vault-page-btn" style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#0d101a", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--outline)", cursor: "pointer", transition: "all 0.2s" }}>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  {/* Active page */}
                  <button style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "rgba(108,136,255,0.2)", color: "var(--primary)", fontWeight: 900, fontSize: "0.875rem", border: "none", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(143,165,255,0.1)" }}>1</button>
                  {/* Pages */}
                  {[2, 3].map((p) => (
                    <button key={p} className="vault-page-btn" style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#0d101a", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--outline)", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem", transition: "all 0.2s" }}>{p}</button>
                  ))}
                  <span style={{ color: "rgba(51,55,66,0.4)", fontWeight: 900, margin: "0 0.5rem" }}>...</span>
                  <button className="vault-page-btn" style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#0d101a", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--outline)", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem", transition: "all 0.2s" }}>45</button>
                  {/* Next */}
                  <button className="vault-page-btn" style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "#0d101a", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--outline)", cursor: "pointer", transition: "all 0.2s" }}>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}