"use client";

import { useFetch } from "@/app/components/hooks/useFetch";
import { PaginatedResponse } from "@/app/types";
import { useState, useMemo } from "react";
 
export interface EnquiryCategory {
  category_id: number;
  cat_name: string;
}

export interface EnquiryProduct {
  product_id: number;
  part_no: string;
}

export interface Enquiry {
  contact_id: number;
  product_id?: number | null;
  category_id?: number | null;
  part_number?: string | null;
  manufacturer?: string | null;
  quantity?: number;
  subject?: string | null;
  enquiry_date?: string | null;
  telephone?: string | null;
  email_address?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  company_name?: string | null;
  customer_name: string;
  content?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  category?: EnquiryCategory | null;
  product?: EnquiryProduct | null;
} 
interface FilterState {
  search: string;
  status: string;
  isSearch?: boolean;
  isClear?: boolean;
}

type SortDir = "asc" | "desc";
 
 

function AvatarCircle({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const colors = [
    { bg: "#E6F1FB", text: "#185FA5" },
    { bg: "#E1F5EE", text: "#0F6E56" },
    { bg: "#EEEDFE", text: "#534AB7" },
    { bg: "#FAECE7", text: "#993C1D" },
    { bg: "#FAEEDA", text: "#854F0B" },
    { bg: "#FBEAF0", text: "#993556" },
    { bg: "#EAF3DE", text: "#3B6D11" },
    { bg: "#F1EFE8", text: "#5F5E5A" },
  ];
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  const { bg, text } = colors[idx];

  return (
    <div
      className="avatar-circle"
      style={{ background: bg, color: text }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="sort-icon">↕</span>;
  return <span className="sort-icon active">{dir === "asc" ? "↑" : "↓"}</span>;
}

// ─── Reply Modal ──────────────────────────────────────────────────────────────

interface ReplyModalProps {
  enquiry: Enquiry | null;
  onClose: () => void; 
  onSend: (contactId: number, message: string) => void;
}

function ReplyModal({ enquiry, onClose, onSend }: ReplyModalProps) {
  const [text, setText] = useState(""); 
  if (!enquiry) return null; 
  const handleSend = () => {
    if (!text.trim()) return;
    onSend(enquiry.contact_id, text.trim());
    setText("");
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Reply to enquiry"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">↩ Reply</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>
        <div className="modal-meta">
          <span className="modal-label">To:</span> 
          <span>{enquiry.customer_name} &lt;{enquiry.email_address ?? "N/A"}&gt;</span>
        </div>
        <div className="modal-meta">
          <span className="modal-label">Re:</span> 
          <span>{enquiry.subject ?? enquiry.part_number ?? "—"}</span>
        </div>
        <textarea
          className="reply-textarea"
          placeholder="Type your reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSend}>
            ↗ Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}

 
interface DetailModalProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onReply: (enquiry: Enquiry) => void;
}

function DetailModal({ enquiry, onClose, onReply }: DetailModalProps) {
  if (!enquiry) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry details"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card detail-modal-card">
        <div className="modal-header">
          <span className="modal-title">✉ Enquiry Details</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="detail-sender-row">
          <AvatarCircle name={enquiry.customer_name} />
          <div className="detail-sender-info">
            <span className="detail-name">{enquiry.customer_name}</span>
            <span className="detail-email">{enquiry.email_address ?? "—"}</span>
          </div> 
          {enquiry.category && (
            <span className="source-pill">{enquiry.category.cat_name}</span>
          )}
        </div>

        <div className="detail-meta-grid"> 
          <span className="detail-key">Subject</span>
          <span className="detail-val">{enquiry.subject ?? enquiry.part_number ?? "—"}</span>

          <span className="detail-key">Part No.</span>
          <span className="detail-val">{enquiry.part_number ?? "—"}</span>

          <span className="detail-key">Manufacturer</span>
          <span className="detail-val">{enquiry.manufacturer ?? "—"}</span>

          <span className="detail-key">Quantity</span>
          <span className="detail-val">{enquiry.quantity ?? "—"}</span>

          {enquiry.company_name && (
            <>
              <span className="detail-key">Company</span>
              <span className="detail-val">{enquiry.company_name}</span>
            </>
          )}

          {enquiry.telephone && (
            <>
              <span className="detail-key">Phone</span>
              <span className="detail-val">{enquiry.telephone}</span>
            </>
          )} 
          {enquiry.enquiry_date && (
            <>
              <span className="detail-key">Date</span>
              <span className="detail-val">
                {new Date(enquiry.enquiry_date).toLocaleDateString("en-IN", {
                  dateStyle: "medium",
                })}
              </span>
            </>
          )}
        </div>

        <div className="detail-message">{enquiry.content ?? "No message content."}</div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Close</button>
          <button
            className="btn btn-primary"
            onClick={() => { onClose(); onReply(enquiry); }}
          >
            ↩ Reply
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default function EnquiriesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortKey, setSortKey] = useState<keyof Enquiry | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc"); 
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 
  const [filters, setFilters] = useState<FilterState>({ search: "", status: "", isSearch: false });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", status: "", isSearch: false });

  const [replyTarget, setReplyTarget] = useState<Enquiry | null>(null);
  const [detailTarget, setDetailTarget] = useState<Enquiry | null>(null);

  const { loading, error, data, total, totalPages, refetch } =
    useFetch<PaginatedResponse<Enquiry>>({
      url: "/enquiries",
      params: {
        page,
        limit,
        search: filters.search || undefined,
        status: filters.status || undefined,
        sort: sortKey ?? undefined,
        isClear: filters.isClear || undefined,
        isSearch: filters.isSearch || undefined,
      },
    });
 
  const enquiries: Enquiry[] = data?.records ?? [];
  
  const activeFilterCount = useMemo(
    () => [filters.search, filters.status].filter(Boolean).length,
    [filters]
  );

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  // FIX: allSelected checks contact_id (number) in the Set
  const allSelected =
    enquiries.length > 0 && enquiries.every((e) => selected.has(e.contact_id));

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSort = (key: keyof Enquiry) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleApplyFilters = () => {
    setFilters({ ...pendingFilters, isSearch: true });
    setPage(1);
  };

  const handleClearFilters = () => {
    const empty: FilterState = { search: "", status: "", isSearch: false, isClear: true };
    setPendingFilters(empty);
    setFilters(empty);
    setPage(1);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => setRefreshing(false), 700);
  };

  // FIX: handleSelectAll uses contact_id (number)
  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? new Set(enquiries.map((e) => e.contact_id)) : new Set());
  };

  // FIX: handleSelectRow uses number
  const handleSelectRow = (id: number, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleBulkAction = (action: string) => {
    // Implement API calls for bulk actions here as needed
    console.log("Bulk action:", action, [...selected]);
    setSelected(new Set());
  };

  // FIX: handleRowAction uses number id
  const handleRowAction = (action: string, id: number) => {
    console.log("Row action:", action, id);
    // Implement delete API call here
  };

  // FIX: onSend receives number contactId
  const handleSendReply = (contactId: number, _message: string) => {
    console.log("Send reply to contact:", contactId, _message);
    // Implement send reply API call here
  };

  // FIX: guard against null/undefined enquiry_date
  const formatTime = (iso: string | null | undefined) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0)
      return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return d.toLocaleDateString("en-IN", { weekday: "short" });
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .enq-page {   padding: 1.5rem; max-width: 1100px; margin: 0 auto; font-family: 'DM Sans', sans-serif; }
        
       
        .table-wrap {   border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .bulk-bar { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #eff6ff; border-bottom: 1px solid #bfdbfe; font-size: 13px; }
        .bulk-bar-text { color: #1e40af; font-weight: 500; }
        .enq-row { display: flex; align-items: stretch; border-bottom: 1px solid #f1f5f9; transition: background 0.1s; cursor: default; }
        .enq-row:last-child { border-bottom: none; }
        .enq-row:hover { background: #f8fafc; }
        .enq-row.row-selected { background: #eff6ff; }
        .col-check { width: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0 4px 0 12px; }
        .col-dot { width: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .col-avatar { width: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .col-body { flex: 1; padding: 10px 12px 10px 6px; min-width: 0; cursor: pointer; }
        .col-time { width: 80px; display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0; padding-right: 12px; font-size: 12px; color: #64748b; white-space: nowrap; }
        .col-actions { width: 90px; display: flex; align-items: center; justify-content: flex-end; gap: 2px; padding-right: 12px; flex-shrink: 0; opacity: 0; transition: opacity 0.12s; }
        .enq-row:hover .col-actions { opacity: 1; }
        .body-top { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
        .sender-name { font-size: 13px; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
        .enq-subject { font-size: 13px; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .enq-preview { font-size: 12px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .body-bot { display: flex; align-items: center; gap: 6px; margin-top: 3px; }
        .avatar-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; }
        .status-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .status-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .badge-new     { background: #fee2e2; color: #7f1d1d; } .badge-new::before     { background: #dc2626; }
        .badge-replied { background: #dcfce7; color: #14532d; } .badge-replied::before { background: #16a34a; }
        .badge-pending { background: #fef9c3; color: #713f12; } .badge-pending::before { background: #ca8a04; }
        .badge-closed  { background: #f1f5f9; color: #64748b; } .badge-closed::before  { background: #94a3b8; }
        .source-pill { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; color: #64748b; background: #f1f5f9; border: 1px solid #e2e8f0; }
        .action-btn { background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 6px; color: #94a3b8; font-size: 14px; transition: background 0.12s, color 0.12s; }
        .action-btn:hover { background: #f1f5f9; color: #1e293b; }
        .action-btn.danger:hover { background: #fee2e2; color: #dc2626; }
        .sort-icon { opacity: 0.35; font-size: 11px; margin-left: 3px; }
        .sort-icon.active { opacity: 1; color: #3b82f6; }
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
        input[type="checkbox"] { width: 15px; height: 15px; cursor: pointer; accent-color: #3b82f6; }
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 50; }
        .modal-card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; width: 440px; max-width: 95vw; box-shadow: 0 8px 32px rgba(0,0,0,0.12); display: flex; flex-direction: column; gap: 10px; }
        .detail-modal-card { width: 500px; max-height: 85vh; overflow-y: auto; }
        .modal-header { display: flex; align-items: center; justify-content: space-between; }
        .modal-title { font-size: 15px; font-weight: 600; color: #1e293b; }
        .modal-meta { display: flex; gap: 8px; font-size: 13px; color: #1e293b; }
        .modal-label { color: #64748b; min-width: 30px; }
        .reply-textarea { width: 100%; height: 110px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-family: inherit; background: #f8fafc; color: #1e293b; resize: none; outline: none; transition: border-color 0.15s; }
        .reply-textarea:focus { border-color: #3b82f6; background: #fff; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 8px; }
        .detail-sender-row { display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; margin-bottom: 4px; }
        .detail-sender-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .detail-name { font-size: 14px; font-weight: 600; color: #1e293b; }
        .detail-email { font-size: 12px; color: #64748b; }
        .detail-meta-grid { display: grid; grid-template-columns: 90px 1fr; gap: 6px 12px; font-size: 13px; margin: 10px 0; }
        .detail-key { color: #64748b; }
        .detail-val { color: #1e293b; }
        .detail-message { font-size: 13px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; }
      `}</style>

      <ReplyModal
        enquiry={replyTarget}
        onClose={() => setReplyTarget(null)}
        onSend={handleSendReply}
      />
      <DetailModal
        enquiry={detailTarget}
        onClose={() => setDetailTarget(null)}
        onReply={(enq) => setReplyTarget(enq)}
      />

      <div className="enq-page">
        <div className="rk_topbar">
          <div className="rk_topbar-left">
            <span className="page-title">Enquiries</span>
            <span className="badge badge-info">{total}</span>
          </div>
          <div className="rk_topbar-right">
            <button
              className="btn btn-icon"
              title="Refresh"
              aria-label="Refresh data"
              onClick={handleRefresh}
            >
              <span className={refreshing ? "spin" : ""}>↺</span>
            </button>
            <button className="btn" onClick={() => setFilterVisible((v) => !v)}>
              ⚙ Filters
              {activeFilterCount > 0 && (
                <span className="badge badge-info" style={{ marginLeft: 2 }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {filterVisible && (
          <>
            <div className="filter-bar">
              <div className="filter-group search-wrap">
                <label>Search</label>
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Name, email, part number..."
                  value={pendingFilters.search}
                  onChange={(e) =>
                    setPendingFilters((f) => ({ ...f, search: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                />
              </div>

              {/* FIX: status filter now correctly updates `status` key */}
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={pendingFilters.status}
                  onChange={(e) =>
                    setPendingFilters((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="">All Status</option>
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="filter-actions" style={{ marginBottom: "8px" }}>
              <button className="btn" onClick={handleClearFilters}>Clear</button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>Apply</button>
            </div>
          </>
        )}

        <div className="table-wrap">
          {selected.size > 0 && (
            <div className="bulk-bar">
              <span className="bulk-bar-text">{selected.size} selected</span>
              <button className="btn" style={{ marginLeft: "auto" }} onClick={() => handleBulkAction("replied")}>
                ✓ Mark Replied
              </button>
              <button className="btn" onClick={() => handleBulkAction("closed")}>📁 Close</button>
              <button className="btn btn-danger" onClick={() => handleBulkAction("delete")}>🗑 Delete</button>
            </div>
          )}

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className={loading ? "loading-overlay" : ""}> 
            <div style={{ display: "flex", alignItems: "center", padding: "8px 12px 8px 0", borderBottom: "1px solid #e2e8f0", color:"#fff" ,background: "#220429" }}>
              <div className="col-check">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all"
                />
              </div>
              <div className="col-dot" />
              <div className="col-avatar" />
              <div
                style={{ flex: 1, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#fff", cursor: "pointer", userSelect: "none" }}
                onClick={() => handleSort("customer_name")}
              >
                Enquiry <SortIcon active={sortKey === "customer_name"} dir={sortDir} />
              </div>
              <div
                style={{ width: 80, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#fff", cursor: "pointer", userSelect: "none", textAlign: "right", paddingRight: 12 }}
                onClick={() => handleSort("enquiry_date")}
              > 
                Date <SortIcon active={sortKey === "enquiry_date"} dir={sortDir} />
              </div>
              <div style={{ width: 90 }} />
            </div> 
            {enquiries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📬</div>
                {loading ? "Loading..." : "No enquiries found"}
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.contact_id} 
                  className={`enq-row ${selected.has(enq.contact_id) ? "row-selected" : ""}`}
                >
                  <div className="col-check">
                    <input
                      type="checkbox"
                      checked={selected.has(enq.contact_id)}
                      onChange={(e) => handleSelectRow(enq.contact_id, e.target.checked)}
                      aria-label={`Select enquiry from ${enq.customer_name}`}
                    />
                  </div>
                  <div className="col-dot" />
                  <div className="col-avatar">
                    <AvatarCircle name={enq.customer_name} />
                  </div>
                  <div
                    className="col-body"
                    onClick={() => setDetailTarget(enq)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setDetailTarget(enq)}
                    aria-label={`Open enquiry from ${enq.customer_name}`}
                  >
                    <div className="body-top">
                      <span className="sender-name">{enq.customer_name}</span> 
                      <span className="enq-subject">
                        {enq.subject ?? enq.part_number ?? "—"}
                      </span>
                    </div>
                    <div className="body-bot"> 
                      <span className="enq-preview">
                        {enq.content ? `— ${enq.content.split("\n")[0]}` : ""}
                      </span> 
                      {enq.manufacturer && (
                        <span className="source-pill">{enq.manufacturer}</span>
                      )}
                      {enq.category && (
                        <span className="source-pill">{enq.category.cat_name}</span>
                      )}
                    </div>
                  </div> 
                  <div className="col-time">{formatTime(enq.enquiry_date)}</div>
                  <div className="col-actions">
                    <button
                      className="action-btn"
                      title="Reply"
                      aria-label={`Reply to ${enq.customer_name}`}
                      onClick={() => setReplyTarget(enq)}
                    >
                      ↩️
                    </button>
                    <button
                      className="action-btn danger"
                      title="Delete"
                      aria-label={`Delete enquiry from ${enq.customer_name}`}
                      onClick={() => handleRowAction("delete", enq.contact_id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="table-footer">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="page-info">Rows:</span>
              <select
                className="limit-select"
                value={limit}
                onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <span className="page-info">
              Showing{" "}
              <strong>
                {total ? (page - 1) * limit + 1 : 0}–{Math.min(page * limit, total)}
              </strong>{" "}
              of <strong>{total}</strong>
            </span>
            <div className="pagination">
              <button
                className="pg-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >
                ‹
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`pg-btn ${n === page ? "pg-active" : ""}`}
                  onClick={() => setPage(n)}
                  aria-current={n === page ? "page" : undefined}
                >
                  {n}
                </button>
              ))}
              <button
                className="pg-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}