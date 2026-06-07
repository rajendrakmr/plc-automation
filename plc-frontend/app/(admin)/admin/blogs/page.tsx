"use client";

import { useFetch, PaginatedResponse } from "@/app/components/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  part_no: string;
  product_type: { name: string };
  category: { cat_name: string };
  short_desc: string;
  stock: "in-stock" | "limited" | "out-of-stock";
}

interface FilterState {
  search: string;
  type: string;
  category: string;
  stock: string;
}

type SortDir = "asc" | "desc";
type ActiveTab = "all" | "published" | "trash";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StockBadge({ stock }: { stock: Product["stock"] }) {
  const map = {
    "in-stock":     { label: "In Stock",     cls: "badge-in"  },
    limited:        { label: "Limited",       cls: "badge-low" },
    "out-of-stock": { label: "Out of Stock",  cls: "badge-out" },
  } as const;
  const { label, cls } = map[stock] ?? map["out-of-stock"];
  return <span className={`badge-stock ${cls}`}>{label}</span>;
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="sort-icon">↕</span>;
  return <span className="sort-icon active">{dir === "asc" ? "↑" : "↓"}</span>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [page, setPage]               = useState(1);
  const [limit, setLimit]             = useState(10);
  const [activeTab, setActiveTab]     = useState<ActiveTab>("all");
  const [sortKey, setSortKey]         = useState<keyof Product | null>(null);
  const [sortDir, setSortDir]         = useState<SortDir>("asc");
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing]   = useState(false);

  const [filters, setFilters]         = useState<FilterState>({ search: "", type: "", category: "", stock: "" });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", type: "", category: "", stock: "" });

  // ── Real API fetch ──────────────────────────────────────────────────────────
  const { loading, error, data, total, totalPages, refetch } =
    useFetch<PaginatedResponse<Product>>({
      url: "/products",
      params: {
        page,
        limit,
        search:   filters.search   || undefined,
        type:     filters.type     || undefined,
        category: filters.category || undefined,
        stock:    filters.stock    || undefined,
        sort:     sortKey          ?? undefined,
        dir:      sortDir,
        tab:      activeTab,
      },
    });

  // records from API response
  const products = data?.records ?? [];

  // ── Derived ─────────────────────────────────────────────────────────────────
  const activeFilterCount = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters]
  );

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, page - 2);
    const end   = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  const allSelected =
    products.length > 0 && products.every((p) => selected.has(p.part_no));

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSort = (key: keyof Product) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleApplyFilters = () => { setFilters({ ...pendingFilters }); setPage(1); };

  const handleClearFilters = () => {
    const empty: FilterState = { search: "", type: "", category: "", stock: "" };
    setPendingFilters(empty);
    setFilters(empty);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 700);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? new Set(products.map((p) => p.part_no)) : new Set());
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setPage(1);
    setSelected(new Set());
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
const router = useRouter();
    const handleRowEditAction = (row: any) => {
    // console.log("Row action:", action, partNo);
    // refetch();
      sessionStorage.setItem("product-edit", JSON.stringify(row));

  router.push("/admin/products/edit?mode=edit");
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .products-page { background: #637b7b; padding: 1.5rem; max-width: 1100px; margin: 0 auto; font-family: 'DM Sans', sans-serif; }
        .rk_topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; gap: 12px; flex-wrap: wrap; }
        .rk_topbar-left { display: flex; align-items: center; gap: 10px; }
        .page-title { font-size: 18px; font-weight: 600; color: #fff; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        .badge-success { background: #dcfce7; color: #14532d; }
        .badge-danger { background: #fee2e2; color: #7f1d1d; }
        .rk_topbar-right { display: flex; align-items: center; gap: 8px; }
        .btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid #e2e8f0; background: #fff; color: #1e293b; transition: background 0.15s, border-color 0.15s; font-family: inherit; }
        .btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .btn-icon { width: 34px; height: 34px; padding: 0; justify-content: center; }
        .btn-primary { background: #0d9488; color: #f8fafc; border-color: #1e293b; }
        .btn-primary:hover { background: #0f172a; }
        .btn-danger { color: #dc2626; border-color: #fca5a5; }
        .btn-danger:hover { background: #fee2e2; }
        .spin { animation: spin 0.6s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .filter-bar { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 1rem; display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
        .filter-group { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 130px; }
        .filter-group label { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
        .filter-group input, .filter-group select { height: 36px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0 10px; font-size: 13px; background: #f8fafc; color: #1e293b; outline: none; width: 100%; font-family: inherit; transition: border-color 0.15s; }
        .filter-group input:focus, .filter-group select:focus { border-color: #3b82f6; background: #fff; }
        .filter-group.search-wrap { position: relative; flex: 2; min-width: 180px; }
        .filter-group.search-wrap input { padding-left: 34px; }
        .search-icon { position: absolute; left: 10px; top: 8px; color: #94a3b8; font-size: 15px; pointer-events: none; }
        .filter-actions { display: flex; gap: 8px; align-self: flex-end; }
        .tabs { display: flex; gap: 4px; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
        .tab { padding: 8px 16px; border-radius: 8px 8px 0 0; font-size: 13px; cursor: pointer; border: 1px solid transparent; border-bottom: none; color: #64748b; background: transparent; transition: all 0.15s; font-family: inherit; font-weight: 500; position: relative; bottom: -1px; }
        .tab.active { background: #fff; border-color: #e2e8f0; border-bottom-color: #fff; color: #1e293b; }
        .tab:hover:not(.active) { background: #f1f5f9; color: #1e293b; }
        .tab-badge { margin-left: 6px; }
        .table-wrap { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .bulk-bar { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #eff6ff; border-bottom: 1px solid #bfdbfe; font-size: 13px; }
        .bulk-bar-text { color: #1e40af; font-weight: 500; }
        table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        thead tr { border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
        thead th { padding: 10px 14px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; text-align: left; cursor: pointer; user-select: none; white-space: nowrap; }
        thead th:hover { color: #1e293b; }
        thead th.no-sort { cursor: default; }
        .sort-icon { opacity: 0.35; font-size: 11px; margin-left: 3px; }
        .sort-icon.active { opacity: 1; color: #3b82f6; }
        tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.1s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #f8fafc; }
        tbody tr.row-selected { background: #eff6ff; }
        td { padding: 11px 14px; font-size: 13px; color: #1e293b; vertical-align: middle; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .col-check { width: 40px; }
        .col-part { width: 160px; }
        .col-type { width: 120px; }
        .col-cat { width: 130px; }
        .col-stock { width: 115px; }
        .col-actions { width: 120px; text-align: right; }
        input[type="checkbox"] { width: 15px; height: 15px; cursor: pointer; accent-color: #3b82f6; }
        .part-no { font-weight: 600; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #3b82f6; }
        .type-pill { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
        .badge-stock { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-stock::before { content: ''; width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .badge-in  { background: #dcfce7; color: #14532d; } .badge-in::before  { background: #16a34a; }
        .badge-low { background: #fef9c3; color: #713f12; } .badge-low::before { background: #ca8a04; }
        .badge-out { background: #fee2e2; color: #7f1d1d; } .badge-out::before { background: #dc2626; }
        .action-btn { background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 6px; color: #94a3b8; font-size: 14px; transition: background 0.12s, color 0.12s; }
        .action-btn:hover { background: #f1f5f9; color: #1e293b; }
        .action-btn.danger:hover { background: #fee2e2; color: #dc2626; }
        .table-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #e2e8f0; flex-wrap: wrap; gap: 10px; background: #f8fafc; }
        .page-info { font-size: 12px; color: #64748b; }
        .page-info strong { color: #1e293b; }
        .pagination { display: flex; align-items: center; gap: 4px; }
        .pg-btn { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 12px; font-weight: 500; color: #1e293b; transition: background 0.12s; font-family: inherit; }
        .pg-btn:hover:not(:disabled):not(.pg-active) { background: #f1f5f9; }
        .pg-btn.pg-active { background: #1e293b; color: #fff; border-color: #1e293b; }
        .pg-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .limit-select { height: 30px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0 8px; font-size: 12px; background: #fff; color: #1e293b; font-family: inherit; }
        .empty-state { text-align: center; padding: 48px 20px; color: #94a3b8; font-size: 13px; }
        .empty-icon { font-size: 32px; margin-bottom: 8px; }
        .loading-overlay { opacity: 0.5; pointer-events: none; }
        .error-msg { padding: 12px 16px; background: #fee2e2; color: #7f1d1d; font-size: 13px; border-bottom: 1px solid #fca5a5; }
      `}</style>

      <div className="products-page">
        {/* ── Top Bar ── */}
        <div className="rk_topbar">
          <div className="rk_topbar-left">
            <span className="page-title">Products</span>
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
            <Link href={'/admin/products/add'} className="btn btn-primary" onClick={() => console.log("Navigate to /admin/products/add")}>
              + Add Product
            </Link>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        {filterVisible && (
          <div className="filter-bar">
            <div className="filter-group search-wrap">
              <label>Search</label>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Part no, description..."
                value={pendingFilters.search}
                onChange={(e) => setPendingFilters((f) => ({ ...f, search: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
              />
            </div>
            <div className="filter-group">
              <label>Product Type</label>
              <select value={pendingFilters.type} onChange={(e) => setPendingFilters((f) => ({ ...f, type: e.target.value }))}>
                <option value="">All Types</option>
                <option>Electronic</option>
                <option>Mechanical</option>
                <option>Hydraulic</option>
                <option>Pneumatic</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select value={pendingFilters.category} onChange={(e) => setPendingFilters((f) => ({ ...f, category: e.target.value }))}>
                <option value="">All Categories</option>
                <option>Sensors</option>
                <option>Actuators</option>
                <option>Connectors</option>
                <option>Valves</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Stock Status</label>
              <select value={pendingFilters.stock} onChange={(e) => setPendingFilters((f) => ({ ...f, stock: e.target.value }))}>
                <option value="">All</option>
                <option value="in-stock">In Stock</option>
                <option value="limited">Limited</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn" onClick={handleClearFilters}>Clear</button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>Apply</button>
            </div>
          </div>
        )}

        {/* ── Tabs ── */}
        {/* <div className="tabs">
          {(["all", "published", "trash"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === "all" ? "All Products" : tab === "published" ? "Published" : "Trash"}
              <span className={`badge tab-badge ${tab === "all" ? "badge-info" : tab === "published" ? "badge-success" : "badge-danger"}`}>
                {tab === "all" ? total : tab === "published" ? 98 : 7}
              </span>
            </button>
          ))}
        </div> */}

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
                  <th className="col-part" onClick={() => handleSort("part_no")}>
                    Part No <SortIcon active={sortKey === "part_no"} dir={sortDir} />
                  </th>
                  <th className="col-type" onClick={() => handleSort("product_type")}>
                    Type <SortIcon active={sortKey === "product_type"} dir={sortDir} />
                  </th>
                  <th className="col-cat" onClick={() => handleSort("category")}>
                    Category <SortIcon active={sortKey === "category"} dir={sortDir} />
                  </th>
                  <th onClick={() => handleSort("short_desc")}>
                    Description <SortIcon active={sortKey === "short_desc"} dir={sortDir} />
                  </th>
                  <th className="col-stock" onClick={() => handleSort("stock")}>
                    Stock <SortIcon active={sortKey === "stock"} dir={sortDir} />
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
                    <tr key={product.part_no} className={selected.has(product.part_no) ? "row-selected" : ""}>
                      <td className="col-check">
                        <input
                          type="checkbox"
                          checked={selected.has(product.part_no)}
                          onChange={(e) => handleSelectRow(product.part_no, e.target.checked)}
                          aria-label={`Select ${product.part_no}`}
                        />
                      </td>
                      <td className="col-part"><span className="part-no">{product.part_no}</span></td>
                      <td className="col-type"><span className="type-pill">{product.product_type.name}</span></td>
                      <td className="col-cat">{product.category.cat_name}</td>
                      <td title={product.short_desc}>{product.short_desc}</td>
                      <td className="col-stock"><StockBadge stock={product.stock} /></td>
                      <td className="col-actions">
                        <button className="action-btn" title="Edit" aria-label={`Edit ${product.part_no}`} onClick={() => handleRowEditAction(product)}>✏️</button>
                        <button className="action-btn danger" title="Trash" aria-label={`Trash ${product.part_no}`} onClick={() => handleRowAction("trash", product.part_no)}>🗑️</button>
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
                <button key={n} className={`pg-btn ${n === page ? "pg-active" : ""}`} onClick={() => setPage(n)} aria-current={n === page ? "page" : undefined}>{n}</button>
              ))}
              <button className="pg-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page">›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}