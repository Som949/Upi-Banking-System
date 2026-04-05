import { useState } from "react";

const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "#6c88ff",
        "on-background": "#dee2f2",
        "tertiary-container": "#e2711a",
        surface: "#0e131e",
        secondary: "#bdc6e1",
        "primary-fixed": "#dde1ff",
        "surface-bright": "#343946",
        outline: "#8e90a1",
        "surface-container-low": "#171b27",
        "on-secondary": "#273045",
        tertiary: "#ffb68b",
        "on-error-container": "#ffdad6",
        primary: "#b8c4ff",
        "on-primary-fixed-variant": "#0036bb",
        "surface-tint": "#b8c4ff",
        "tertiary-fixed": "#ffdbc8",
        "surface-variant": "#303541",
        "on-tertiary": "#522300",
        "inverse-on-surface": "#2b303c",
        "on-primary-container": "#001f76",
        "tertiary-fixed-dim": "#ffb68b",
        "surface-container-high": "#252a36",
        "on-surface": "#dee2f2",
        "primary-fixed-dim": "#b8c4ff",
        "surface-container-lowest": "#090e19",
        "inverse-primary": "#264fdc",
        "on-error": "#690005",
        "on-tertiary-container": "#481e00",
        "secondary-fixed-dim": "#bdc6e1",
        "on-tertiary-fixed": "#321300",
        "error-container": "#93000a",
        "surface-dim": "#0e131e",
        "surface-container": "#1b1f2b",
        "surface-container-highest": "#303541",
        "outline-variant": "#444655",
        "inverse-surface": "#dee2f2",
        "secondary-fixed": "#d9e2fe",
        "on-tertiary-fixed-variant": "#753400",
        "secondary-container": "#3e465d",
        "on-secondary-container": "#acb5cf",
        "on-secondary-fixed": "#121b2f",
        "on-primary-fixed": "#001454",
        "on-surface-variant": "#c4c5d7",
        background: "#0e131e",
        "on-primary": "#002486",
        error: "#ffb4ab",
      },
    },
  },
};

export default function VaultSetUPIPin() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  return (
    <div
      className="dark"
      style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}
    >
      {/* Inject Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
        .pin-input::-webkit-outer-spin-button,
        .pin-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .pin-input {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Body */}
      <div
        style={{
          backgroundColor: "#0e131e",
          color: "#dee2f2",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Decorative Elements */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10%",
              left: "-10%",
              width: "40%",
              height: "40%",
              background: "rgba(184,196,255,0.05)",
              filter: "blur(120px)",
              borderRadius: "9999px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-10%",
              right: "-10%",
              width: "40%",
              height: "40%",
              background: "rgba(108,136,255,0.05)",
              filter: "blur(120px)",
              borderRadius: "9999px",
            }}
          />
        </div>

        {/* Main Content */}
        <main
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "28rem",
            margin: "0 auto",
          }}
        >
          {/* Branding */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                backgroundColor: "#1b1f2b",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                boxShadow: "0 8px 30px rgba(184,196,255,0.08)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: "#b8c4ff",
                  fontSize: "2.25rem",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                lock
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "1.875rem",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "#dee2f2",
                marginBottom: "0.5rem",
              }}
            >
              VAULT
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#c4c5d7",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Secure UPI Setup
            </p>
          </div>

          {/* Form Card */}
          <div
            style={{
              backgroundColor: "#1b1f2b",
              padding: "2rem",
              borderRadius: "2rem",
              boxShadow:
                "0 25px 50px -12px rgba(0,0,0,0.5)",
              border: "1px solid rgba(68,70,85,0.1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Enter PIN */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#c4c5d7",
                    marginLeft: "0.25rem",
                  }}
                >
                  Enter UPI PIN
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="pin-input"
                    type="password"
                    maxLength={6}
                    placeholder="••••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#090e19",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      letterSpacing: "1em",
                      border: "none",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      color: "#dde1ff",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "box-shadow 0.3s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px #6c88ff")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: "1rem",
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                      color: "rgba(142,144,161,0.5)",
                    }}
                  >
                    <span className="material-symbols-outlined">security</span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(142,144,161,0.6)",
                    paddingLeft: "0.25rem",
                  }}
                >
                  Choose a 6-digit PIN you've never used before.
                </p>
              </div>

              {/* Confirm PIN */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#c4c5d7",
                    marginLeft: "0.25rem",
                  }}
                >
                  Confirm UPI PIN
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="pin-input"
                    type="password"
                    maxLength={6}
                    placeholder="••••••"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "#090e19",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      letterSpacing: "1em",
                      border: "none",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      color: "#dde1ff",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "box-shadow 0.3s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px #6c88ff")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: "1rem",
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                      color: "rgba(142,144,161,0.5)",
                    }}
                  >
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                </div>
              </div>

              {/* Set PIN Button */}
              <div style={{ paddingTop: "1rem" }}>
                <button
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #b8c4ff, #6c88ff)",
                    color: "#001f76",
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 700,
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(108,136,255,0.3)",
                    transition: "box-shadow 0.3s, transform 0.15s",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 8px 25px rgba(108,136,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 4px 20px rgba(108,136,255,0.3)";
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = "scale(0.98)";
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Set PIN
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              opacity: 0.6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                shield
              </span>
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                End-to-End Encrypted
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD25mq1zEwXW1pB0BBniQ8zq3RckgfeZgOjfrhVDabVSS5cIgHTw_m2mmoXEEGvGJ3-0Qfpr1FbirGmzZnBShdvnEmTPuOFN3tMrShkkT5VRgW3zwXStM_EN8nbiuyOzwpPaTAn2TWHW1_UNBtT7z-zYDYHdIUWcMqSMYNb1GNqbX5V6JrALthzPtl6n2Od0ueXUTpF_UqX8Lc-RzMOBYFkpj-jNz6xclU55mBbe8WFyaQ0yGgwcanEMMpyiGYBrXqCzcWTnGb1WaBH"
                alt="PCI DSS compliant security logo in monochrome white"
                style={{ height: "1rem", opacity: 0.5, filter: "grayscale(1) invert(1)" }}
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcMR1FQGv_qMcxDAotqn_yru3jJJGHxxRE6KjA0I_dmZPV_WFTqVpDfia6YPkGwNG_1BSkKRja0rnRZBjI6SXGBFvYsnBUDzeWWZJ94bzsTkDFrv0WTBMwQUsf-wdT2mWQBCDrxJOF7W3Flr1jiZ0sKpci0ZkcOhqi68sxsHIpwAgRz6uHAchKBz9fq67ZbEpMGmr5hqhm1GxG0QEi2i-sT2jnqcKqGSjvqafLLqGOP4ZrIc0INSTwZ1kM5PGZcyjtbI7KfVV1CXm-"
                alt="UPI Unified Payments Interface logo in monochrome white"
                style={{ height: "1rem", opacity: 0.5, filter: "grayscale(1) invert(1)" }}
              />
            </div>
          </div>
        </main>

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent, transparent, rgba(14,19,30,0.4))",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}