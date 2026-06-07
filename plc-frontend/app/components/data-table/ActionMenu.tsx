"use client";

import { useEffect, useRef } from "react";
import type { RowAction } from "./types";

interface ActionMenuProps {
  postId: string | number;
  open: boolean;
  onToggle: () => void;
  onAction: (action: string, id: string | number) => void;
  actions: RowAction[];
}

export function ActionMenu({
  postId,
  open,
  onToggle,
  onAction,
  actions,
}: ActionMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;

    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onToggle]);

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div ref={ref} style={{ position: "relative" }} onClick={stop}>
      {/* Trigger Button */}
      <button
        onClick={(e) => {
          stop(e);
          onToggle();
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "5px 7px",
          borderRadius: "6px",
          color: "#94a3b8",
          fontSize: "18px",
          lineHeight: 1,
        }}
        aria-label="Row actions"
      >
        ⋮
      </button>

      {/* Dropdown */}
      {open && (
        <div
          onClick={stop}
          style={{
            position: "absolute",
            right: "30px",
            top: "-10px",
            background: "#0b1424",
            border: "1px solid #1e293b",
            borderRadius: "10px",
            minWidth: "170px",
            zIndex: 100,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,.4)",
          }}
          role="menu"
        >
          {actions.map((item, i) => (
            <button
              key={i}
              onClick={(e) => {
                stop(e);
                onAction(item.action, postId);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "9px 14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                color: item.danger ? "#ef4444" : "#e2e8f0",
                fontFamily: "inherit",
                textAlign: "left",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "#1e293b")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "none")
              }
            >
              <span style={{ fontSize: "14px" }}>{item.icon}</span>{" "}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}