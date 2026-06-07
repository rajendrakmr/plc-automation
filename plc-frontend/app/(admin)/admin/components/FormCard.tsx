// components/ui/FormCard.tsx

interface FormCardProps {
  title?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  noPadding?: boolean; // for cases like editor where padding is handled internally
}

const cardStyle: React.CSSProperties = {
  background: "var(--grey)",
  border: "1px solid #1e293b",
  borderRadius: "12px",
  overflow: "hidden",
  marginBottom: "20px",
};

const cardHeaderStyle: React.CSSProperties = {
  padding: "14px 20px",
  borderBottom: "1px solid #1e293b",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "black",
};

const cardBodyStyle: React.CSSProperties = {
  background: "var(--grey)",
  padding: "20px",
};

export default function FormCard({
  title,
  headerAction,
  children,
  noPadding = false,
}: FormCardProps) {
  return (
    <div style={cardStyle}>
      {title && (
        <div style={cardHeaderStyle}>
          <span style={cardTitleStyle}>{title}</span>
          {headerAction && headerAction}
        </div>
      )}
      <div style={noPadding ? {} : cardBodyStyle}>{children}</div>
    </div>
  );
}