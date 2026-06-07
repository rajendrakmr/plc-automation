"use client";

import { useState, useMemo } from "react";
 
const DEMO_ENQUIRIES: Enquiry[] = [
  // {
  //   id: "ENQ-001",
  //   name: "Rahul Agarwal",
  //   email: "rahul.agarwal@gmail.com",
  //   phone: "9876543210",
  //   subject: "Product availability query – SN-2045",
  //   message: "Hello,\n\nI wanted to know if the sensor model SN-2045 is currently in stock. We need around 50 units for a project starting next month.\n\nPlease let us know the earliest possible delivery date.\n\nRegards,\nRahul",
  //   source: "Contact Form",
  //   status: "new",
  //   created_at: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
  // },
  // {
  //   id: "ENQ-002",
  //   name: "Priya Mehta",
  //   email: "priya.m@techcorp.in",
  //   phone: "8765432109",
  //   subject: "Bulk order pricing for Actuators AC-1100",
  //   message: "Hi team,\n\nWe are interested in placing a bulk order of approximately 200 actuators (model AC-1100). Could you please send us a detailed pricing sheet and any applicable discounts for bulk purchase?\n\nRegards,\nPriya Mehta\nTech Corp India",
  //   source: "Website Form",
  //   status: "replied",
  //   created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  // }
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: "Contact Form" | "Website Form" | "Email" | string;
  status: "new" | "replied" | "pending" | "closed";
  created_at: string; // ISO string
}

interface FilterState {
  search: string;
  status: string;
  source: string;
}

type SortDir = "asc" | "desc";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Enquiry["status"] }) {
  const map: Record<
    Enquiry["status"],
    { label: string; cls: string }
  > = {
    new: { label: "New", cls: "badge-new" },
    replied: { label: "Replied", cls: "badge-replied" },
    pending: { label: "Pending", cls: "badge-pending" },
    closed: { label: "Closed", cls: "badge-closed" },
  };
  const { label, cls } = map[status] ?? map["new"];
  return <span className={`status-badge ${cls}`}>{label}</span>;
}

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
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;
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
  return (
    <span className="sort-icon active">{dir === "asc" ? "↑" : "↓"}</span>
  );
}
 
interface ReplyModalProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onSend: (id: string, message: string) => void;
}

