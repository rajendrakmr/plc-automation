"use client";

import { useState } from "react";
import Link from "next/link";
import "./AddFeature.css";
import { useFetch, PaginatedResponse } from "@/app/components/hooks/useFetch";
import { usePost } from "@/app/components/hooks/usePost";
import { truncate } from "@/app/utils/helper";

// ─── Types ────────────────────────────────────────────────────────────────────

type FeatureTypeKey = "product" | "category" | "blog";
type StatusType = "active" | "inactive"; 
type SortDir = "asc" | "desc";

interface FeatureTypeOption {
  key: FeatureTypeKey;
  label: string;
  icon: string;
}

interface PositionOption {
  label: string;
  value: string;
}


export interface Product {
  part_no: string;
  product_type: { name: string };
  category: { cat_name: string };
  short_desc: string;
  stock: "in-stock" | "limited" | "out-of-stock";
}

// interface FilterState {
//   search: string;
//   type: string;
//   category: string;
//   stock: string;
// }


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

interface FormErrors {
  product?: string;
  position?: string;
  [key: string]: string | undefined;
}

interface FilterState {
  search: string;
  type?: string; 
  status: string;
  isSearch: boolean;
  isClear?: boolean;
}

interface FeatureForm {
  feature_type: FeatureTypeKey;
  types: string;
  items_id: number[];
  status: StatusType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURE_TYPES: FeatureTypeOption[] = [
  { key: "product", label: "Product", icon: "📦" },
  { key: "category", label: "Category", icon: "🗂️" },
  { key: "blog", label: "Blog", icon: "📄" },
];

const POSITIONS: PositionOption[] = [ 
  { label: "Header Grid Menu", value: "header" }, 
  { label: "Home Page Latest", value: "latest" },
  // { label: "Footer Manufacturers", value: "footer" },
];

const LIMITS = [10, 25, 50, 100];
 

// ─── Page ─────────────────────────────────────────────────────────────────────

const EMPTY_FORM: FeatureForm = {
  feature_type: "blog",
  types: "",
  items_id: [],
  status: "active",
};

export default function AddFeature() { 
  const [featureType, setFeatureType] = useState<FeatureTypeKey>("blog");
 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ── Sort ──
  const [sortKey, setSortKey] = useState<keyof Blog | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // ── Filters ──
  const emptyFilter: FilterState = { search: "", status: "", isSearch: false };
  const [filters, setFilters] = useState<FilterState>(emptyFilter);
  const [pendingFilters, setPendingFilters] = useState<FilterState>(emptyFilter);

  // ── Selection & position ──
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [position, setPosition] = useState<string>("");
  const [status, setStatus] = useState<StatusType>("active");

  // ── Form errors ──
  const [errors, setErrors] = useState<FormErrors>({});

  // ── API fetch ──
  const { loading, error: fetchError, data, total, totalPages, refetch, isSearchLoading } =
    useFetch<PaginatedResponse<Blog>>({
      url: "/blogs",
      params: {
        page,
        limit,
        search: filters.search || undefined,
        status: filters.status || undefined,
        sort: sortKey ?? undefined,
        isClear: filters.isClear || undefined,
        isSearch: filters.isSearch || undefined,
        dir: sortDir,
      },
    });

  // ── Post ──
  const { loading: isSubmitting, post, reset: resetPost } = usePost<any, { id: string }>({
    url: "/feature_types",
    onSuccess: () => {
      setSelectedIds(new Set());
      setPosition("");
      setStatus("active");
      setErrors({});
    },
    onErrors: (errs) => setErrors(errs as FormErrors),
  });

  

  const toggleProduct = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (products.length > 0 && products.every((p) => selectedIds.has(p.blog_id))) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.blog_id)));
    }
  };

  const handleApplyFilters = () => {
    setSelectedIds(new Set());
    setFilters({ ...pendingFilters, isSearch: true });
    setPage(1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (selectedIds.size === 0) e.product = "Select at least one product.";
    if (!position) e.position = "Select a position.";
    return e;
  };

  const handleSave = async () => {
    resetPost();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});

    await post({
      feature_type: featureType,
      types: position,
      items_id: Array.from(selectedIds),
      status,
    });
  };

  // ── Derived ──
  const products = data?.records ?? [];
  const activeType = FEATURE_TYPES.find((t) => t.key === featureType);
  const allPageChecked = products.length > 0 && products.every((p) => selectedIds.has(p.blog_id));
  const someChecked = products.some((p) => selectedIds.has(p.blog_id)) && !allPageChecked;
  const isLoading = loading || isSearchLoading;

  // ── Pagination helpers ──
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

  return (
    <div className="af-page">

      {/* ── Top bar ── */}
      <div className="af-topbar">
        <div className="af-breadcrumb">
          <span className="af-bc-cur">Add Feature</span>
        </div>
        <div className="af-topbar-actions">
          <Link href="/admin/blogs/feature" className="af-btn-cancel-top">← Cancel</Link>
          <button className="af-btn-save" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "💾 Save Feature"}
          </button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {Object.keys(errors).length > 0 && (
        <div className="af-banner error">⚠ Please fix the errors below.</div>
      )}

      <div className="af-body">
        <div className="af-left">

          {/* Step 1 — Select product */}
          <div className="af-card">
            <p className="af-step-label">
              1. Select {activeType?.label} <span className="af-req">*</span>
            </p>

            {/* Search row */}
            <div className="af-search-row">
              <div className="af-search-box">
                <span className="af-search-icon">🔍</span>
                <input
                  className="af-search-input"
                  placeholder="Search by name, SKU..."
                  value={pendingFilters.search}
                  onChange={(e) => setPendingFilters((p) => ({ ...p, search: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                />
                {pendingFilters.search && (
                  <button
                    className="af-clear-search"
                    onClick={() => setPendingFilters((p) => ({ ...p, search: "" }))}
                  >
                    ✕
                  </button>
                )}
              </div>
              <button className="af-filter-toggle-btn" onClick={handleApplyFilters}>
                Apply
              </button>
            </div>

            {/* List meta */}
            <div className="af-list-meta">
              <span className="af-list-count">
                {isLoading ? "Loading…" : `${total} product${total !== 1 ? "s" : ""} found`}
              </span>
              <div className="af-list-meta-right">
                {selectedIds.size > 0 && (
                  <span className="af-selected-count">{selectedIds.size} selected</span>
                )}
                <label className="af-limit-label">
                  Rows:
                  <select className="af-limit-select" value={limit} onChange={handleLimitChange}>
                    {LIMITS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </label>
              </div>
            </div>

            {errors.product && <p className="af-field-error">⚠ {errors.product}</p>}

            {/* Table */}
            {fetchError ? (
              <div className="af-fetch-error">
                <p>⚠ Failed to load products: {fetchError}</p>
                <button className="af-btn-retry" onClick={refetch}>Retry</button>
              </div>
            ) : (
              <div className="af-table-wrap">
                <table className="af-prod-table">
                  <thead>
                    <tr>
                      <th className="af-th-check">
                        <span
                          className={`af-chk${allPageChecked ? " checked" : someChecked ? " indeterminate" : ""}`}
                          onClick={toggleAll}
                          role="checkbox"
                          aria-label="Select all"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === " " && toggleAll()}
                        >
                          {allPageChecked ? "✓" : someChecked ? "−" : ""}
                        </span>
                      </th>
                      <th className="af-th-sort">
                        Blog Title 
                      </th>
                      <th className="af-th-sort">
                        Blog Content
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="af-skeleton-row">
                          <td><div className="af-skeleton af-skeleton-sm" /></td>
                          <td><div className="af-skeleton af-skeleton-md" /></td>
                          <td><div className="af-skeleton af-skeleton-lg" /></td>
                        </tr>
                      ))
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="af-empty">No products match your filters.</td>
                      </tr>
                    ) : (
                      products.map((p) => {
                        const checked = selectedIds.has(p.blog_id);
                        return (
                          <tr
                            key={p.blog_id}
                            className={`af-prod-row${checked ? " selected" : ""}`}
                            onClick={() => toggleProduct(p.blog_id)}
                          >
                            <td>
                              <span className={`af-chk${checked ? " checked" : ""}`}>
                                {checked && "✓"}
                              </span>
                            </td>
                            <td>{truncate(p.blog_title)}</td>
                            <td>{truncate(p.blog_excerpt ?? "—")}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="af-pagination">
                <button
                  className="af-pg-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ‹
                </button>
                {pageNumbers.map((pg, i) =>
                  pg === "…" ? (
                    <span key={`ellipsis-${i}`} className="af-pg-ellipsis">…</span>
                  ) : (
                    <button
                      key={pg}
                      className={`af-pg-btn${page === pg ? " active" : ""}`}
                      onClick={() => setPage(pg as number)}
                    >
                      {pg}
                    </button>
                  )
                )}
                <button
                  className="af-pg-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  ›
                </button>
              </div>
            )}

            {!isLoading && total > 0 && (
              <p className="af-pg-info">
                Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
              </p>
            )}
          </div>

          {/* Step 2 — Show On (single select) */}
          <div className="af-card">
            <p className="af-step-label">
              2. Show On <span className="af-req">*</span>
            </p>
            <p className="af-step-hint">Select where you want to display this feature.</p>
            {errors.position && <p className="af-field-error">⚠ {errors.position}</p>}
            <div className="af-pos-grid">
              {POSITIONS.map((pos) => {
                const selected = position === pos.value;
                return (
                  <button
                    key={pos.value}
                    className={`af-pos-btn${selected ? " selected" : ""}`}
                    onClick={() => setPosition(pos.value)}
                  >
                    <span className="af-pos-chk">{selected && "✓"}</span>
                    {pos.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="af-card">
            <p className="af-step-label">
              Status <span className="af-req">*</span>
            </p>
            <div className="af-status-row">
              {(["active", "inactive"] as StatusType[]).map((s) => (
                <label key={s} className="af-radio-lbl" onClick={() => setStatus(s)}>
                  <span className={`af-rdot${status === s ? " active" : ""}`}>
                    {status === s && <span className="af-rdot-inner" />}
                  </span>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="af-actions">
            <button className="af-btn-save" onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "💾 Save Feature"}
            </button>
            <Link href="/admin/features" className="af-btn-cancel">
              ✕ Cancel
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}