// components/ui/Label.tsx

export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "black",
        marginBottom: "8px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {children}
    </label>
  );
}