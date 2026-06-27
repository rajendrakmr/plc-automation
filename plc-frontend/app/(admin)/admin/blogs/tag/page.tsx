"use client";

import { useDelete } from "@/app/components/hooks/useDelete";
import { useFetch, PaginatedResponse } from "@/app/components/hooks/useFetch";
import { truncate } from "@/app/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useMemo } from "react";


interface FilterState {
  search: string;
  status: string;
}

export interface Category {
  blog_tag_id: number;
  blog_tag_name: string;
  blog_tag_slug: string;
  status: number | string;
  updated_at: any;
}

type SortDir = "asc" | "desc";
type ActiveTab = "all" | "published" | "trash";



function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="sort-icon">↕</span>;
  return <span className="sort-icon active">{dir === "asc" ? "↑" : "↓"}</span>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [sortKey, setSortKey] = useState<keyof Category | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<FilterState>({ search: "", status: "" });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", status: "" });

  // ── Real API fetch ──────────────────────────────────────────────────────────
  const { loading, error, data, total, totalPages, refetch } =
    useFetch<PaginatedResponse<Category>>({
      url: "/blogs/tag",
      params: {
        page,
        limit,
        search: filters.search || undefined,
        status: filters.status || undefined,
        sort: sortKey ?? undefined,
        dir: sortDir,
        tab: activeTab,
      },
    });

  // records from API response
  const products = data?.records ?? [];

  // ── Derived ─────────────────────────────────────────────────────────────────
  const activeFilterCount = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters]
  );

  const pageNumbers = (() => {
    const pages: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("…");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  })();
 

  const handleApplyFilters = () => { setFilters({ ...pendingFilters }); setPage(1); };

  const handleClearFilters = () => {
    const empty: FilterState = { search: "", status: "" };
    setPendingFilters(empty);
    setFilters(empty);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 700);
  };
 
  const handleBulkAction = (action: string) => {
    console.log("Bulk action:", action, [...selected]);
    setSelected(new Set());
    refetch();
  };

 
  const router = useRouter();
  const handleRowEditAction = (row: any) => {
    sessionStorage.setItem("blog-tag-edit", JSON.stringify(row));
    router.push("/admin/blogs/tag/edit?mode=edit");
  };

    const { loading: isDeleting, success, message, remove, reset: deleteReset } = useDelete({
      url: "/blogs/tag",
      onSuccess: (msg) => { 
        refetch();
      },
      onError: (err) => { },
    });
  
    const handleDelete = (id: number | string) => {
      if (!window.confirm("Are you sure you want to delete this?")) return;
      remove(id);
    };
  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="products-page">
        <div className="rk_topbar">
          <div className="rk_topbar-left">
            <span className="page-title">Tags</span>
            <span className="badge badge-info">{total}</span>
          </div>
          <div className="rk_topbar-right">
            <button className="btn btn-icon" title="Refresh" aria-label="Refresh data" onClick={handleRefresh}>
              <span className={refreshing ? "spin" : ""}>↺</span>
            </button>
            <button className="btn" onClick={() => setFilterVisible((v) => !v)}>
              ⚙ Filters
              {activeFilterCount > 0 && (
                <span className="badge badge-info" style={{ marginLeft: 2 }}>{activeFilterCount}</span>
              )}
            </button>
            <Link href={'/admin/blogs/tag/add'} className="btn btn-primary" onClick={() => console.log("Navigate to /admin/blogs/tag/add")}>
              + Add Tag
            </Link>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        {filterVisible && (
          <>
            <div className="filter-bar">
              <div className="filter-group search-wrap">
                <label>Search</label>
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by tag, description..."
                  value={pendingFilters.search}
                  onChange={(e) => setPendingFilters((f) => ({ ...f, search: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                />
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select value={pendingFilters.status} onChange={(e) => setPendingFilters((f) => ({ ...f, status: e.target.value }))}>
                  <option value="">All</option>
                  <option value="1">Active</option>
                  <option value="0">In Active</option>
                </select>
              </div>
            </div>
            <div className=" filter-actions" style={{ paddingBottom: "3px" }}>
              <button className="btn" onClick={handleClearFilters}>Clear</button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>Apply</button>
            </div>
          </>
        )}

        {/* ── Table ── */}
        <div className="table-wrap">
          {selected.size > 0 && (
            <div className="bulk-bar">
              <span className="bulk-bar-text">{selected.size} selected</span>
              <button className="btn btn-danger" style={{ marginLeft: "auto" }} onClick={() => handleBulkAction("trash")}>🗑 Trash</button>
            </div>
          )}

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className={loading ? "loading-overlay" : ""}>
            <table>
              <thead>
                <tr>
                  {/* <th className="col-check no-sort">
                    <input type="checkbox" checked={allSelected} onChange={(e) => handleSelectAll(e.target.checked)} aria-label="Select all" />
                  </th> */}
                  <th className="col-part">
                    Tag Name
                  </th>
                  {/* <th className="col-cat" onClick={() => handleSort("blog_tag_slug")}>
                    Slug <SortIcon active={sortKey === "blog_tag_slug"} dir={sortDir} />
                  </th> */}
                  <th className="col-cat">
                    Status
                  </th>
                  <th className="col-actions no-sort"> Action </th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        {loading ? "Loading..." : "No products found"}
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((item) => (
                    <tr key={item.blog_tag_id} className={selected.has(item.blog_tag_slug) ? "row-selected" : ""}>
                      {/* <td className="col-check">
                        <input
                          type="checkbox"
                          checked={selected.has(item.blog_tag_slug)}
                          onChange={(e) => handleSelectRow(item.blog_tag_slug, e.target.checked)}
                          aria-label={`Select ${item.blog_tag_id}`}
                        />
                      </td> */}
                      <td className="col-part"><span className="part-no">{truncate(item.blog_tag_name, 10)}</span></td>
                      {/* <td className="col-cat"><span className="type-pill">{item.blog_tag_slug}</span></td> */}
                      <td className="col-cat"><span className="type-pill" style={{ backgroundColor: item.status === 1 ? "#d4edda" : "#f8d7da", color: item.status === 1 ? "#155724" : "#721c24" }}>
                        {item.status === 1 ? "Active" : "Inactive"}
                      </span></td>
                      <td className="col-actions">
                        <button className="action-btn" title="Edit" aria-label={`Edit ${item.blog_tag_id}`} onClick={() => handleRowEditAction(item)}>✏️</button>

                          <button
                          title="Trash"
                          aria-label={`Trash ${item.blog_tag_id}`}
                          className="action-btn danger"
                          onClick={() => handleDelete(item.blog_tag_id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting…" : "🗑️"}
                        </button>
                        {/* <button className="action-btn danger" title="Trash" aria-label={`Trash ${item.blog_tag_id}`} onClick={() => handleRowAction("trash", item.blog_tag_slug)}>🗑️</button> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer ── */}
          <div className="table-footer">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="page-info">Rows:</span>
              <select className="limit-select" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
                {[10, 25, 50, 100].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <span className="page-info">
              Showing <strong>{total ? (page - 1) * limit + 1 : 0}–{Math.min(page * limit, total)}</strong> of <strong>{total}</strong>
            </span>
            <div className="pagination">
              <button className="pg-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">‹</button>

              {pageNumbers.map((n) => (
                <button key={n} className={`pg-btn ${n === page ? "pg-active" : ""}`} onClick={() => setPage(n as number)} aria-current={n === page ? "page" : undefined}>{n}</button>
              ))}
              <button className="pg-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page">›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}