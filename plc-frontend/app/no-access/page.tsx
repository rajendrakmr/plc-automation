// app/no-access/page.tsx

export default function NoAccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "24px",
        textAlign: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🖥️</div>

      {/* Heading */}
      <h1
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#0f172a",
          margin: "0 0 10px",
        }}
      >
        Desktop Only
      </h1>

      {/* Message */}
      <p
        style={{
          fontSize: "14px",
          color: "#64748b",
          maxWidth: "280px",
          lineHeight: 1.6,
          margin: "0 0 8px",
        }}
      >
        This admin portal is not accessible on mobile devices.
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#94a3b8",
          maxWidth: "280px",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Please open this page on a desktop or laptop to continue.
      </p>

      {/* Divider */}
      <div
        style={{
          width: "40px",
          height: "2px",
          background: "#e2e8f0",
          margin: "24px auto",
          borderRadius: "2px",
        }}
      />

      <p
        style={{
          fontSize: "11px",
          color: "#cbd5e1",
          margin: 0,
        }}
      >
        PLC Automation Group — Admin Portal
      </p>
    </main>
  );
}