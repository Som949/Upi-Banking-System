export default function VaultBalanceResult() {
  const c = {
    background: "#0e131e",
    surfaceContainer: "#1b1f2b",
    surfaceContainerLowest: "#090e19",
    surfaceContainerHighest: "#303541",
    surfaceVariant: "#303541",
    onSurface: "#dee2f2",
    onSurfaceVariant: "#c4c5d7",
    primary: "#b8c4ff",
    primaryContainer: "#6c88ff",
    onPrimaryFixed: "#001454",
    outlineVariant: "#444655",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: c.background, color: c.onSurface, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
        }
        .fill-icon { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .btn-ghost:hover { background-color: #303541 !important; }
        .btn-ghost:active { transform: scale(0.95); }
        .btn-primary:hover { opacity: 0.9; }
        .btn-primary:active { transform: scale(0.95); }
        .support-link:hover { text-decoration: underline; }
      `}</style>

      {/* Glass glow bg */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(184,196,255,0.1) 0%, rgba(14,19,30,0) 70%)", pointerEvents: "none" }} />

      {/* Corner gradients */}
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "16rem", height: "16rem", background: "rgba(184,196,255,0.05)", borderRadius: "9999px", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: 0, right: 0, width: "24rem", height: "24rem", background: "rgba(184,196,255,0.05)", borderRadius: "9999px", filter: "blur(150px)", pointerEvents: "none" }} />

      <main style={{ width: "100%", maxWidth: "32rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.025em", color: c.primary }}>
            Check Account Balance
          </h1>
          <p style={{ color: c.onSurfaceVariant, fontSize: "0.875rem", marginTop: "0.5rem" }}>
            Real-time valuation from your linked institutions
          </p>
        </header>

        {/* Main Balance Card */}
        <div style={{ width: "100%", backgroundColor: c.surfaceContainer, borderRadius: "0.75rem", padding: "2rem", position: "relative", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
          {/* Decorative blob */}
          <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "12rem", height: "12rem", background: "rgba(184,196,255,0.05)", borderRadius: "9999px", filter: "blur(48px)" }} />

          {/* Verified badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <div style={{
              backgroundColor: "rgba(184,196,255,0.1)",
              color: c.primary,
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
              display: "flex", alignItems: "center", gap: "0.5rem",
              border: "1px solid rgba(184,196,255,0.2)",
            }}>
              <span className="material-symbols-outlined fill-icon" style={{ fontSize: "18px" }}>verified</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Verified Successfully</span>
            </div>
          </div>

          {/* Balance */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: c.onSurfaceVariant, fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.5rem" }}>Available Balance</p>
            <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "3rem", color: c.onSurface, letterSpacing: "-0.025em", lineHeight: 1 }}>
              <span style={{ color: c.primaryContainer, fontSize: "1.875rem", verticalAlign: "top", marginRight: "0.25rem" }}>Rs.</span>
              24,501.75
            </h2>
          </div>

          {/* Account Details */}
          <div style={{
            backgroundColor: c.surfaceContainerLowest,
            borderRadius: "0.5rem",
            padding: "1.5rem",
            border: `1px solid rgba(68,70,85,0.1)`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "3rem", height: "3rem",
                backgroundColor: c.surfaceContainerHighest,
                borderRadius: "0.5rem",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ color: c.primary }}>account_balance</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: c.onSurface, fontSize: "1rem" }}>HDFC Savings Account</h3>
                <p style={{ color: c.onSurfaceVariant, fontSize: "0.875rem", letterSpacing: "0.15em" }}>XXXX XXXX 8829</p>
              </div>
              <span className="material-symbols-outlined" style={{ color: "rgba(196,197,215,0.4)" }}>info</span>
            </div>
          </div>

          {/* Timestamp */}
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "rgba(196,197,215,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <span>Last Updated: Today, 14:22</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span className="material-symbols-outlined fill-icon" style={{ fontSize: "12px" }}>lock</span>
              Encrypted Connection
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ width: "100%", marginTop: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <button className="btn-ghost" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            padding: "1rem 1.5rem", borderRadius: "0.75rem",
            fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.875rem",
            backgroundColor: c.surfaceContainerHighest, color: c.onSurface,
            border: `1px solid rgba(68,70,85,0.2)`, cursor: "pointer",
            transition: "background-color 0.2s, transform 0.15s",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>history</span>
            View History
          </button>
          <button className="btn-primary" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            padding: "1rem 1.5rem", borderRadius: "0.75rem",
            fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "0.875rem",
            background: `linear-gradient(135deg, ${c.primary}, ${c.primaryContainer})`,
            color: c.onPrimaryFixed,
            border: "none", cursor: "pointer",
            boxShadow: "0 4px 20px rgba(108,136,255,0.1)",
            transition: "opacity 0.2s, transform 0.15s",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>dashboard</span>
            Back to Dashboard
          </button>
        </div>

        {/* Support */}
        <p style={{ marginTop: "3rem", color: "rgba(196,197,215,0.5)", fontSize: "0.75rem" }}>
          Facing issues?{" "}
          <a className="support-link" href="#" style={{ color: c.primary, textDecoration: "none", transition: "text-decoration 0.2s" }}>
            Contact Vault Support
          </a>
        </p>

      </main>
    </div>
  );
}