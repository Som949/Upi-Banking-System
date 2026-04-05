export default function VaultCreateAccount() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
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
          --on-secondary-fixed-variant: #3e465d;
          --tertiary: #ffb68b;
          --on-error-container: #ffdad6;
          --primary: #b8c4ff;
          --on-primary-fixed-variant: #0036bb;
          --surface-tint: #b8c4ff;
          --on-tertiary: #522300;
          --inverse-on-surface: #2b303c;
          --on-primary-container: #001f76;
          --surface-container-high: #252a36;
          --on-surface: #dee2f2;
          --primary-fixed-dim: #b8c4ff;
          --surface-container-lowest: #090e19;
          --inverse-primary: #264fdc;
          --on-error: #690005;
          --on-tertiary-container: #481e00;
          --secondary-fixed-dim: #bdc6e1;
          --on-tertiary-fixed: #321300;
          --error-container: #93000a;
          --surface-dim: #0e131e;
          --surface-container: #1b1f2b;
          --surface-container-highest: #303541;
          --outline-variant: #444655;
          --inverse-surface: #dee2f2;
          --secondary-fixed: #d9e2fe;
          --secondary-container: #3e465d;
          --on-secondary-container: #acb5cf;
          --on-secondary-fixed: #121b2f;
          --on-primary-fixed: #001454;
          --on-surface-variant: #c4c5d7;
          --background: #0e131e;
          --on-primary: #002486;
          --error: #ffb4ab;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        .vault-glass {
          background: rgba(27, 31, 43, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .vault-input {
          width: 100%;
          background: var(--surface-container-lowest);
          border: none;
          border-radius: 0.75rem;
          padding: 1rem 1rem 1rem 3rem;
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-size: 1rem;
          outline: none;
          transition: box-shadow 0.2s;
          box-sizing: border-box;
        }

        .vault-input::placeholder {
          color: rgba(142, 144, 161, 0.5);
        }

        .vault-input:focus {
          box-shadow: 0 0 0 2px rgba(184, 196, 255, 0.3);
        }

        .vault-input-group:focus-within .vault-input-icon {
          color: var(--primary) !important;
        }

        .vault-submit:active {
          transform: scale(0.98);
        }

        .vault-submit:hover {
          box-shadow: 0 12px 32px rgba(184, 196, 255, 0.3);
        }

        .vault-login-link:hover {
          color: var(--primary);
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
          padding: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background */}
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "40%", height: "40%", background: "rgba(184,196,255,0.1)", borderRadius: "9999px", filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", background: "rgba(108,136,255,0.05)", borderRadius: "9999px", filter: "blur(120px)" }} />

        {/* Main Card */}
        <main
          className="vault-glass"
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            borderRadius: "2rem",
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
            border: "1px solid rgba(68,70,85,0.1)",
          }}
        >
          {/* Left Side: Branding */}
          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
              backgroundColor: "var(--surface-container)",
            }}
          >
            {/* Content */}
            <div style={{ position: "relative", zIndex: 10 }}>
              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "3rem" }}>
                <span
                  className="material-symbols-outlined"
                  style={{ color: "var(--primary)", fontSize: "2.5rem", fontVariationSettings: "'FILL' 1" }}
                >
                  account_balance_wallet
                </span>
                <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.875rem", letterSpacing: "-0.05em", color: "var(--primary)" }}>
                  VAULT
                </span>
              </div>

              <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "3rem", lineHeight: 1.15, marginBottom: "1.5rem", maxWidth: "28rem" }}>
                Secure your{" "}
                <span style={{ color: "var(--primary)" }}>financial future</span>{" "}
                with precision.
              </h1>
              <p style={{ color: "var(--on-secondary-container)", fontSize: "1.125rem", maxWidth: "22rem", lineHeight: 1.6 }}>
                Join the digital vault ecosystem where institutional security meets hyper-modern velocity.
              </p>
            </div>

            {/* Bento Card */}
            <div style={{ position: "relative", zIndex: 10, marginTop: "auto" }}>
              <div
                style={{
                  background: "rgba(48, 53, 65, 0.4)",
                  border: "1px solid rgba(68,70,85,0.2)",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  maxWidth: "20rem",
                  transform: "rotate(-2deg)",
                }}
              >
                <div style={{ width: "3rem", height: "3rem", background: "rgba(184,196,255,0.2)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>shield</span>
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>Military Grade</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", margin: 0 }}>End-to-end encryption active</p>
                </div>
              </div>
            </div>

            {/* Background Image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZooTZvnjL3ycHFgwyezGzN9d2mUH4OxhM2z5Fk3PKoWkipGE3c_A_Vv6780bsQht-Me-st_VDTu7juXGVjmLswv0JmSMXQENGlBt1NYB2Q801aS55RpZ1ZmFNtNm7-hi8BjbZYrSbNsmXi7S6m4iRNedj-TRnSxX8KAheXFPN3cOa1JdeFLOpeXGBg_WTdDun9BNP-vHAfRlM2ejRuQBZje2K2MO9u8qCmki4Uo_nGCR7Q6pA6e-hrHD4C6-xC9wHEmEAI-JrHVcz"
                alt="abstract digital connection network"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2, mixBlendMode: "overlay" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--surface-container), transparent, transparent)" }} />
            </div>
          </div>

          {/* Right Side: Form */}
          <div
            style={{
              gridColumn: "span 5",
              padding: "4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "var(--surface-container-low)",
            }}
          >
            {/* Heading */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.875rem", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
                Create Account
              </h2>
              <p style={{ color: "var(--on-surface-variant)" }}>Enter your banking credentials to begin.</p>
            </div>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Account Number */}
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)", marginBottom: "0.5rem", marginLeft: "0.25rem" }}>
                  Account Number
                </label>
                <div className="vault-input-group" style={{ position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, paddingLeft: "1rem", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                    <span className="material-symbols-outlined vault-input-icon" style={{ color: "var(--outline)", fontSize: "1.25rem", transition: "color 0.2s" }}>numbers</span>
                  </div>
                  <input className="vault-input" id="account_number" name="account_number" placeholder="0000 0000 0000" type="text" />
                </div>
              </div>

              {/* Bank PIN */}
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)", marginBottom: "0.5rem", marginLeft: "0.25rem" }}>
                  Bank PIN
                </label>
                <div className="vault-input-group" style={{ position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, paddingLeft: "1rem", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                    <span className="material-symbols-outlined vault-input-icon" style={{ color: "var(--outline)", fontSize: "1.25rem", transition: "color 0.2s" }}>dialpad</span>
                  </div>
                  <input className="vault-input" id="bank_pin" name="bank_pin" placeholder="••••" type="password" />
                </div>
              </div>

              {/* Password + Confirm Password */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {/* Password */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)", marginBottom: "0.5rem", marginLeft: "0.25rem" }}>
                    Password
                  </label>
                  <div className="vault-input-group" style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, paddingLeft: "1rem", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                      <span className="material-symbols-outlined vault-input-icon" style={{ color: "var(--outline)", fontSize: "1.25rem", transition: "color 0.2s" }}>lock</span>
                    </div>
                    <input className="vault-input" id="password" name="password" placeholder="••••••••" type="password" />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface-variant)", marginBottom: "0.5rem", marginLeft: "0.25rem" }}>
                    Confirm Password
                  </label>
                  <div className="vault-input-group" style={{ position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, paddingLeft: "1rem", display: "flex", alignItems: "center", pointerEvents: "none" }}>
                      <span className="material-symbols-outlined vault-input-icon" style={{ color: "var(--outline)", fontSize: "1.25rem", transition: "color 0.2s" }}>verified_user</span>
                    </div>
                    <input className="vault-input" id="confirm_password" name="confirm_password" placeholder="••••••••" type="password" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ paddingTop: "1rem" }}>
                <button
                  className="vault-submit"
                  type="button"
                  style={{
                    width: "100%",
                    background: "linear-gradient(to right, var(--primary), var(--primary-container))",
                    color: "var(--on-primary-fixed)",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(184,196,255,0.2)",
                    transition: "all 0.2s",
                  }}
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <a
                href="#"
                className="vault-login-link"
                style={{ color: "var(--on-surface-variant)", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              >
                Already have an account?{" "}
                <span style={{ color: "var(--primary)", textDecoration: "underline", textUnderlineOffset: "4px", textDecorationColor: "rgba(184,196,255,0.3)" }}>
                  Login
                </span>
              </a>
            </div>

            {/* Footer */}
            <div style={{ marginTop: "auto", paddingTop: "2.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.625rem", color: "var(--outline)", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600 }}>
                Protected by Vault-Core Systems
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}