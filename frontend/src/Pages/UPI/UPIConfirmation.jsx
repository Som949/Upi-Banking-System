export default function VaultTransactionSuccess() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        :root {
          --on-background: #dee2f2;
          --surface-container-lowest: #090e19;
          --surface-bright: #343946;
          --surface-container: #1b1f2b;
          --outline: #8e90a1;
          --surface-container-high: #252a36;
          --surface-container-highest: #303541;
          --surface: #0e131e;
          --error: #ffb4ab;
          --primary-container: #6c88ff;
          --outline-variant: #444655;
          --on-primary-fixed: #001454;
          --primary: #b8c4ff;
          --background: #0e131e;
          --secondary: #bdc6e1;
          --on-surface: #dee2f2;
          --tertiary: #ffb68b;
          --surface-container-low: #171b27;
          --on-surface-variant: #c4c5d7;
          --primary-fixed: #dde1ff;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        .glass-card {
          background: rgba(27, 31, 43, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .button-gradient {
          background: linear-gradient(135deg, #b8c4ff, #6c88ff);
        }

        .vault-primary-btn {
          display: block;
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          font-family: Manrope, sans-serif;
          font-weight: 700;
          color: var(--on-primary-fixed);
          text-align: center;
          text-decoration: none;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          box-sizing: border-box;
          font-size: 1rem;
        }

        .vault-primary-btn:hover { filter: brightness(1.1); }
        .vault-primary-btn:active { transform: scale(0.95); }

        .vault-secondary-btn {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          font-family: Manrope, sans-serif;
          font-weight: 700;
          color: var(--primary);
          border: 1px solid rgba(184,196,255,0.2);
          background: rgba(184,196,255,0.05);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }

        .vault-secondary-btn:hover { background: rgba(184,196,255,0.1); }
        .vault-secondary-btn:active { transform: scale(0.95); }
      `}</style>

      {/* Visual Polish Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.03,
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuI1D4KEEYdOKuxdAp7Tem7uwNKl1tQBtRRO4N7OrawxOFOYTmZNzBawX826pVHpFpi-CnzUZwv-b8_bzlnNjC8LLipMGk0T5prPflQCqSJxc09wjN0SLjQ0TOIuZbRhyhz4MJVwz5a9T6ZyNR-E8-cscdHOuOvOA-p4Omq6YnpStB2Ltd9VvMfzTUZC6WqrdhEu1nyN3fscIYBhee4ZrQNIHrmVEvgKKkpyHSM86IUodTronu_N5KRxh8dFlS2bjzPrCt-l6efzc')",
        }}
      />

      <div
        style={{
          backgroundColor: "var(--background)",
          color: "var(--on-background)",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          overflow: "hidden",
        }}
      >
        <main style={{ width: "100%", maxWidth: "32rem", position: "relative" }}>

          {/* Background Glows */}
          <div style={{ position: "absolute", top: "-6rem", left: "-6rem", width: "16rem", height: "16rem", background: "rgba(184,196,255,0.1)", borderRadius: "9999px", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", bottom: "-6rem", right: "-6rem", width: "16rem", height: "16rem", background: "rgba(255,182,139,0.1)", borderRadius: "9999px", filter: "blur(100px)" }} />

          {/* Card */}
          <div
            className="glass-card"
            style={{
              position: "relative",
              border: "1px solid rgba(68,70,85,0.2)",
              borderRadius: "2rem",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            {/* Checkmark Icon */}
            <div style={{ marginBottom: "2rem", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(184,196,255,0.2)", borderRadius: "9999px", filter: "blur(24px)" }} />
              <div
                style={{
                  position: "relative",
                  width: "6rem",
                  height: "6rem",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #b8c4ff, #6c88ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 40px rgba(108,136,255,0.3)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--on-primary-fixed)", fontSize: "3rem", fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", color: "white", marginBottom: "0.5rem" }}>
                Transaction Successful
              </h1>
              <p style={{ color: "var(--on-surface-variant)", fontWeight: 500, fontSize: "1.125rem" }}>
                Rs. 500 sent to{" "}
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>Rohan Sharma</span>
              </p>
            </div>

            {/* Info Grid */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>

              {/* Cashback Box */}
              <div
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  textAlign: "left",
                }}
              >
                <div style={{ background: "rgba(16,185,129,0.2)", padding: "0.5rem", borderRadius: "0.5rem", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: "#34d399", fontVariationSettings: "'FILL' 1" }}>stars</span>
                </div>
                <div>
                  <p style={{ color: "#34d399", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>CASHBACK EARNED</p>
                  <p style={{ color: "var(--on-background)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    0.35% cashback mila!{" "}
                    <span style={{ fontWeight: 700, color: "#34d399" }}>Rs. 1.75</span>{" "}
                    aapke account mein add ho gaya
                  </p>
                </div>
              </div>

              {/* Balance Row */}
              <div
                style={{
                  background: "var(--surface-container-low)",
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(68,70,85,0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)" }}>account_balance_wallet</span>
                  <span style={{ color: "var(--on-surface-variant)", fontWeight: 500 }}>New Balance</span>
                </div>
                <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "white", letterSpacing: "-0.025em" }}>
                  Rs. 4,27,990.50
                </p>
              </div>
            </div>

            {/* Receipt Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2.5rem",
                padding: "0.5rem 1rem",
                background: "rgba(48,53,65,0.3)",
                borderRadius: "9999px",
              }}
            >
              <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Receipt ID: VLT-8829-XQ</span>
              <div style={{ width: "0.25rem", height: "0.25rem", background: "rgba(142,144,161,0.4)", borderRadius: "9999px" }} />
              <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Nov 24, 2023</span>
            </div>

            {/* Action Buttons */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href="#" className="vault-primary-btn button-gradient">
                Back to Dashboard
              </a>
              <button className="vault-secondary-btn" type="button">
                Another Transfer
              </button>
            </div>
          </div>

          {/* Security Footer */}
          <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "rgba(142,144,161,0.6)" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>verified_user</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Secured by VAULT Multi-Layer Encryption
            </span>
          </div>

        </main>
      </div>
    </>
  );
}