function ReplyModal({ enquiry, onClose, onSend }: ReplyModalProps) {
  const [text, setText] = useState("");

  if (!enquiry) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(enquiry.id, text.trim());
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
          <span>{enquiry.name} &lt;{enquiry.email}&gt;</span>
        </div>
        <div className="modal-meta">
          <span className="modal-label">Re:</span>
          <span>{enquiry.subject}</span>
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
          <AvatarCircle name={enquiry.name} />
          <div className="detail-sender-info">
            <span className="detail-name">{enquiry.name}</span>
            <span className="detail-email">{enquiry.email}</span>
          </div>
          <StatusBadge status={enquiry.status} />
        </div>

        <div className="detail-meta-grid">
          <span className="detail-key">Subject</span>
          <span className="detail-val">{enquiry.subject}</span>
          {enquiry.phone && (
            <>
              <span className="detail-key">Phone</span>
              <span className="detail-val">{enquiry.phone}</span>
            </>
          )}
          <span className="detail-key">Source</span>
          <span className="detail-val">{enquiry.source}</span>
          <span className="detail-key">Received</span>
          <span className="detail-val">
            {new Date(enquiry.created_at).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>

        <div className="detail-message">{enquiry.message}</div>

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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EnquiriesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortKey, setSortKey] = useState<keyof Enquiry | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterVisible, setFilterVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<FilterState>({ search: "", status: "", source: "" });
  const [pendingFilters, setPendingFilters] = useState<FilterState>({ search: "", status: "", source: "" });

  const [replyTarget, setReplyTarget] = useState<Enquiry | null>(null);
  const [detailTarget, setDetailTarget] = useState<Enquiry | null>(null);
 
  const [demoData, setDemoData] = useState<Enquiry[]>(DEMO_ENQUIRIES);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const refetch = () => { };  

  const filteredData = useMemo(() => {
    let list = [...demoData];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q)
      );
    }
    if (filters.status) list = list.filter((e) => e.status === filters.status);
    if (filters.source) list = list.filter((e) => e.source === filters.source);

    if (sortKey) {
      list.sort((a, b) => {
        const av = String(a[sortKey] ?? "");
        const bv = String(b[sortKey] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }

    return list;
  }, [demoData, filters, sortKey, sortDir]);

  const total = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const enquiries = filteredData.slice((page - 1) * limit, page * limit);

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
    enquiries.length > 0 && enquiries.every((e) => selected.has(e.id));

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleSort = (key: keyof Enquiry) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleApplyFilters = () => { setFilters({ ...pendingFilters }); setPage(1); };

  const handleClearFilters = () => {
    const empty: FilterState = { search: "", status: "", source: "" };
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
    setSelected(checked ? new Set(enquiries.map((e) => e.id)) : new Set());
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const handleBulkAction = (action: string) => {
    if (action === "delete") {
      setDemoData((prev) => prev.filter((e) => !selected.has(e.id)));
    } else if (action === "replied" || action === "closed") {
      setDemoData((prev) =>
        prev.map((e) =>
          selected.has(e.id) ? { ...e, status: action as Enquiry["status"] } : e
        )
      );
    }
    setSelected(new Set());
  };

  const handleRowAction = (action: string, id: string) => {
    if (action === "delete") {
      setDemoData((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleSendReply = (id: string, _message: string) => {
    setDemoData((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "replied" } : e))
    );
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0)
      return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return d.toLocaleDateString("en-IN", { weekday: "short" });
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── Page ── */
        .enq-page { background: #637b7b; padding: 1.5rem; max-width: 1100px; margin: 0 auto; font-family: 'DM Sans', sans-serif; }

        /* ── Top bar ── */
        .rk_topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; gap: 12px; flex-wrap: wrap; }
        .rk_topbar-left { display: flex; align-items: center; gap: 10px; }
        .page-title { font-size: 18px; font-weight: 600; color: #fff; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        .badge-new-count { background: #fee2e2; color: #7f1d1d; }
        .rk_topbar-right { display: flex; align-items: center; gap: 8px; }

        /* ── Buttons ── */
        .btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid #e2e8f0; background: #fff; color: #1e293b; transition: background 0.15s; font-family: inherit; }
        .btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .btn-icon { width: 34px; height: 34px; padding: 0; justify-content: center; }
        .btn-primary { background: #0d9488; color: #f8fafc; border-color: #0d9488; }
        .btn-primary:hover { background: #0f766e; }
        .btn-danger { color: #dc2626; border-color: #fca5a5; }
        .btn-danger:hover { background: #fee2e2; }
        .icon-btn { background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 6px; color: #94a3b8; font-size: 14px; transition: background 0.12s, color 0.12s; font-family: inherit; }
        .icon-btn:hover { background: #f1f5f9; color: #1e293b; }
        .spin { animation: spin 0.6s linear infinite; display: inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Filter bar ── */
        .filter-bar { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 1rem; display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
        .filter-group { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 0px; }
        .filter-group label { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
        .filter-group input, .filter-group select { height: 36px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0 10px; font-size: 13px; background: #f8fafc; color: #1e293b; outline: none; width: 100%; font-family: inherit; transition: border-color 0.15s; }
        .filter-group input:focus, .filter-group select:focus { border-color: #3b82f6; background: #fff; }
        .filter-group.search-wrap { position: relative; flex: 2; min-width: 180px; }
        .filter-group.search-wrap input { padding-left: 34px; }
        .search-icon { position: absolute; left: 10px; top: 8px; color: #94a3b8; font-size: 15px; pointer-events: none; }
        .filter-actions { display: flex; gap: 8px; align-self: flex-end; }

        /* ── Table wrap ── */
        .table-wrap { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }

        /* ── Bulk bar ── */
        .bulk-bar { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #eff6ff; border-bottom: 1px solid #bfdbfe; font-size: 13px; }
        .bulk-bar-text { color: #1e40af; font-weight: 500; }

        /* ── Enquiry rows (Gmail-style) ── */
        .enq-row { display: flex; align-items: stretch; border-bottom: 1px solid #f1f5f9; transition: background 0.1s; cursor: default; }
        .enq-row:last-child { border-bottom: none; }
        .enq-row:hover { background: #f8fafc; }
        .enq-row.row-selected { background: #eff6ff; }
        .enq-row.unread .sender-name { font-weight: 700; }
        .enq-row.unread .enq-subject { font-weight: 600; }

        /* columns */
        .col-check { width: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0 4px 0 12px; }
        .col-dot { width: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .unread-dot { width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; display: none; }
        .enq-row.unread .unread-dot { display: block; }
        .col-avatar { width: 44px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .col-body { flex: 1; padding: 10px 12px 10px 6px; min-width: 0; cursor: pointer; }
        .col-time { width: 80px; display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0; padding-right: 12px; font-size: 12px; color: #64748b; white-space: nowrap; }
        .col-actions { width: 90px; display: flex; align-items: center; justify-content: flex-end; gap: 2px; padding-right: 12px; flex-shrink: 0; opacity: 0; transition: opacity 0.12s; }
        .enq-row:hover .col-actions { opacity: 1; }

        /* body layout */
        .body-top { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
        .sender-name { font-size: 13px; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
        .enq-subject { font-size: 13px; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .enq-preview { font-size: 12px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .body-bot { display: flex; align-items: center; gap: 6px; margin-top: 3px; }

        /* avatar */
        .avatar-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; }

        /* status badges */
        .status-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .status-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .badge-new     { background: #fee2e2; color: #7f1d1d; } .badge-new::before     { background: #dc2626; }
        .badge-replied { background: #dcfce7; color: #14532d; } .badge-replied::before { background: #16a34a; }
        .badge-pending { background: #fef9c3; color: #713f12; } .badge-pending::before { background: #ca8a04; }
        .badge-closed  { background: #f1f5f9; color: #64748b; } .badge-closed::before  { background: #94a3b8; }

        /* source pill */
        .source-pill { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; color: #64748b; background: #f1f5f9; border: 1px solid #e2e8f0; }

        /* action buttons */
        .action-btn { background: none; border: none; cursor: pointer; padding: 5px 6px; border-radius: 6px; color: #94a3b8; font-size: 14px; transition: background 0.12s, color 0.12s; }
        .action-btn:hover { background: #f1f5f9; color: #1e293b; }
        .action-btn.danger:hover { background: #fee2e2; color: #dc2626; }

        /* sort */
        .sort-icon { opacity: 0.35; font-size: 11px; margin-left: 3px; }
        .sort-icon.active { opacity: 1; color: #3b82f6; }

        /* table header */
        table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        thead tr { border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
        thead th { padding: 10px 14px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; text-align: left; cursor: pointer; user-select: none; white-space: nowrap; }
        thead th.no-sort { cursor: default; }
        tbody tr { border-bottom: 1px solid #f1f5f9; }
        tbody tr:last-child { border-bottom: none; }

        /* footer */
        .table-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-top: 1px solid #e2e8f0; flex-wrap: wrap; gap: 10px; background: #f8fafc; }
        .page-info { font-size: 12px; color: #64748b; }
        .page-info strong { color: #1e293b; }
        .pagination { display: flex; align-items: center; gap: 4px; }
        .pg-btn { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 12px; font-weight: 500; color: #1e293b; transition: background 0.12s; font-family: inherit; }
        .pg-btn:hover:not(:disabled):not(.pg-active) { background: #f1f5f9; }
        .pg-btn.pg-active { background: #1e293b; color: #fff; border-color: #1e293b; }
        .pg-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .limit-select { height: 30px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0 8px; font-size: 12px; background: #fff; color: #1e293b; font-family: inherit; }

        /* empty / loading */
        .empty-state { text-align: center; padding: 48px 20px; color: #94a3b8; font-size: 13px; }
        .empty-icon { font-size: 32px; margin-bottom: 8px; }
        .loading-overlay { opacity: 0.5; pointer-events: none; }
        .error-msg { padding: 12px 16px; background: #fee2e2; color: #7f1d1d; font-size: 13px; border-bottom: 1px solid #fca5a5; }

        /* checkbox */
        input[type="checkbox"] { width: 15px; height: 15px; cursor: pointer; accent-color: #3b82f6; }

        /* ── Modals ── */
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

        /* detail modal specifics */
        .detail-sender-row { display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; margin-bottom: 4px; }
        .detail-sender-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .detail-name { font-size: 14px; font-weight: 600; color: #1e293b; }
        .detail-email { font-size: 12px; color: #64748b; }
        .detail-meta-grid { display: grid; grid-template-columns: 80px 1fr; gap: 6px 12px; font-size: 13px; margin: 10px 0; }
        .detail-key { color: #64748b; }
        .detail-val { color: #1e293b; }
        .detail-message { font-size: 13px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; }
      `}</style>

      {/* ── Modals ── */}
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
            <span className="badge badge-info">{total ?? 0}</span>
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
          <div className="filter-bar">
            <div className="filter-group search-wrap">
              <label>Search</label>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Name, email, subject..."
                value={pendingFilters.search}
                onChange={(e) =>
                  setPendingFilters((f) => ({ ...f, search: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
              />
            </div>
            
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
            <div className="filter-group">
              <label>Source</label>
              <select
                value={pendingFilters.source}
                onChange={(e) =>
                  setPendingFilters((f) => ({ ...f, source: e.target.value }))
                }
              >
                <option value="">All Sources</option>
                <option value="Contact Form">Contact Form</option>
                <option value="Website Form">Website Form</option>
                <option value="Email">Email</option>
              </select>
            </div>
            
            <div className="filter-actions">
              <button className="btn" onClick={handleClearFilters}>
                Clear
              </button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>
                Apply
              </button>
            </div>
          </div>
        )}

      
        <div className="table-wrap"> 
          {selected.size > 0 && (
            <div className="bulk-bar">
              <span className="bulk-bar-text">{selected.size} selected</span>
              <button
                className="btn"
                style={{ marginLeft: "auto" }}
                onClick={() => handleBulkAction("replied")}
              >
                ✓ Mark Replied
              </button>
              <button className="btn" onClick={() => handleBulkAction("closed")}>
                📁 Close
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleBulkAction("delete")}
              >
                🗑 Delete
              </button>
            </div>
          )}

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className={loading ? "loading-overlay" : ""}>  
            <div> 
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px 8px 0",
                  borderBottom: "1px solid #e2e8f0",
                  background: "#f8fafc",
                }}
              >
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
                  style={{ flex: 1, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", cursor: "pointer", userSelect: "none" }}
                  onClick={() => handleSort("name")}
                >
                  Enquiry <SortIcon active={sortKey === "name"} dir={sortDir} />
                </div>
                <div
                  style={{ width: 80, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", cursor: "pointer", userSelect: "none", textAlign: "right", paddingRight: 12 }}
                  onClick={() => handleSort("created_at")}
                >
                  Time <SortIcon active={sortKey === "created_at"} dir={sortDir} />
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
                    key={enq.id}
                    className={`enq-row ${selected.has(enq.id) ? "row-selected" : ""} ${enq.status === "new" ? "unread" : ""}`}
                  >
                    <div className="col-check">
                      <input
                        type="checkbox"
                        checked={selected.has(enq.id)}
                        onChange={(e) => handleSelectRow(enq.id, e.target.checked)}
                        aria-label={`Select enquiry from ${enq.name}`}
                      />
                    </div>
                    <div className="col-dot">
                      <div className="unread-dot" />
                    </div>
                    <div className="col-avatar">
                      <AvatarCircle name={enq.name} />
                    </div>
                    <div
                      className="col-body"
                      onClick={() => setDetailTarget(enq)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setDetailTarget(enq)}
                      aria-label={`Open enquiry from ${enq.name}: ${enq.subject}`}
                    >
                      <div className="body-top">
                        <span className="sender-name">{enq.name}</span>
                        <span className="enq-subject">{enq.subject}</span>
                        <span className="enq-preview">
                          — {enq.message.split("\n")[0]}
                        </span>
                      </div>
                      <div className="body-bot">
                        <StatusBadge status={enq.status} />
                        <span className="source-pill">{enq.source}</span>
                      </div>
                    </div>
                    <div className="col-time">{formatTime(enq.created_at)}</div>
                    <div className="col-actions">
                      <button
                        className="action-btn"
                        title="Reply"
                        aria-label={`Reply to ${enq.name}`}
                        onClick={() => setReplyTarget(enq)}
                      >
                        ↩️
                      </button>
                      <button
                        className="action-btn danger"
                        title="Delete"
                        aria-label={`Delete enquiry from ${enq.name}`}
                        onClick={() => handleRowAction("delete", enq.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
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
                {total ? (page - 1) * limit + 1 : 0}–
                {Math.min(page * limit, total ?? 0)}
              </strong>{" "}
              of <strong>{total ?? 0}</strong>
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
                disabled={page >= (totalPages ?? 1)}
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