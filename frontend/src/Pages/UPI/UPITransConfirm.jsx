import { useState } from "react";

export default function VaultPinEntry() {
  const [pin, setPin] = useState([true, true, true, false, false, false]);

  const handleNumber = (num) => {
    const filled = pin.filter(Boolean).length;
    if (filled < 6) {
      const next = [...pin];
      next[filled] = true;
      setPin(next);
    }
  };

  const handleBackspace = () => {
    const filled = pin.filter(Boolean).length;
    if (filled > 0) {
      const next = [...pin];
      next[filled - 1] = false;
      setPin(next);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
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
          --on-surface: #dee2f2;
          --surface-container-low: #171b27;
          --on-surface-variant: #c4c5d7;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        .pin-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #444655;
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .pin-dot.active {
          background-color: #b8c4ff;
          box-shadow: 0 0 10px rgba(184, 196, 255, 0.5);
        }

        .numpad-btn {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          background: var(--surface-container-low);
          border: none;
          color: var(--on-surface);
          font-family: Manrope, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          padding: 0;
        }

        .numpad-btn:hover { background: var(--surface-container-high); }
        .numpad-btn:active { background: rgba(184,196,255,0.2); }

        .vault-confirm-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #b8c4ff, #6c88ff);
          color: #001454;
          font-family: Inter, sans-serif;
          font-weight: 700;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(108,136,255,0.2);
          transition: all 0.2s;
          font-size: 1rem;
        }

        .vault-confirm-btn:hover { filter: brightness(1.1); }
        .vault-confirm-btn:active { transform: scale(0.98); }

        .vault-cancel-btn {
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(68,70,85,0.3);
          color: var(--on-surface);
          font-family: Inter, sans-serif;
          font-weight: 600;
          border-radius: 0.75rem;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 1rem;
        }

        .vault-cancel-btn:hover { background: var(--surface-container-high); }

        .vault-forgot-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(184,196,255,0.8);
          letter-spacing: 0.05em;
          transition: color 0.2s;
          font-family: Inter, sans-serif;
        }

        .vault-forgot-btn:hover { color: #b8c4ff; }
      `}</style>

      <div
        style={{
          backgroundColor: "#0e131e",
          color: "var(--on-background)",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "28rem",
            margin: "0 1rem",
            backgroundColor: "var(--surface-container)",
            padding: "2rem",
            borderRadius: "0.75rem",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            border: "1px solid rgba(68,70,85,0.2)",
          }}
        >
          {/* Lock Icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "9999px",
                background: "rgba(184,196,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(184,196,255,0.2)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "#b8c4ff", fontSize: "1.875rem", fontVariationSettings: "'FILL' 1" }}
              >
                lock
              </span>
            </div>
          </div>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--on-surface)", lineHeight: 1.4, padding: "0 1rem" }}>
              Transaction confirm karne ke liye UPI PIN enter karo
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "-0.025em" }}>Amount:</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#b8c4ff" }}>₹ 45,000.00</span>
            </div>
          </div>

          {/* PIN Dots */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              {pin.map((active, i) => (
                <div key={i} className={`pin-dot${active ? " active" : ""}`} />
              ))}
            </div>
            <button className="vault-forgot-btn" type="button">FORGOT PIN?</button>
          </div>

          {/* Numpad */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
              marginBottom: "2.5rem",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button key={n} className="numpad-btn" onClick={() => handleNumber(n)} type="button">
                {n}
              </button>
            ))}
            {/* Empty cell */}
            <div style={{ aspectRatio: "1" }} />
            <button className="numpad-btn" onClick={() => handleNumber(0)} type="button">0</button>
            <button className="numpad-btn" onClick={handleBackspace} type="button">
              <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)" }}>backspace</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button className="vault-confirm-btn" type="button">Confirm Pay</button>
            <button className="vault-cancel-btn" type="button">Cancel</button>
          </div>

          {/* Security Badge */}
          <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "rgba(196,197,215,0.6)", fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.1em" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "0.875rem" }}>verified_user</span>
            <span>SECURED BY 256-BIT ENCRYPTION</span>
          </div>
        </div>
      </div>
    </>
  );
}