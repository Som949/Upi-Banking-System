import { useState, useRef } from "react";

export default function VaultCheckBalance() {
  const [pins, setPins] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newPins = [...pins];
    newPins[index] = value;
    setPins(newPins);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const colors = {
    background: "#0e131e",
    surfaceContainer: "#1b1f2b",
    surfaceContainerLowest: "#090e19",
    onSurface: "#dee2f2",
    onSurfaceVariant: "#c4c5d7",
    primary: "#b8c4ff",
    primaryContainer: "#6c88ff",
    onPrimaryFixed: "#001454",
    outlineVariant: "#444655",
  };

  const pinBoxBase = {
    width: "3.25rem",
    height: "3.75rem",
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: 700,
    backgroundColor: colors.surfaceContainerLowest,
    border: "none",
    borderRadius: "0.5rem",
    color: colors.primary,
    outline: "none",
    boxShadow: `0 0 0 1px rgba(68,70,85,0.3)`,
    transition: "box-shadow 0.2s",
    caretColor: "transparent",
    WebkitTextSecurity: "disc",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: colors.background, color: colors.onSurface, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
        }
        .fill-icon { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .pin-input::-webkit-inner-spin-button,
        .pin-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .pin-input { -webkit-text-security: disc; -moz-appearance: textfield; }
        .check-btn:hover { opacity: 0.9; }
        .check-btn:active { transform: scale(0.98); }
        .check-btn .arrow-icon { transition: transform 0.2s; }
        .check-btn:hover .arrow-icon { transform: translateX(4px); }
        .forgot-btn:hover { color: #b8c4ff; }
      `}</style>

      {/* Security Overlay */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.03, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, #b8c4ff, transparent, transparent)" }} />
      </div>

      {/* Decorative lines */}
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", padding: "3rem", opacity: 0.05, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
        <div style={{ height: "1px", width: "25%", backgroundColor: colors.primary }} />
        <div style={{ height: "1px", width: "25%", backgroundColor: colors.primary }} />
      </div>

      <main style={{ width: "100%", maxWidth: "440px", display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Branding */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "4rem", height: "4rem",
            backgroundColor: colors.surfaceContainer,
            borderRadius: "1rem", marginBottom: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          }}>
            <span className="material-symbols-outlined fill-icon" style={{ color: colors.primary, fontSize: "2.25rem" }}>lock</span>
          </div>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", color: colors.onSurface, marginBottom: "0.75rem" }}>
            Check Account Balance
          </h1>
          <p style={{ color: colors.onSurfaceVariant, fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.025em" }}>
            Balance dekhne ke liye UPI PIN required hai
          </p>
        </div>

        {/* PIN Card */}
        <section style={{
          width: "100%",
          backgroundColor: colors.surfaceContainer,
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Internal glow */}
          <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "12rem", height: "12rem", background: "rgba(184,196,255,0.05)", borderRadius: "9999px", filter: "blur(48px)" }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* PIN Boxes */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
              {pins.map((val, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  className="pin-input"
                  type="password"
                  maxLength={1}
                  value={val}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  style={pinBoxBase}
                  onFocus={e => e.target.style.boxShadow = `0 0 0 2px ${colors.primary}`}
                  onBlur={e => e.target.style.boxShadow = `0 0 0 1px rgba(68,70,85,0.3)`}
                />
              ))}
            </div>

            {/* Check Balance Button */}
            <button className="check-btn" style={{
              width: "100%", height: "3.5rem",
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryContainer})`,
              color: colors.onPrimaryFixed,
              fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.125rem",
              borderRadius: "0.5rem", border: "none", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(108,136,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              transition: "opacity 0.2s, transform 0.15s",
            }}>
              <span>Check Balance</span>
              <span className="material-symbols-outlined arrow-icon" style={{ fontSize: "1.25rem" }}>arrow_forward</span>
            </button>

            {/* Encrypted badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "rgba(196,197,215,0.6)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "0.75rem" }}>verified_user</span>
              <span style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.2em" }}>End-to-End Encrypted</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <button className="forgot-btn" style={{
            background: "none", border: "none", cursor: "pointer",
            color: colors.onSurfaceVariant, fontWeight: 500, fontSize: "0.875rem",
            padding: "0.5rem 1rem", transition: "color 0.2s",
          }}>
            Forgot UPI PIN?
          </button>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "9999px",
              backgroundColor: colors.surfaceContainer,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid rgba(68,70,85,0.2)`,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "0.875rem", color: colors.primary }}>fingerprint</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "rgba(196,197,215,0.8)" }}>Use Biometrics instead</p>
          </div>
        </footer>

      </main>
    </div>
  );
}