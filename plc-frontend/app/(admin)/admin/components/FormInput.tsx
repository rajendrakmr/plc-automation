// components/ui/FormInput.tsx

interface FormInputProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
   className?: string;
}

export default function FormInput({
  placeholder,
  value,
  onChange,
  type = "text",
  className="",
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "var(--white)",
        border: "1px solid #6f6f6f",
        borderRadius: "8px",
        padding: "11px 14px",
        fontSize: "14px",
        fontFamily: "'DM Sans', sans-serif",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#0d9488")}
      onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
    />
  );
}