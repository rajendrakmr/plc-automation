// components/ui/CheckboxList.tsx
// Generic checkbox list — used for both Categories and Tags

import { useState } from "react";

interface CheckboxItem {
  blog_tag_name: string;
  blog_tag_slug?: string;
  blog_tag_id: string;
}

interface CheckboxListProps {
  items: CheckboxItem[];
  selected: string[];
  onChange: (selected: string[]) => void;
  showFrequentTab?: boolean; // show "All / Frequent" tabs (used in Categories)
  frequentCount?: number;    // how many items count as "frequent" (default 3)
}

export default function CheckBoxList({
  items,
  selected,
  onChange,
  showFrequentTab = false,
  frequentCount = 3,
}: CheckboxListProps) {
  const [tab, setTab] = useState<"all" | "frequent">("all");

  const displayItems =
    showFrequentTab && tab === "frequent" ? items.slice(0, frequentCount) : items;

  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    background: active ? "#0d9488" : "#1e293b",
    color: active ? "#fff" : "#64748b",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  });

  const checkboxRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "7px 0",
    cursor: "pointer",
    fontSize: "14px",
    color: "black",
  };

  return (
    <div>
      {/* Tab pills */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        <button style={pillStyle(tab === "all")} onClick={() => setTab("all")}>
          All
        </button>
        {showFrequentTab && (
          <button
            style={pillStyle(tab === "frequent")}
            onClick={() => setTab("frequent")}
          >
            Frequent
          </button>
        )}
      </div>

      {/* Item list */}
      {displayItems.map((item) => (
        <label key={item.blog_tag_id} style={checkboxRowStyle}>
          <input
            type="checkbox"
            checked={selected.includes(item.blog_tag_id)}
            onChange={() => toggle(item.blog_tag_id)}
            style={{ accentColor: "#0d9488", width: "15px", height: "15px" }}
          />
          {item.blog_tag_name}
          {selected.includes(item.blog_tag_id) && (
            <span
              style={{
                marginLeft: "auto",
                background: "rgba(13,148,136,0.15)",
                color: "#0d9488",
                fontSize: "10px",
                padding: "1px 6px",
                borderRadius: "10px",
              }}
            >
              ✓
            </span>
          )}
        </label>
      ))}
    </div>
  );
}