import { useEffect } from "react";

export default function VaultLogin() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        :root {
          --color-tertiary-fixed-dim: #ffb68b;
          --color-surface-variant: #303541;
          --color-on-primary-fixed: #001454;
          --color-outline-variant: #444655;
          --color-on-primary: #002486;
          --color-on-error: #690005;
          --color-surface-container-highest: #303541;
          --color-on-secondary-fixed: #121b2f;
          --color-inverse-surface: #dee2f2;
          --color-on-background: #dee2f2;
          --color-secondary-fixed-dim: #bdc6e1;
          --color-surface-container-high: #252a36;
          --color-error-container: #93000a;
          --color-surface-container: #1b1f2b;
          --color-secondary-fixed: #d9e2fe;
          --color-primary: #b8c4ff;
          --color-secondary: #bdc6e1;
          --color-tertiary: #ffb68b;
          --color-on-tertiary-container: #481e00;
          --color-tertiary-container: #e2711a;
          --color-primary-container: #6c88ff;
          --color-background: #0e131e;
          --color-on-error-container: #ffdad6;
          --color-error: #ffb4ab;
          --color-outline: #8e90a1;
          --color-on-surface: #dee2f2;
          --color-surface-dim: #0e131e;
          --color-surface: #0e131e;
          --color-primary-fixed: #dde1ff;
          --color-on-primary-fixed-variant: #0036bb;
          --color-surface-container-lowest: #090e19;
          --color-on-surface-variant: #c4c5d7;
          --color-on-secondary-fixed-variant: #3e465d;
          --color-surface-bright: #343946;
          --color-secondary-container: #3e465d;
          --color-on-primary-container: #001f76;
          --color-tertiary-fixed: #ffdbc8;
          --color-on-secondary-container: #acb5cf;
          --color-surface-tint: #b8c4ff;
          --color-on-tertiary-fixed: #321300;
          --color-surface-container-low: #171b27;
          --color-primary-fixed-dim: #b8c4ff;
          --color-on-secondary: #273045;
          --color-on-tertiary-fixed-variant: #753400;
          --color-inverse-primary: #264fdc;
          --color-on-tertiary: #522300;
          --color-inverse-on-surface: #2b303c;
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
        }

        .vault-gradient {
          background: radial-gradient(circle at top right, rgba(108, 136, 255, 0.1), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(79, 115, 255, 0.05), transparent 40%);
        }

        .vault-mesh {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8c4ff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .vault-login-active:active {
          transform: scale(0.98);
        }

        .login-btn-inner:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Atmospheric Background Layers */}
      <div
        className="vault-mesh"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="vault-gradient"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Main Focus Canvas */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "0 1.5rem",
          textAlign: "center",
          backgroundColor: "var(--color-surface-dim)",
          fontFamily: "Inter, sans-serif",
          color: "var(--color-on-surface)",
          overflow: "hidden",
        }}
      >
        {/* Branding Section */}
        <div style={{ marginBottom: "4rem" }}>
          {/* Icon */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: "1.5rem" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(108,136,255,0.2)",
                filter: "blur(48px)",
                borderRadius: "9999px",
              }}
            />
            <div
              style={{
                position: "relative",
                background: "var(--color-surface-container-highest)",
                padding: "1.25rem",
                borderRadius: "1.5rem",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: "var(--color-primary-fixed-dim)",
                  fontSize: "3rem",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                lock
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                fontSize: "3rem",
                letterSpacing: "-0.025em",
                color: "white",
                margin: 0,
              }}
            >
              VAULT
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "var(--color-on-surface-variant)",
                fontSize: "1.125rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                marginTop: "0.5rem",
              }}
            >
              Fast &amp; Secure Payments
            </p>
          </div>
        </div>

        {/* Action Section */}
        <div style={{ width: "100%", maxWidth: "24rem" }}>
          {/* Login Button */}
          <button
            className="vault-login-active"
            style={{
              position: "relative",
              width: "100%",
              padding: "1.25rem 2rem",
              borderRadius: "0.75rem",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "1.125rem",
              overflow: "hidden",
              transition: "all 0.3s",
              border: "none",
              cursor: "pointer",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            <div
              className="login-btn-inner"
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to right, var(--color-primary-container), var(--color-primary))`,
                transition: "transform 0.3s",
              }}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                color: "var(--color-on-primary-fixed)",
              }}
            >
              <span>Login</span>
              <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
                arrow_forward
              </span>
            </div>
          </button>

          {/* Create Account Button */}
          <button
            className="vault-login-active"
            style={{
              width: "100%",
              padding: "1.25rem 2rem",
              borderRadius: "0.75rem",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "1.125rem",
              transition: "all 0.3s",
              background: "rgba(27, 31, 43, 0.4)",
              border: "1px solid rgba(68, 70, 85, 0.3)",
              color: "var(--color-primary)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(184,196,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(68, 70, 85, 0.3)")}
          >
            Create Account
          </button>
        </div>

        {/* Security Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            background: "var(--color-surface-container-low)",
            color: "rgba(196,197,215,0.6)",
            fontSize: "0.75rem",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            verified_user
          </span>
          <span>Military Grade Encryption</span>
        </div>
      </main>

      {/* Ambient Glow Textures */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          left: "-10%",
          width: "40%",
          height: "40%",
          background: "rgba(184,196,255,0.05)",
          filter: "blur(120px)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-10%",
          right: "-10%",
          width: "40%",
          height: "40%",
          background: "rgba(226,113,26,0.05)",
          filter: "blur(120px)",
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
      />
    </>
  );
}