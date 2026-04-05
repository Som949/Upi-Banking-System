export default function VaultRewards() {
  const rewards = [
    { date: "24/10/2023", reason: "0.35% cashback on Rs. 500 transfer", amount: "Rs. 1.75" },
    { date: "20/10/2023", reason: "0.35% cashback on Rs. 2,000 transfer", amount: "Rs. 7.00" },
    { date: "15/10/2023", reason: "Welcome reward: Initial deposit bonus", amount: "Rs. 25.00" },
    { date: "08/10/2023", reason: "0.35% cashback on Rs. 1,500 transfer", amount: "Rs. 5.25" },
    { date: "02/10/2023", reason: "0.35% cashback on Rs. 2,357 transfer", amount: "Rs. 8.25" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        :root {
          --outline: #8e90a1;
          --on-surface-variant: #c4c5d7;
          --on-surface: #dee2f2;
          --surface-container-highest: #303541;
          --primary-container: #6c88ff;
          --primary-fixed: #dde1ff;
          --secondary-container: #3e465d;
          --secondary: #bdc6e1;
          --surface-container-lowest: #090e19;
          --on-background: #dee2f2;
          --surface-container-high: #252a36;
          --surface-dim: #0e131e;
          --on-primary-fixed: #001454;
          --surface: #0e131e;
          --surface-container: #1b1f2b;
          --background: #0e131e;
          --tertiary-container: #e2711a;
          --surface-container-low: #171b27;
          --primary-fixed-dim: #b8c4ff;
          --tertiary: #ffb68b;
          --outline-variant: #444655;
          --primary: #b8c4ff;
          --on-primary: #002486;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        .vault-close-btn:hover { background: var(--surface-container-highest); }

        .vault-withdraw-btn:hover {
          box-shadow: 0 0 30px rgba(184,196,255,0.25);
        }
        .vault-withdraw-btn:active { transform: scale(0.95); }

        .vault-filter-btn:hover { background: var(--surface-container-high); }

        .vault-reward-row:hover { background: rgba(27,31,43,0.4); }

        .vault-load-more:hover { color: var(--primary-fixed); }

        .vault-refer-btn:hover {
          background: var(--primary);
          color: var(--on-primary);
        }

        .invite-card:hover .invite-glow { background: rgba(184,196,255,0.1) !important; }
      `}</style>

      <div
        style={{
          backgroundColor: "#0e131e",
          fontFamily: "Inter, sans-serif",
          color: "#dee2f2",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <header style={{ width: "100%", maxWidth: "64rem", margin: "0 auto", padding: "3rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.05em", color: "var(--primary)" }}>
            VAULT
          </span>
          <button
            className="vault-close-btn"
            style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-container)", border: "none", cursor: "pointer", transition: "background 0.2s" }}
          >
            <span className="material-symbols-outlined" style={{ color: "var(--on-surface)" }}>close</span>
          </button>
        </header>

        <main style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem 6rem" }}>

          {/* Hero Rewards Card */}
          <section style={{ position: "relative", overflow: "hidden", marginBottom: "4rem" }}>
            <div
              style={{
                padding: "2.5rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, var(--surface-container), var(--surface-container-low))",
                border: "1px solid rgba(68,70,85,0.1)",
                position: "relative",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
                <div>
                  <p style={{ color: "var(--on-surface-variant)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                    Rewards Portfolio
                  </p>
                  <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "var(--on-surface)", lineHeight: 1.2 }}>
                    Total Cashback Earned:{" "}
                    <span style={{ color: "var(--primary)" }}>Rs. 47.25</span>
                  </h1>
                  <p style={{ marginTop: "1rem", color: "var(--on-surface-variant)", maxWidth: "28rem", lineHeight: 1.6 }}>
                    Your rewards are automatically credited to your vault. Keep transacting to unlock higher tiers.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
                  {/* Avatar stack */}
                  <div style={{ display: "flex" }}>
                    {["stars", "redeem"].map((icon) => (
                      <div
                        key={icon}
                        style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", border: "2px solid var(--surface)", background: "var(--surface-container-highest)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "-0.5rem" }}
                      >
                        <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "0.875rem" }}>{icon}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="vault-withdraw-btn"
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "linear-gradient(to right, var(--primary), var(--primary-container))",
                      color: "var(--on-primary-fixed)",
                      fontWeight: 700,
                      borderRadius: "0.75rem",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Withdraw Rewards
                  </button>
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "16rem", height: "16rem", background: "rgba(184,196,255,0.1)", borderRadius: "9999px", filter: "blur(100px)", pointerEvents: "none" }} />
          </section>

          {/* Rewards History */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--on-surface)" }}>Reward History</h2>
              <div
                className="vault-filter-btn"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.75rem", background: "var(--surface-container)", borderRadius: "0.5rem", border: "1px solid rgba(68,70,85,0.1)", cursor: "pointer", transition: "background 0.2s" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>filter_list</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)" }}>Filter Rewards</span>
              </div>
            </div>

            <div style={{ overflow: "hidden", borderRadius: "0.75rem", background: "rgba(23,27,39,0.5)" }}>
              <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--surface-container-low)", color: "var(--on-surface-variant)", fontSize: "0.875rem", fontWeight: 600, borderBottom: "1px solid rgba(68,70,85,0.1)" }}>
                    <th style={{ padding: "1.25rem 1.5rem" }}>Date</th>
                    <th style={{ padding: "1.25rem 1.5rem" }}>Reason</th>
                    <th style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((r, i) => (
                    <tr
                      key={i}
                      className="vault-reward-row"
                      style={{ borderTop: "1px solid rgba(68,70,85,0.05)", transition: "background 0.15s" }}
                    >
                      <td style={{ padding: "1.5rem", color: "var(--on-surface)", fontWeight: 500, fontSize: "0.875rem" }}>{r.date}</td>
                      <td style={{ padding: "1.5rem", color: "var(--on-surface-variant)", fontSize: "0.875rem" }}>{r.reason}</td>
                      <td style={{ padding: "1.5rem", textAlign: "right", fontWeight: 700, color: "var(--primary)", fontSize: "0.875rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.625rem", background: "rgba(184,196,255,0.1)", color: "var(--primary)", padding: "0.125rem 0.375rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "-0.025em" }}>
                            Verified
                          </span>
                          {r.amount}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <button
                className="vault-load-more"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s", fontFamily: "Inter, sans-serif" }}
              >
                Load More Transactions
                <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>expand_more</span>
              </button>
            </div>
          </section>

          {/* Bento Cards */}
          <section style={{ marginTop: "5rem", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
            {/* Invite Card */}
            <div
              className="invite-card"
              style={{ padding: "2rem", borderRadius: "0.75rem", background: "var(--surface-container)", border: "1px solid rgba(68,70,85,0.1)", cursor: "pointer", overflow: "hidden", position: "relative" }}
            >
              <div style={{ position: "relative", zIndex: 10 }}>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Invite Friends, Earn More</h3>
                <p style={{ color: "var(--on-surface-variant)", fontSize: "0.875rem", marginBottom: "1.5rem", maxWidth: "22rem" }}>
                  Get Rs. 50.00 for every friend who signs up and completes their first transfer.
                </p>
                <button
                  className="vault-refer-btn"
                  style={{ padding: "0.5rem 1rem", background: "rgba(184,196,255,0.1)", color: "var(--primary)", border: "1px solid rgba(184,196,255,0.2)", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s", fontFamily: "Inter, sans-serif" }}
                >
                  Refer Now
                </button>
              </div>
              <div
                className="invite-glow"
                style={{ position: "absolute", right: "-2rem", bottom: "-2rem", width: "10rem", height: "10rem", background: "rgba(184,196,255,0.05)", borderRadius: "9999px", filter: "blur(32px)", transition: "background 0.3s" }}
              />
            </div>

            {/* Vault Booster Card */}
            <div
              style={{
                padding: "2rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, rgba(226,113,26,0.2), var(--surface-container))",
                border: "1px solid rgba(226,113,26,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="material-symbols-outlined" style={{ color: "var(--tertiary)", marginBottom: "1rem", display: "block" }}>bolt</span>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.25rem" }}>Vault Booster</h3>
              </div>
              <p style={{ color: "var(--on-surface-variant)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Active for 48h
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ marginTop: "8rem", textAlign: "center" }}>
            <p style={{ color: "var(--outline)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Secured by Vault Infrastructure
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", opacity: 0.3, filter: "grayscale(1) contrast(1.5)" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: "6rem", height: "2rem", background: "rgba(196,197,215,0.2)", borderRadius: "0.25rem" }} />
              ))}
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}