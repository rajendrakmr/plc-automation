"use client";

import type { BulkAction } from "./types";

interface BulkBarProps {
  count: number;
  actions: BulkAction[];
  onAction: (action: string) => void;
  onClear: () => void;
}

const btnStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: "5px",
  padding: "6px 13px", border: "1px solid #1e293b",
  borderRadius: "8px", background: "var(--white)",
  cursor: "pointer", fontSize: "12px", fontWeight: "bold",
};

export function BulkBar({ count, actions, onAction, onClear }: BulkBarProps) {
  if (count === 0) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "8px 14px",
      background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.2)",
      borderRadius: "8px", marginBottom: "10px",
      fontSize: "13px", color: "#38bdf8",
    }}>
      <strong>{count}</strong> selected

      {actions.map((a, i) => (
        <button
          key={i}
          style={{ ...btnStyle, color: a.danger ? "#f87171" : undefined }}
          onClick={() => onAction(a.action)}
        >
          {a.icon} {a.label}
        </button>
      ))}

      <button
        style={{ ...btnStyle, marginLeft: "auto" }}
        onClick={onClear}
      >
        ✕
      </button>
    </div>
  );
}