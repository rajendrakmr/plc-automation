"use client";

import { useDelete } from "@/app/components/hooks/useDelete";
import { useFetch, PaginatedResponse } from "@/app/components/hooks/useFetch";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";
import Link from "next/link";
import { useState, useMemo } from "react";



export interface FeatureType {
  feature_id: string;
  id: number;
  feature_type: string;
  types: string;
  title?: string;
  status: "active" | "inactive";
}


const CATEGORIES: any = [
  { label: "Header Most Popular", value: "popular" },
  { label: "Header Grid Menu", value: "header" },
  { label: "AboutUs Page Brands", value: "about" },
  { label: "Home Page Manufacturers", value: "home" },
  { label: "Footer Manufacturers", value: "footer" },
]

function StockBadge({ types }: { types: FeatureType["types"] }) {
  const map = {
    popular: "Header Most Popular",
    header: "Header Grid Menu",
    about: "About Us Page Brands",
    home: "Home Page Manufacturers",
    footer: "Footer Manufacturers",
  } as const;

  return (
    <span className="badge-stock badge-in">
      {map[types as keyof typeof map] ?? "Unknown"}
    </span>
  );
}

interface FilterState {
  search: string;
  type: string;
  status: string;
  isSearch?: boolean;
  isClear?: boolean;
}

type SortDir = "asc" | "desc";
type ActiveTab = "all" | "published" | "trash";


// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [sortKey, setSortKey] = useState<keyof FeatureType | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<FilterState>({ search: "", type: "", status: "", isSearch: false });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", type: "", status: "", isSearch: false });

  // ── Real API fetch ──────────────────────────────────────────────────────────
  const { loading, error, data, total, totalPages, refetch, reset, isResetLoading, isSearchLoading } =
    useFetch<PaginatedResponse<FeatureType>>({
      url: "/feature_types",
      params: {
        page,
        limit,
        search: filters.search || undefined,
        type: "category",
        status: filters.status || undefined,
        sort: sortKey ?? undefined,
        isClear: filters.isClear || undefined,
        isSearch: filters.isSearch || undefined,
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
  const allSelected =
    products.length > 0 && products.every((p) => selected.has(p.feature_id));


  const handleApplyFilters = () => { setSelected(new Set()); setFilters({ ...pendingFilters, isSearch: true }); setPage(1); };

  const handleClearFilters = () => {
    setSelected(new Set());
    const empty: FilterState = { search: "", type: "", status: "", isSearch: false, isClear: true };
    setPendingFilters(empty);
    setFilters(empty);
    setPage(1);
  };

  const handleRefresh = () => {
    setSelected(new Set());
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 700);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? new Set(products.map((p) => p.feature_id)) : new Set());
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };



  const handleBulkAction = (action: string) => {
    console.log("Bulk action:", action, [...selected]);
    setSelected(new Set());
    refetch();
  };

  const handleRowAction = (action: string, partNo: string) => {
    console.log("Row action:", action, partNo);
    refetch();
  };

  const CATEGORIES: any = [
    { label: "Header Most Popular", value: "popular" },
    { label: "Header Grid Menu", value: "header" },
    { label: "AboutUs Page Brands", value: "about" },
    { label: "Home Page Manufacturers", value: "home" },
    { label: "Footer Manufacturers", value: "footer" },
  ]

  // ── Render ───────────────────────────────────────────────────────────────────


  const { loading: isDeleting, success, message, remove, reset: deleteReset } = useDelete({
    url: "/feature_types",
    onSuccess: (msg) => {
      // toast.success(msg); // "Feature deleted successfully"
      refetch();
    },
    onError: (err) => { },
  });
  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    remove(id);
  };
  return (
    <>
      <div className="products-page">
        <div className="rk_topbar">
          <div className="rk_topbar-left">
            <span className="page-title">Features</span>
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
            <Link href={'/admin/products/feature/add'} className="btn btn-primary" onClick={() => console.log("Navigate to /admin/products/add")}>
              + Add Feature
            </Link>
          </div>
        </div>

        {filterVisible && (
          <>
            <div className="filter-bar">
              <div className="filter-group">
                <label>Positions</label>
                <select value={pendingFilters.search} onChange={(e) => setPendingFilters((f) => ({ ...f, search: e.target.value }))}>
                  <option value="">All </option>

                  {CATEGORIES?.map((item: any) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label.trim()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Status</label>
                <select value={pendingFilters.status} onChange={(e) => setPendingFilters((f) => ({ ...f, status: e.target.value }))}>
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">In Active</option>
                </select>
              </div>

            </div>
            <div className="filter-actions">
              <button className="btn" disabled={isResetLoading || isSearchLoading} onClick={handleClearFilters}>Clear</button>
              <button className="btn btn-primary" disabled={isResetLoading || isSearchLoading} onClick={handleApplyFilters}>{isSearchLoading && <ButtonLoader />}  {isSearchLoading ? "Searching..." : "Apply"}</button>
            </div>
          </>
        )}



        {/* ── Table ── */}
        <div className="table-wrap">
          {selected.size > 0 && (
            <div className="bulk-bar">
              <span className="bulk-bar-text">{selected.size} selected</span>
              <button className="btn" style={{ marginLeft: "auto" }} onClick={() => handleBulkAction("publish")}>✓ Publish</button>
              <button className="btn" onClick={() => handleBulkAction("draft")}>✏ Draft</button>
              <button className="btn btn-danger" onClick={() => handleBulkAction("trash")}>🗑 Trash</button>
            </div>
          )}

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className={loading ? "loading-overlay" : ""}>
            <table>
              <thead>
                <tr>
                  <th className="col-check no-sort">
                    <input type="checkbox" checked={allSelected} onChange={(e) => handleSelectAll(e.target.checked)} aria-label="Select all" />
                  </th>
                  <th className="col-part">
                    Title
                  </th>
                  <th className="col-type">
                    Positions
                  </th>

                  <th className="col-stock">
                    Status
                  </th>
                  <th className="col-actions no-sort" />
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
                  products.map((product) => (
                    <tr key={product.feature_id} className={selected.has(product.feature_id) ? "row-selected" : ""}>
                      <td className="col-check">
                        <input
                          type="checkbox"
                          checked={selected.has(product.feature_id)}
                          onChange={(e) => handleSelectRow(product.feature_id, e.target.checked)}
                          aria-label={`Select ${product.feature_id}`}
                        />
                      </td>
                      <td className="col-part"><span className="part-no">{product.title}</span></td>
                      <td className="col-stock"><StockBadge types={product.types} /></td>
                      <td className="col-cat"><span className="type-pill" style={{ backgroundColor: product.status === "active" ? "#d4edda" : "#f8d7da", color: product.status === "active" ? "#155724" : "#721c24" }}>
                        {product.status === "active" ? "Active" : "Inactive"}
                      </span></td>
                      <td className="col-actions">
                        <button
                          title="Trash"
                          aria-label={`Trash ${product.feature_id}`}
                          className="action-btn danger"
                          onClick={() => handleDelete(product.feature_id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting…" : "🗑️"}
                        </button>
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