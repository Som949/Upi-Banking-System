export default function VaultProfileCard() {
  const c = {
    background: "#0e131e",
    surfaceContainer: "#1b1f2b",
    surfaceContainerHighest: "#303541",
    onSurface: "#dee2f2",
    onSurfaceVariant: "#c4c5d7",
    primary: "#b8c4ff",
    primaryContainer: "#6c88ff",
    outlineVariant: "#444655",
  };

  const fields = [
    [
      { label: "UPI ID", icon: "contactless", value: "9876543210@bankupi" },
      { label: "Phone Number", icon: "smartphone", value: "+91 9876543210" },
    ],
    [
      { label: "Account Number", icon: "account_balance_wallet", value: "XXXXXX4179", spacing: true },
      { label: "Member Since", icon: "calendar_today", value: "Nov 2023" },
    ],
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: c.background, color: c.onSurface, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
        }
      `}</style>

      <div style={{ maxWidth: "36rem", width: "100%" }}>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900, fontSize: "1.875rem", letterSpacing: "-0.05em", color: c.primary, margin: 0 }}>VAULT</h1>
          <p style={{ fontSize: "0.875rem", color: c.onSurfaceVariant, letterSpacing: "0.2em", marginTop: "0.5rem", textTransform: "uppercase" }}>Secure Digital Assets</p>
        </div>

        {/* Glass Card outer */}
        <div style={{
          background: "linear-gradient(135deg, rgba(27,31,43,0.7) 0%, rgba(14,19,30,0.8) 100%)",
          backdropFilter: "blur(20px)",
          borderRadius: "2rem",
          padding: "1px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}>
          {/* Inner card */}
          <div style={{ backgroundColor: c.surfaceContainer, borderRadius: "1.8rem", padding: "3rem", position: "relative", overflow: "hidden" }}>

            {/* Atmospheric glows */}
            <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "16rem", height: "16rem", background: "rgba(184,196,255,0.1)", filter: "blur(100px)", borderRadius: "9999px" }} />
            <div style={{ position: "absolute", bottom: "-6rem", left: "-6rem", width: "16rem", height: "16rem", background: "rgba(184,196,255,0.05)", filter: "blur(80px)", borderRadius: "9999px" }} />

            {/* Profile Identity */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
              {/* Avatar */}
              <div style={{
                width: "6rem", height: "6rem", borderRadius: "9999px", padding: "4px",
                background: "linear-gradient(135deg, #b8c4ff, transparent)",
                marginBottom: "1.5rem",
              }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "9999px", backgroundColor: c.surfaceContainerHighest, overflow: "hidden" }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmw3us9N3IKlUUljFWqvyz8kC0RB_f9ezcXKp_3STC6G-tYmzhUSmxPwXXiZgcYnHayDqquvyanglN7YxSe7j8itNDcLJVR943gHGt5igS3oq2MCfYzgiDC6D68gUt_epOpFrEnioOSrhwSyPWpauLKqezNddnFCoE9jRWtCLPuVWsJy2fepmDPkeYHfWffNKAiRzCc65PrenRAgmFRGwvFJg7lazwwdLLuvXNmeVwEwRBHF7Ji3XeNYgmAgp0WlFRPsek1lohCGbL"
                    alt="Aarav Mehta"
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.8 }}
                  />
                </div>
              </div>

              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "1.875rem", color: c.onSurface, letterSpacing: "-0.025em", margin: 0 }}>Aarav Mehta</h2>
              <span style={{
                marginTop: "0.5rem", padding: "0.25rem 1rem", borderRadius: "9999px",
                backgroundColor: "rgba(184,196,255,0.1)",
                border: "1px solid rgba(184,196,255,0.2)",
                color: c.primary, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>Premium Member</span>
            </div>

            {/* Data Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 1 }}>
              {fields.map((row, ri) => (
                <div key={ri}>
                  {ri > 0 && (
                    <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(68,70,85,0.3), transparent)", marginBottom: "2rem" }} />
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {row.map(field => (
                      <div key={field.label} style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                        <label style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: c.onSurfaceVariant, fontWeight: 700 }}>
                          {field.label}
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span className="material-symbols-outlined" style={{ color: c.primary, fontSize: "1.25rem" }}>{field.icon}</span>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: c.onSurface, fontSize: "1.125rem", letterSpacing: field.spacing ? "0.1em" : undefined, margin: 0 }}>
                            {field.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Read-only notice */}
            <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "rgba(196,197,215,0.4)" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>lock</span>
              <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500 }}>Vault Encrypted Profile Data</span>
            </div>

          </div>
        </div>

        {/* Footer dots */}
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", opacity: 0.2 }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: "0.25rem", height: "0.25rem", borderRadius: "9999px", backgroundColor: c.primary }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}