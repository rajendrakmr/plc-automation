"use client";

import { useFetch, PaginatedResponse } from "@/app/components/hooks/useFetch";
import { useGet } from "@/app/components/hooks/useGet";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";


interface Category {
  category_id: number;
  cat_name: string;
  cat_slug: string;
}

interface ProductType {
  product_type_id: number;
  name: string;
  description: string;
}
export interface Product {
  part_no: string;
  product_type: { name: string };
  category: { cat_name: string };
  short_desc: string;
  stock: "in-stock" | "limited" | "out-stock";
}


interface FilterState {
  search: string;
  type: string;
  category: string;
  stock: string;
  isSearch?: boolean;
  isClear?: boolean;
}

type SortDir = "asc" | "desc";
type ActiveTab = "all" | "published" | "trash";

function StockBadge({ stock }: { stock: Product["stock"] }) {
  const map = {
    "in-stock": { label: "In Stock", cls: "badge-in" },
    limited: { label: "Limited", cls: "badge-low" },
    "out-stock": { label: "Out of Stock", cls: "badge-out" },
  } as const;
  const { label, cls } = map[stock] ?? map["out-stock"];
  return <span className={`badge-stock ${cls}`}>{label}</span>;
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="sort-icon">↕</span>;
  return <span className="sort-icon active">{dir === "asc" ? "↑" : "↓"}</span>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [sortKey, setSortKey] = useState<keyof Product | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<FilterState>({ search: "", type: "", category: "", stock: "", isSearch: false });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", type: "", category: "", stock: "", isSearch: false });

  // ── Real API fetch ──────────────────────────────────────────────────────────
  const { loading, error, data, total, totalPages, refetch, reset, isResetLoading, isSearchLoading } =
    useFetch<PaginatedResponse<Product>>({
      url: "/products",
      params: {
        page,
        limit,
        search: filters.search || undefined,
        product_type_id: filters.type || undefined,
        category_id: filters.category || undefined,
        stock: filters.stock || undefined,
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

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
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

  const handleApplyFilters = () => { setSelected(new Set()); setFilters({ ...pendingFilters, isSearch: true }); setPage(1); };

  const handleClearFilters = () => {
    setSelected(new Set());
    const empty: FilterState = { search: "", type: "", category: "", stock: "", isSearch: false, isClear: true };
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
    sessionStorage.setItem("product-edit", JSON.stringify(row));
    router.push("/admin/products/edit?mode=edit");
  };

  const { data: CATEGORIES, loading: catLoading } = useGet<Category[]>({
    url: "/categories/list",
  });
  const { data: PRODUCT_TYPES, loading: prdTypLoading } = useGet<ProductType[]>({
    url: "/ptypes/list",
  });

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="products-page">
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
                {PRODUCT_TYPES?.map((item: ProductType) => (
                  <option
                    key={item.product_type_id}
                    value={item.product_type_id}
                  >
                    {item.name.trim()}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select value={pendingFilters.category} onChange={(e) => setPendingFilters((f) => ({ ...f, category: e.target.value }))}>
                <option value="">All Categories</option>

                {CATEGORIES?.map((item: Category) => (
                  <option
                    key={item.category_id}
                    value={item.category_id}
                  >
                    {item.cat_name.trim()}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Stock Status</label>
              <select value={pendingFilters.stock} onChange={(e) => setPendingFilters((f) => ({ ...f, stock: e.target.value }))}>
                <option value="">All</option>
                <option value="in-stock">In Stock</option>
                <option value="limited">Limited</option>
                <option value="out-stock">Out of Stock</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn" disabled={isResetLoading || isSearchLoading} onClick={handleClearFilters}>Clear</button>
              <button className="btn btn-primary" disabled={isResetLoading || isSearchLoading} onClick={handleApplyFilters}>{isSearchLoading && <ButtonLoader />}  {isSearchLoading ? "Searching..." : "Apply"}</button>
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