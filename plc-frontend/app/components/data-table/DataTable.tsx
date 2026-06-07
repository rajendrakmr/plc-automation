"use client";

import { useState } from "react";
import { TabBar } from "./TabBar";
import { BulkBar } from "./BulkBar";
import { ActionMenu } from "./ActionMenu";
import type { DataTableProps, SortDir } from "./types";
import { useRouter } from "next/navigation";
// ─── Internal sort state (optional — pass sortKey/sortDir/onSort for external control) ──

export function DataTable<T extends Record<string, unknown>>({
  rows,
  rowKey,
  columns,
  total,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
  onSearch,
  searchPlaceholder = "Search…",
  sortKey: externalSortKey,
  sortDir: externalSortDir,
  onSort,
  loading,
  error,
  onRefetch,
  tabs,
  activeTab,
  onTabChange,
  rowActions = [],
  bulkActions = [],
  onRowAction,
  onBulkAction,
  title,
  headerSlot,
  editPage,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const [openMenu, setOpenMenu] = useState<string | number | null>(null);
  const router = useRouter();
  // Internal sort state (used only when no external sort provided)
  const [intSortKey, setIntSortKey] = useState<keyof T>(columns[0]?.key);
  const [intSortDir, setIntSortDir] = useState<SortDir>("asc");

  const sortKey = externalSortKey ?? intSortKey;
  const sortDir = externalSortDir ?? intSortDir;

  const handleSort = (key: keyof T) => {
    if (onSort) {
      onSort(key);
    } else {
      if (intSortKey === key) setIntSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else { setIntSortKey(key); setIntSortDir("asc"); }
    }
    onPageChange(1);
  };

  const allPageSelected = rows.length > 0 && rows.every((r) => selected.has(r[rowKey] as string | number));

  const toggleAll = () => {
    const next = new Set(selected);
    if (allPageSelected) rows.forEach((r) => next.delete(r[rowKey] as string | number));
    else rows.forEach((r) => next.add(r[rowKey] as string | number));
    setSelected(next);
  };

  const toggleRow = (id: string | number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const handleBulkAction = (action: string) => {
    onBulkAction?.(action, [...selected]);
    setSelected(new Set());
  };

  const handleRowAction = (action: string, id: string | number) => {
    setOpenMenu(null);
    if (editPage) {
      router.push(editPage);
    }
    onRowAction?.(action, id);
  };

  // Shared styles
  const S = {
    th: (active: boolean): React.CSSProperties => ({
      background: "var(--blue)", textTransform: "uppercase" as const,
      fontSize: "12px", fontWeight: 900, color: "#ffffff",
      textAlign: "left" as const, padding: "15px 10px",
      borderBottom: "1px solid #1e293b", cursor: "pointer",
      userSelect: "none" as const, whiteSpace: "nowrap" as const,
    }),
    td: {
      background: "var(--grey)", color: "black", padding: "10px 10px",
      borderBottom: "1px solid #111d2e", verticalAlign: "middle" as const,
      fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis",
      whiteSpace: "nowrap" as const,
    },
    btn: {
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "6px 13px", border: "1px solid #1e293b", borderRadius: "8px",
      background: "var(--white)", cursor: "pointer", fontSize: "13px", fontWeight: "bold",
    } as React.CSSProperties,
    pgBtn: (active: boolean, disabled?: boolean): React.CSSProperties => ({
      padding: "5px 11px", border: "1px solid #1e293b", borderRadius: "6px",
      background: active ? "#0d9488" : "transparent",
      cursor: disabled ? "default" : "pointer", fontSize: "13px",
      color: active ? "#fff" : disabled ? "#334155" : "#e2e8f0",
      fontFamily: "inherit",
    }),
  };

  const sortArrow = (key: keyof T) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  // Pagination helper
  const paginationPages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | "...")[]>((acc, p, i, arr) => {
      if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=checkbox] { accent-color: #0d9488; width: 14px; height: 14px; cursor: pointer; }
        tr:hover td { background: rgba(255,255,255,.025); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--white)", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px 32px" }}>

          {/* Topbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0 10px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#f1f5f9" }}>{title}</h1>
            <div style={{ display: "flex", gap: "8px" }}>
              {headerSlot}
              {onRefetch && (
                <button style={S.btn} onClick={onRefetch} aria-label="Refresh">↻</button>
              )}
            </div>
          </div>

          {/* Tabs */}
          {tabs && activeTab && onTabChange && (
            <TabBar tabs={tabs} active={activeTab} onChange={onTabChange} />
          )}

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <select
              value={limit}
              onChange={(e) => onLimitChange(+e.target.value)}
              style={{ ...S.btn, cursor: "pointer" }}
            >
              {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n} / page</option>)}
            </select>

            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "9px", top: "50%", transform: "translateY(-50%)", color: "#334155", fontSize: "14px", pointerEvents: "none" }}>
                🔍
              </span>
              <input
                style={{ padding: "7px 10px 7px 30px", border: "1px solid #1e293b", borderRadius: "8px", background: "var(--white)", color: "black", fontSize: "13px", fontFamily: "inherit", width: "220px", outline: "none" }}
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Bulk bar */}
          <BulkBar
            count={selected.size}
            actions={bulkActions}
            onAction={handleBulkAction}
            onClear={() => setSelected(new Set())}
          />

          {/* Error */}
          {error && (
            <div style={{ padding: "12px 16px", marginBottom: "12px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: "8px", color: "#f87171", fontSize: "13px" }}>
              ⚠ {error} —{" "}
              {onRefetch && (
                <button onClick={onRefetch} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", textDecoration: "underline" }}>
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th style={{ ...S.th(false), width: "36px" }}>
                    <input type="checkbox" checked={allPageSelected} onChange={toggleAll} aria-label="Select all" />
                  </th>
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      style={{ ...S.th(sortKey === col.key), width: col.width }}
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}{sortArrow(col.key)}
                    </th>
                  ))}
                  {rowActions.length > 0 && (
                    <th style={{ ...S.th(false), width: "48px" }}>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + 2} style={{ ...S.td, textAlign: "center", padding: "32px", color: "#64748b" }}>
                      Loading…
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} style={{ ...S.td, textAlign: "center", padding: "32px", color: "#64748b" }}>
                      No records found
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => {
                    const id = row[rowKey] as string | number;
                    return (
                      <tr key={id} style={{ background: selected.has(id) ? "rgba(13,148,136,.07)" : "transparent" }}>
                        <td style={S.td}>
                          <input type="checkbox" checked={selected.has(id)} onChange={() => toggleRow(id)} />
                        </td>
                        {columns.map((col) => (
                          <td key={String(col.key)} style={S.td}>
                            {col.render
                              ? col.render(row[col.key], row)
                              : String(row[col.key] ?? "")}
                          </td>
                        ))}
                        {rowActions.length > 0 && (
                          <td style={{ ...S.td, overflow: "visible" }}>
                            <ActionMenu
                              postId={id}
                              open={openMenu === id}
                              onToggle={() => setOpenMenu(openMenu === id ? null : id)}
                              onAction={handleRowAction}
                              actions={rowActions}
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", fontSize: "13px", color: "#64748b" }}>
            <span>
              Showing{" "}
              <strong style={{ color: "#e2e8f0" }}>
                {total === 0 ? 0 : (page - 1) * limit + 1}–{Math.min(page * limit, total)}
              </strong>{" "}
              of <strong style={{ color: "#e2e8f0" }}>{total}</strong>
            </span>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <button style={S.pgBtn(false, page === 1)} disabled={page === 1} onClick={() => onPageChange(page - 1)}>‹</button>
              {paginationPages.map((p, i) =>
                p === "..." ? (
                  <span key={`e-${i}`} style={{ padding: "0 4px", color: "#334155" }}>…</span>
                ) : (
                  <button key={p} style={S.pgBtn(page === p)} onClick={() => onPageChange(p as number)}>
                    {p}
                  </button>
                )
              )}
              <button style={S.pgBtn(false, page >= totalPages)} disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>›</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}