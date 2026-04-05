import { useState } from "react";

export default function VaultTransferMoney() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        :root {
          --on-background: #dee2f2;
          --tertiary-container: #e2711a;
          --surface-container-lowest: #090e19;
          --surface-bright: #343946;
          --secondary-container: #3e465d;
          --surface-dim: #0e131e;
          --surface-container: #1b1f2b;
          --outline: #8e90a1;
          --surface-container-high: #252a36;
          --surface-container-highest: #303541;
          --surface: #0e131e;
          --error: #ffb4ab;
          --primary-container: #6c88ff;
          --outline-variant: #444655;
          --on-primary-fixed: #001454;
          --on-primary: #002486;
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
          background: rgba(27, 31, 43, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }

        .active-tab-glow {
          box-shadow: 0 0 20px rgba(184, 196, 255, 0.15);
        }

        .vault-input {
          width: 100%;
          background: rgba(9,14,25,0.5);
          border: 1px solid rgba(68,70,85,0.05);
          border-radius: 1rem;
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          outline: none;
          box-sizing: border-box;
          transition: box-shadow 0.2s, border-color 0.2s;
        }

        .vault-input::placeholder { color: rgba(142,144,161,0.3); }

        .vault-input:focus {
          box-shadow: 0 0 0 2px rgba(184,196,255,0.2);
          border-color: rgba(184,196,255,0.3);
        }

        .vault-input-group:focus-within .vault-input-icon {
          color: var(--primary) !important;
        }

        .vault-amount-input {
          padding: 1.75rem 1rem 1.75rem 3.5rem;
          font-family: Manrope, sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
        }

        .vault-amount-input::placeholder { color: rgba(142,144,161,0.2); }

        .vault-send-btn {
          width: 100%;
          padding: 1.5rem;
          background: linear-gradient(135deg, #b8c4ff 0%, #6c88ff 100%);
          color: var(--on-primary-fixed);
          font-family: Manrope, sans-serif;
          font-weight: 900;
          font-size: 1.25rem;
          border-radius: 1rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 20px 40px rgba(108,136,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
          transition: all 0.3s;
        }

        .vault-send-btn:hover {
          box-shadow: 0 20px 50px rgba(108,136,255,0.4);
          transform: translateY(-2px);
        }

        .vault-send-btn:active {
          transform: translateY(2px) scale(0.98);
        }

        .vault-tab-inactive:hover {
          color: var(--on-surface);
          background: rgba(27,31,43,0.2);
        }
      `}</style>

      <div
        style={{
          backgroundColor: "var(--background)",
          color: "var(--on-background)",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <main style={{ width: "100%", maxWidth: "42rem", padding: "3rem 1.5rem" }}>

          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  fontFamily: "Manrope, sans-serif",
                  background: "linear-gradient(135deg, #b8c4ff, #6c88ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                VAULT
              </span>
            </div>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-surface)", marginBottom: "0.5rem", textAlign: "center" }}>
              Transfer Money
            </h2>
            <p style={{ color: "var(--on-surface-variant)", fontWeight: 500, textAlign: "center" }}>
              Move funds instantly across the global banking mesh.
            </p>
          </div>

          {/* Card */}
          <div style={{ position: "relative" }}>
            {/* Glow accents */}
            <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "16rem", height: "16rem", background: "rgba(184,196,255,0.1)", filter: "blur(120px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-6rem", left: "-6rem", width: "16rem", height: "16rem", background: "rgba(226,113,26,0.05)", filter: "blur(120px)", borderRadius: "9999px" }} />

            <div
              className="glass-card"
              style={{
                borderRadius: "2.5rem",
                overflow: "hidden",
                border: "1px solid rgba(68,70,85,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                position: "relative",
                zIndex: 10,
              }}
            >
              {/* Tabs */}
              <div style={{ margin: "1.5rem", padding: "0.5rem", background: "rgba(23,27,39,0.5)", borderRadius: "1rem", border: "1px solid rgba(68,70,85,0.05)", display: "flex" }}>
                <button
                  onClick={() => setActiveTab("account")}
                  className={activeTab === "account" ? "active-tab-glow" : "vault-tab-inactive"}
                  style={{
                    flex: 1,
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: activeTab === "account" ? 700 : 600,
                    color: activeTab === "account" ? "var(--primary)" : "var(--on-surface-variant)",
                    background: activeTab === "account" ? "rgba(48,53,65,0.5)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>account_balance</span>
                  Account Number
                </button>
                <button
                  onClick={() => setActiveTab("upi")}
                  className={activeTab === "upi" ? "active-tab-glow" : "vault-tab-inactive"}
                  style={{
                    flex: 1,
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: activeTab === "upi" ? 700 : 600,
                    color: activeTab === "upi" ? "var(--primary)" : "var(--on-surface-variant)",
                    background: activeTab === "upi" ? "rgba(48,53,65,0.5)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.3s",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>qr_code</span>
                  UPI Address
                </button>
              </div>

              {/* Form */}
              <div style={{ padding: "0.5rem 3rem 3rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                  {/* Receiver */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.625rem", fontWeight: 900, letterSpacing: "0.2em", color: "var(--outline)", textTransform: "uppercase", marginBottom: "0.75rem", marginLeft: "0.25rem" }}>
                      Receiver Details
                    </label>
                    <div className="vault-input-group" style={{ position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, paddingLeft: "1.25rem", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                        <span className="material-symbols-outlined vault-input-icon" style={{ color: "rgba(142,144,161,0.5)", transition: "color 0.2s" }}>alternate_email</span>
                      </div>
                      <input
                        className="vault-input"
                        style={{ padding: "1.25rem 1rem 1.25rem 3.5rem" }}
                        placeholder="Enter Receiver Account or UPI"
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.625rem", fontWeight: 900, letterSpacing: "0.2em", color: "var(--outline)", textTransform: "uppercase", marginBottom: "0.75rem", marginLeft: "0.25rem" }}>
                      Amount (INR)
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, paddingLeft: "1.25rem", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                        <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1.5rem", fontFamily: "Inter, sans-serif" }}>₹</span>
                      </div>
                      <input
                        className="vault-input vault-amount-input"
                        placeholder="0.00"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Send Button */}
                  <button className="vault-send-btn" type="button">
                    <span>Send Money</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>

                </div>
              </div>
            </div>

            {/* Security Trust Bar */}
            <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "2.5rem 0", opacity: 0.4 }}>
              {[
                { icon: "lock", label: "AES-256 Encrypted" },
                { icon: "verified_user", label: "PCI Compliant" },
                { icon: "security", label: "NPCI Certified" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0 1.25rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "1.125rem" }}>{icon}</span>
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}