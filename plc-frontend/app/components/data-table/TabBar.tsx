"use client";

import type { TabDef } from "./types";

interface TabBarProps {
  tabs: TabDef[];
  active: string;
  onChange: (key: string) => void;
}

const badgeStyle = (type: TabDef["badgeType"] = "info"): React.CSSProperties => ({
  display: "inline-block", padding: "1px 7px", borderRadius: "20px",
  fontSize: "11px", fontWeight: 500,
  ...(type === "success"
    ? { background: "rgba(34,197,94,.12)", color: "#4ade80" }
    : type === "danger"
    ? { background: "rgba(239,68,68,.12)", color: "#f87171" }
    : { background: "rgba(14,165,233,.15)", color: "#38bdf8" }),
});

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div style={{ display: "flex", background: "#f4f6fa", borderBottom: "1px solid #1e293b", marginBottom: "14px" }}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            padding: "9px 14px", fontSize: "13px", cursor: "pointer",
            border: "none", background: "none", fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: active === t.key ? "#0d9488" : "#64748b",
            borderBottom: `2px solid ${active === t.key ? "#0d9488" : "transparent"}`,
          }}
        >
          {t.label}
          {t.count !== undefined && t.count !== null && (
            <span style={badgeStyle(t.badgeType)}>{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}