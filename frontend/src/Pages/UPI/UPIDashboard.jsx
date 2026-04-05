export default function VaultDashboard() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        :root {
          --primary-container: #6c88ff;
          --on-background: #dee2f2;
          --tertiary-container: #e2711a;
          --surface: #0e131e;
          --secondary: #bdc6e1;
          --primary-fixed: #dde1ff;
          --surface-bright: #343946;
          --outline: #8e90a1;
          --surface-container-low: #171b27;
          --on-secondary: #273045;
          --tertiary: #ffb68b;
          --primary: #b8c4ff;
          --surface-container-high: #252a36;
          --on-surface: #dee2f2;
          --surface-container-lowest: #090e19;
          --surface-container: #1b1f2b;
          --surface-container-highest: #303541;
          --outline-variant: #444655;
          --on-primary-fixed: #001454;
          --on-primary: #002486;
          --on-surface-variant: #c4c5d7;
          --background: #0e131e;
          --secondary-container: #3e465d;
          --on-secondary-container: #acb5cf;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        .vault-glow {
          box-shadow: 0 0 40px -10px rgba(184, 196, 255, 0.15);
        }

        .card-shine {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
        }

        .send-card:hover { background: var(--surface-container-high) !important; }
        .send-card:hover .send-card-glow { opacity: 0.2; }

        .balance-card:hover { transform: scale(1.02); }

        .history-card:hover .history-arrow { color: var(--primary) !important; }

        .nav-link-inactive:hover { color: #6c88ff; }
        .nav-link-inactive:active { transform: scale(0.9); }
        .nav-link-active:active { transform: scale(0.9); }

        .transfer-btn:hover {
          box-shadow: 0 0 20px rgba(108,136,255,0.4);
        }

        .security-btn {
          background: none;
          border: none;
          border-bottom: 1px solid rgba(184,196,255,0.4);
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          padding-bottom: 0.25rem;
          transition: border-color 0.2s;
        }

        .security-btn:hover { border-color: var(--primary); }
      `}</style>

      <div
        style={{
          backgroundColor: "var(--background)",
          color: "var(--on-background)",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* Background Glows */}
        <div style={{ position: "fixed", top: 0, right: 0, zIndex: -10, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60%", height: "60%", background: "rgba(108,136,255,0.05)", filter: "blur(120px)", borderRadius: "9999px" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "40%", height: "40%", background: "rgba(226,113,26,0.05)", filter: "blur(100px)", borderRadius: "9999px" }} />
        </div>

        {/* Header */}
        <header style={{ paddingTop: "4rem", paddingBottom: "3rem", padding: "4rem 1.5rem 3rem", maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "3.75rem", fontWeight: 800, letterSpacing: "-0.05em", color: "var(--primary)", margin: 0 }}>
              VAULT
            </h1>
            <p style={{ color: "var(--on-surface-variant)", fontWeight: 500, letterSpacing: "0.05em", fontSize: "1.125rem", opacity: 0.8 }}>
              Secure Digital Asset Management
            </p>
          </div>
        </header>

        {/* Main Bento Grid */}
        <main style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem 8rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.5rem" }}>

            {/* Send Money — Large Card (8 cols) */}
            <div
              className="send-card vault-glow"
              style={{
                gridColumn: "span 8",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "var(--surface-container)",
                borderRadius: "1.5rem",
                padding: "2rem",
                transition: "all 0.5s",
                cursor: "pointer",
              }}
            >
              <div className="card-shine" style={{ position: "absolute", inset: 0 }} />
              <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ background: "rgba(108,136,255,0.1)", width: "4rem", height: "4rem", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
                    <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "2.5rem" }}>send</span>
                  </div>
                  <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.875rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary-fixed)" }}>Send Money</h2>
                  <p style={{ color: "var(--on-surface-variant)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "28rem" }}>
                    Instant cross-border transfers with zero hidden fees and enterprise-grade encryption.
                  </p>
                </div>
                <div style={{ marginTop: "3rem" }}>
                  <button
                    className="transfer-btn"
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--primary-container))",
                      color: "var(--on-primary-fixed)",
                      fontWeight: 600,
                      padding: "1rem 2rem",
                      borderRadius: "0.75rem",
                      fontSize: "1.125rem",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    New Transfer
                  </button>
                </div>
              </div>
              {/* Decorative glow */}
              <div
                className="send-card-glow"
                style={{ position: "absolute", right: "-5rem", bottom: "-5rem", width: "20rem", height: "20rem", opacity: 0.1, filter: "blur(48px)", background: "var(--primary-container)", borderRadius: "9999px", transition: "opacity 0.3s" }}
              />
            </div>

            {/* Check Balance — 4 cols */}
            <div
              className="balance-card"
              style={{
                gridColumn: "span 4",
                backgroundColor: "var(--surface-container-highest)",
                borderRadius: "1.5rem",
                padding: "2rem",
                transition: "transform 0.3s",
                border: "1px solid rgba(68,70,85,0.1)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--tertiary)", fontSize: "2.5rem", marginBottom: "1.5rem" }}>account_balance_wallet</span>
                <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Check Balance</h2>
                <p style={{ color: "var(--on-surface-variant)", marginBottom: "3rem" }}>Real-time valuation of your liquidity across all global vaults.</p>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ fontSize: "1.875rem", fontWeight: 700, fontFamily: "Manrope, sans-serif", color: "var(--on-surface)" }}>
                    $1,248,392.<span style={{ color: "var(--on-surface-variant)", fontSize: "1.25rem" }}>50</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction History — 5 cols */}
            <div
              className="history-card"
              style={{
                gridColumn: "span 5",
                backgroundColor: "var(--surface-container-low)",
                borderRadius: "1.5rem",
                padding: "2rem",
                border: "1px solid rgba(68,70,85,0.1)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
                <div style={{ background: "var(--surface-container-highest)", padding: "1rem", borderRadius: "1rem" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "1.875rem" }}>history</span>
                </div>
                <span className="material-symbols-outlined history-arrow" style={{ color: "var(--outline)", transition: "color 0.2s" }}>north_east</span>
              </div>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Transaction History</h2>
              <p style={{ color: "var(--on-surface-variant)", fontSize: "1rem", lineHeight: 1.6 }}>
                A comprehensive audit trail of your institutional activity and internal transfers.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <div style={{ height: "0.25rem", width: "100%", background: "var(--surface-container)", borderRadius: "9999px", overflow: "hidden", marginBottom: "1rem" }}>
                  <div style={{ height: "100%", background: "var(--primary)", width: "66.67%" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 500, color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  <span>Jan Activity</span>
                  <span>84% Verified</span>
                </div>
              </div>
            </div>

            {/* Rewards — 4 cols */}
            <div
              style={{
                gridColumn: "span 4",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "var(--surface-container)",
                borderRadius: "1.5rem",
                padding: "2rem",
                border: "1px solid rgba(68,70,85,0.2)",
              }}
            >
              <div style={{ position: "relative", zIndex: 10 }}>
                <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "2.5rem", marginBottom: "1.5rem", display: "block", fontVariationSettings: "'FILL' 1" }}>stars</span>
                <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Rewards</h2>
                <p style={{ color: "var(--on-surface-variant)", marginBottom: "1.5rem" }}>Unlock exclusive yields and premium lifestyle benefits through vault staking.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span style={{ padding: "0.5rem 1rem", background: "var(--secondary-container)", color: "var(--on-secondary-container)", fontSize: "0.75rem", fontWeight: 700, borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "-0.025em" }}>Gold Tier</span>
                  <span style={{ padding: "0.5rem 1rem", background: "var(--surface-container-highest)", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 700, borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "-0.025em" }}>4.2% APY</span>
                </div>
              </div>
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, padding: "2rem" }}>
                <div style={{ width: "4rem", height: "4rem", borderTop: "2px solid rgba(184,196,255,0.2)", borderRight: "2px solid rgba(184,196,255,0.2)", borderTopRightRadius: "1.5rem" }} />
              </div>
            </div>

            {/* Profile — 3 cols */}
            <div
              style={{
                gridColumn: "span 3",
                backgroundColor: "var(--surface-container)",
                borderRadius: "1.5rem",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                border: "1px solid rgba(68,70,85,0.1)",
              }}
            >
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <img
                  alt="User Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1WYYiKDAamGYFWf8CYKxOtWHUJEmTWXZ9aKmVgM2YWrj9RrQc-me9FbvK5wuNblEt1toi1xmoNtP7EG_Uy4XWk_L48JWrqtboV9anijJrCdq4W5IkAJXW0Tm5Mhh4d7HyoClwTJT37-7NSjwG8xtGnguaIV8WkAGcgnsXyntlTw6Gcd5051QNmlUNXfrgTY2WI_vO0ImYnM59Md3_5lW94wHZbwhNDJWZ1EFjrrjTGsbcvDo4wXH0dwoFe4cohZgLnAwxDemZ4rvi"
                  style={{ width: "6rem", height: "6rem", borderRadius: "9999px", border: "4px solid var(--surface-container-highest)", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "1.5rem", height: "1.5rem", background: "#22c55e", border: "4px solid var(--surface-container)", borderRadius: "9999px" }} />
              </div>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>Profile</h2>
              <p style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Verified Director</p>
              <p style={{ color: "var(--on-surface-variant)", fontSize: "0.875rem", padding: "0 1rem" }}>Manage security protocols, biometric keys, and account delegates.</p>
              <button className="security-btn" style={{ marginTop: "2rem" }}>Security Settings</button>
            </div>

          </div>
        </main>

        {/* Bottom Navigation */}
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 50,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "1rem 1.5rem 2rem",
            backgroundColor: "#0e131e",
            borderRadius: "1.5rem 1.5rem 0 0",
            boxShadow: "0 -8px 30px rgba(184,196,255,0.08)",
            boxSizing: "border-box",
          }}
        >
          {/* Active: Vault */}
          <a
            href="#"
            className="nav-link-active"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#1b1f2b",
              color: "#b8c4ff",
              borderRadius: "1rem",
              padding: "0.75rem",
              transform: "scale(0.95)",
              transition: "all 0.3s",
              textDecoration: "none",
            }}
          >
            <span className="material-symbols-outlined" style={{ marginBottom: "0.25rem" }}>account_balance_wallet</span>
            <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Vault</span>
          </a>

          {[
            { icon: "receipt_long", label: "History" },
            { icon: "payments", label: "Payments" },
            { icon: "settings", label: "Settings" },
          ].map(({ icon, label }) => (
            <a
              key={label}
              href="#"
              className="nav-link-inactive"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                padding: "0.75rem",
                transform: "scale(0.95)",
                transition: "all 0.3s",
                textDecoration: "none",
              }}
            >
              <span className="material-symbols-outlined" style={{ marginBottom: "0.25rem" }}>{icon}</span>
              <span style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}