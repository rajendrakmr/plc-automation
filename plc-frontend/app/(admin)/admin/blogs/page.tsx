"use client";

import { useFetch, PaginatedResponse } from "@/app/components/hooks/useFetch";
import { truncate } from "@/app/utils/helper";
import Image from "next/image";
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


export interface BlogCategory {
  blog_cat_id: number;
  blog_cat_name: string;
}

export interface Blog {
  blog_id: number;
  blog_title: string;
  blog_meta_title: string;
  blog_slug: string;
  blog_meta_desc: string;
  blog_excerpt: string;
  blog_meta_keywords: string;
  blog_content: string;
  blog_published_at: string | null;
  blog_img_url: string;
  blog_author: string;
  category: BlogCategory;
}

type SortDir = "asc" | "desc";
type ActiveTab = "all" | "published" | "trash";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StockBadge({ stock }: { stock: Product["stock"] }) {
  const map = {
    "in-stock": { label: "In Stock", cls: "badge-in" },
    limited: { label: "Limited", cls: "badge-low" },
    "out-of-stock": { label: "Out of Stock", cls: "badge-out" },
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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [sortKey, setSortKey] = useState<keyof Blog | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<FilterState>({ search: "", type: "", category: "", stock: "" });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", type: "", category: "", stock: "" });

  // ── Real API fetch ──────────────────────────────────────────────────────────
  const { loading, error, data, total, totalPages, refetch } =
    useFetch<PaginatedResponse<Blog>>({
      url: "/blogs",
      params: {
        page,
        limit,
        search: filters.search || undefined,
        type: filters.type || undefined,
        category: filters.category || undefined,
        stock: filters.stock || undefined,
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

  const allSelected =
    products.length > 0 && products.every((p) => selected.has(p.blog_slug));

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSort = (key: keyof Blog) => {
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
    setSelected(checked ? new Set(products.map((p) => p.blog_slug)) : new Set());
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
    sessionStorage.setItem("blog-edit", JSON.stringify(row));

    router.push("/admin/blogs/edit?mode=edit");
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="products-page">
        <div className="rk_topbar">
          <div className="rk_topbar-left">
            <span className="page-title">Blogs</span>
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
            <Link href={'/admin/blogs/add'} className="btn btn-primary" onClick={() => console.log("Navigate to /admin/products/add")}>
              + Add Blog
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
                  placeholder="Search by blog title, description..."
                  value={pendingFilters.search}
                  onChange={(e) => setPendingFilters((f) => ({ ...f, search: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                />
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
            </div>
            <div className=" filter-actions" style={{ paddingBottom: "3px" }}>
              <button className="btn" onClick={handleClearFilters}>Clear</button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>Apply</button>
            </div>
          </>
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
                  {/* <th className="col-check no-sort">
                    <input type="checkbox" checked={allSelected} onChange={(e) => handleSelectAll(e.target.checked)} aria-label="Select all" />
                  </th> */}
                  <th>Feature Image</th>
                  <th className="col-part" onClick={() => handleSort("blog_title")}>
                    Title <SortIcon active={sortKey === "blog_title"} dir={sortDir} />
                  </th> 
                  <th className="col-cat" onClick={() => handleSort("category")}>
                    Category <SortIcon active={sortKey === "category"} dir={sortDir} />
                  </th> 
                  <th className="col-actions no-sort">Action </th>
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
                    <tr key={item.blog_id} className={selected.has(item.blog_slug) ? "row-selected" : ""}>
                      {/* <td className="col-check">
                        <input
                          type="checkbox"
                          checked={selected.has(item.blog_slug)}
                          onChange={(e) => handleSelectRow(item.blog_slug, e.target.checked)}
                          aria-label={`Select ${item.blog_id}`}
                        />
                      </td> */}
                       <td>
                            {
                              item.blog_img_url &&
                              <Image
                                width={100}
                                height={60}
                                src={`${process.env.NEXT_PUBLIC_APP_URL}${item.blog_img_url}`}
                                alt={item.blog_title}
                                unoptimized
                              />
                            }
                          </td>
                      <td className="col-part"><span className="part-no">{truncate(item.blog_title)}</span></td> 
                      <td className="col-cat"><span className="type-pill">{item.category.blog_cat_name}</span></td> 
                      <td className="col-actions">
                        <button className="action-btn" title="Edit" aria-label={`Edit ${item.blog_id}`} onClick={() => handleRowEditAction(item)}>✏️</button>
                        {/* <button className="action-btn danger" title="Trash" aria-label={`Trash ${item.blog_id}`} onClick={() => handleRowAction("trash", item.blog_slug)}>🗑️</button> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          
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
                <button key={n} className={`pg-btn ${n === page ? "pg-active" : ""}`}onClick={() => setPage(n as number)} aria-current={n === page ? "page" : undefined}>{n}</button>
              ))}
              <button className="pg-btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page">›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}