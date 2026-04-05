 import { useState } from "react";

export default function VaultLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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
          --on-secondary-container: #acb5cf;
          --on-primary-fixed: #001454;
          --on-surface-variant: #c4c5d7;
          --background: #0e131e;
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

        .vault-gradient {
          background: linear-gradient(135deg, #b8c4ff 0%, #6c88ff 100%);
        }

        .vault-shine {
          background: linear-gradient(45deg, rgba(52,57,70,0.05) 0%, rgba(255,255,255,0.02) 100%);
        }

        .vault-input {
          width: 100%;
          height: 3.5rem;
          padding-left: 3rem;
          padding-right: 1rem;
          background: var(--surface-container-lowest);
          border: none;
          border-radius: 0.75rem;
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-size: 1rem;
          outline: none;
          transition: box-shadow 0.2s;
          box-sizing: border-box;
        }

        .vault-input-pr {
          padding-right: 3rem;
        }

        .vault-input::placeholder {
          color: rgba(142,144,161,0.5);
        }

        .vault-input:focus {
          box-shadow: 0 0 0 2px rgba(184,196,255,0.2);
        }

        .vault-input-group:focus-within .vault-input-icon {
          color: var(--primary) !important;
        }

        .vault-login-btn {
          width: 100%;
          height: 3.5rem;
          border-radius: 0.75rem;
          font-family: Manrope, sans-serif;
          font-weight: 800;
          color: var(--on-primary-fixed);
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 24px -8px rgba(108,136,255,0.4);
          transition: transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .vault-login-btn:hover {
          transform: scale(1.02);
        }

        .vault-login-btn:active {
          transform: scale(0.98);
        }

        .vault-login-btn:hover .vault-arrow {
          transform: translateX(4px);
        }

        .vault-arrow {
          transition: transform 0.2s;
        }

        .vault-alt-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 3rem;
          background: var(--surface-container-high);
          border-radius: 0.75rem;
          border: 1px solid rgba(68,70,85,0.1);
          color: var(--on-surface);
          cursor: pointer;
          transition: background 0.2s;
          font-family: Inter, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .vault-alt-btn:hover {
          background: var(--surface-bright);
        }

        .vault-footer-link {
          color: rgba(142,144,161,0.4);
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-decoration: none;
          transition: color 0.2s;
        }

        .vault-footer-link:hover {
          color: var(--outline);
        }

        .vault-forgot:hover {
          color: var(--primary);
        }

        .vault-register:hover {
          color: var(--primary-container);
        }
      `}</style>

      {/* Background Glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -10, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "500px", height: "500px", background: "rgba(108,136,255,0.05)", borderRadius: "9999px", filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "500px", height: "500px", background: "rgba(184,196,255,0.05)", borderRadius: "9999px", filter: "blur(120px)" }} />
      </div>

      <div
        style={{
          backgroundColor: "var(--background)",
          fontFamily: "Inter, sans-serif",
          color: "var(--on-surface)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <main style={{ width: "100%", maxWidth: "440px", display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* Header */}
          <header style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}>
            <div
              className="vault-gradient"
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 30px rgba(108,136,255,0.2)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "var(--on-primary-fixed)", fontSize: "2.5rem", fontVariationSettings: "'FILL' 1" }}
              >
                account_balance_wallet
              </span>
            </div>
            <div>
              <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.05em", color: "var(--primary-fixed)", margin: 0 }}>
                VAULT
              </h1>
              <p style={{ color: "var(--on-surface-variant)", fontSize: "0.875rem", letterSpacing: "0.05em", marginTop: "0.25rem" }}>
                Secure your legacy with Digital Depth.
              </p>
            </div>
          </header>

          {/* Card */}
          <section
            className="vault-shine"
            style={{
              backgroundColor: "var(--surface-container)",
              borderRadius: "1.5rem",
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(68,70,85,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Account Number */}
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                    Account Number
                  </label>
                  <div className="vault-input-group" style={{ position: "relative" }}>
                    <span className="material-symbols-outlined vault-input-icon" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--outline)", transition: "color 0.2s" }}>
                      fingerprint
                    </span>
                    <input className="vault-input" id="account-number" placeholder="00-0000-0000" type="text" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Password
                    </label>
                    <a href="#" className="vault-forgot" style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--on-surface-variant)", textDecoration: "none", transition: "color 0.2s" }}>
                      Forgot Access?
                    </a>
                  </div>
                  <div className="vault-input-group" style={{ position: "relative" }}>
                    <span className="material-symbols-outlined vault-input-icon" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--outline)", transition: "color 0.2s" }}>
                      lock
                    </span>
                    <input
                      className={`vault-input vault-input-pr`}
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--outline)", display: "flex", alignItems: "center" }}
                    >
                      <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button className="vault-login-btn vault-gradient" type="button">
                Login
                <span className="material-symbols-outlined vault-arrow" style={{ fontSize: "1.125rem" }}>arrow_forward</span>
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem 0" }}>
                <div style={{ height: "1px", flex: 1, background: "rgba(68,70,85,0.2)" }} />
                <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--outline-variant)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  or secure entry
                </span>
                <div style={{ height: "1px", flex: 1, background: "rgba(68,70,85,0.2)" }} />
              </div>

              {/* Alt Auth Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <button className="vault-alt-btn" type="button">
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>face</span>
                  <span>FaceID</span>
                </button>
                <button className="vault-alt-btn" type="button">
                  <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>token</span>
                  <span>Hardware Key</span>
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p style={{ color: "var(--on-surface-variant)", fontWeight: 500, margin: 0 }}>
              Don't have an account?{" "}
              <a
                href="#"
                className="vault-register"
                style={{
                  color: "var(--primary)",
                  fontWeight: 700,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "rgba(184,196,255,0.3)",
                  transition: "color 0.2s",
                }}
              >
                Register
              </a>
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
              {["Privacy", "Terms", "Support"].map((label) => (
                <a key={label} href="#" className="vault-footer-link">{label}</a>
              ))}
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}