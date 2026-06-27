"use client";

import { useState, useEffect, useRef } from "react";
import { useGet } from "@/app/components/hooks/useGet";
// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string | number;
  sub: string;
  trend: "up" | "down" | "flat";
  trendVal: string;
  icon: string;
  accent: string;
}

interface RecentEnquiry {
  id: string;
  name: string;
  subject: string;
  status: "new" | "replied" | "pending" | "closed";
  time: string;
}

interface RecentOrder {
  id: string;
  part: string;
  qty: number;
  amount: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
}

interface ChartPoint {
  label: string;
  enquiries: number;
  orders: number;
}

// ─── Demo Data ────────────────────────────────────────────────────────────────



 

const RECENT_ENQUIRIES: RecentEnquiry[] = [
  { id: "ENQ-001", name: "Rahul Agarwal", subject: "Product availability – SN-2045", status: "new", time: "38 min ago" },
  { id: "ENQ-002", name: "Priya Mehta", subject: "Bulk order pricing – AC-1100", status: "replied", time: "3 hrs ago" },
  { id: "ENQ-003", name: "Suresh Kumar", subject: "Datasheet – Hydraulic Valve HV-300", status: "pending", time: "Yesterday" },
  { id: "ENQ-004", name: "Anita Nair", subject: "Damaged item – Order #ORD-44521", status: "new", time: "Yesterday" },
  { id: "ENQ-005", name: "Meena Krishnan", subject: "Export inquiry – GCC region", status: "new", time: "2 days ago" },
];

 


// ─── Sub-components ───────────────────────────────────────────────────────────

function EnqStatusBadge({ status }: { status: RecentEnquiry["status"] }) {
  const map = {
    new: { label: "New", bg: "#fee2e2", color: "#7f1d1d" },
    replied: { label: "Replied", bg: "#dcfce7", color: "#14532d" },
    pending: { label: "Pending", bg: "#fef9c3", color: "#713f12" },
    closed: { label: "Closed", bg: "#f1f5f9", color: "#64748b" },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>
      {s.label}
    </span>
  );
}



function AvatarCircle({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  const colors = [
    { bg: "#E6F1FB", text: "#185FA5" }, { bg: "#E1F5EE", text: "#0F6E56" },
    { bg: "#EEEDFE", text: "#534AB7" }, { bg: "#FAECE7", text: "#993C1D" },
    { bg: "#FAEEDA", text: "#854F0B" }, { bg: "#FBEAF0", text: "#993556" },
  ];
  const idx = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return (
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: colors[idx].bg, color: colors[idx].text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
      {initials}
    </div>
  );
}



// ─── Donut Chart (SVG) ───────────────────────────────────────────────────────

function DonutChart({ data }: { data: typeof STOCK_DATA }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 52; const cx = 70; const cy = 70;
  let cumAngle = -90;
  const slices = data.map((d) => {
    const angle = (d.value / total) * 360;
    const start = cumAngle;
    cumAngle += angle;
    const toRad = (a: number) => (a * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(start + angle));
    const y2 = cy + r * Math.sin(toRad(start + angle));
    const large = angle > 180 ? 1 : 0;
    return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z` };
  });

  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", maxWidth: 200 }}>
      <circle cx={cx} cy={cy} r={r} fill="#f8fafc" />
      {slices.map((s) => <path key={s.name} d={s.path} fill={s.color} opacity={0.9} />)}
      <circle cx={cx} cy={cy} r={34} fill="white" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={16} fontWeight={600} fill="#1e293b">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={9} fill="#64748b">Products</text>
      {data.map((d, i) => (
        <g key={d.name} transform={`translate(145, ${18 + i * 34})`}>
          <rect width={10} height={10} rx={2} fill={d.color} />
          <text x={14} y={9} fontSize={10} fill="#1e293b">{d.name}</text>
          <text x={14} y={20} fontSize={9} fill="#64748b">{d.value} items</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good morning");
  const [now, setNow] = useState("");
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 17) setGreeting("Good afternoon");
    else if (h >= 17) setGreeting("Good evening");
    const fmt = new Date().toLocaleString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
    setNow(fmt);
    setTimeout(() => setAnimIn(true), 50);
  }, []);


  const { data: recordsData, loading: catLoading } = useGet<any>({
    url: "/dashboard/stats",
  });

  const STATS: StatCard[] = [
    { label: "Total Blogs", value: recordsData?.blogs?.total, sub: "In Contents", trend: "up", trendVal: "—", icon: "✉", accent: "#3b82f6" },
    { label: "Total Products", value: recordsData?.products?.total, sub: "In catalogue", trend: "flat", trendVal: "—", icon: "📦", accent: "#0d9488" },
    { label: "New Enquiries", value: recordsData?.enquiries?.total, sub: "Unread", trend: "up", trendVal: "—", icon: "🔔", accent: "#f59e0b" },
    // { label: "Low Stock Items", value: 17, sub: "Need reorder", trend: "down", trendVal: "-3", icon: "⚠️", accent: "#ef4444" },
    // { label: "Orders Today", value: 43, sub: "vs 38 yesterday", trend: "up", trendVal: "+13%", icon: "🛒", accent: "#8b5cf6" },
    // { label: "Revenue (Mon)", value: "₹2.4L", sub: "June 2026", trend: "up", trendVal: "+22%", icon: "💰", accent: "#10b981" },
  ];

  const STOCK_DATA = [
  { name: "In Stock", value: recordsData?.products?.in_stock, color: "#0d9488" },
  { name: "Limited", value: recordsData?.products?.limited, color: "#f59e0b" },
  { name: "Out of Stock", value: recordsData?.products?.out_stock, color: "#ef4444" },
];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .db-page { background: #637b7b; padding: 1.5rem; max-width: 1200px; margin: 0 auto; font-family: 'DM Sans', sans-serif; }

        /* fade-in stagger */
        .fade-row { opacity: 0; transform: translateY(12px); transition: opacity 0.35s ease, transform 0.35s ease; }
        .fade-row.in { opacity: 1; transform: translateY(0); }
        .fade-row:nth-child(1) { transition-delay: 0.00s; }
        .fade-row:nth-child(2) { transition-delay: 0.07s; }
        .fade-row:nth-child(3) { transition-delay: 0.14s; }
        .fade-row:nth-child(4) { transition-delay: 0.21s; }
        .fade-row:nth-child(5) { transition-delay: 0.28s; }

        /* header */
        .db-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 10px; }
        .db-greeting { font-size: 22px; font-weight: 600; color: #fff; margin: 0; }
        .db-sub { font-size: 13px; color: rgba(255,255,255,0.65); margin-top: 2px; }
        .db-now { font-size: 12px; color: rgba(255,255,255,0.5); text-align: right; }

        /* stat cards grid */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 1.25rem; }
        .stat-card { background: #fff; border-radius: 12px; padding: 14px 16px; border: 1px solid #e2e8f0; position: relative; overflow: hidden; cursor: default; transition: transform 0.15s, box-shadow 0.15s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .stat-accent { position: absolute; top: 0; left: 0; width: 4px; height: 100%; border-radius: 12px 0 0 12px; }
        .stat-icon { font-size: 20px; margin-bottom: 8px; display: block; }
        .stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
        .stat-value { font-size: 26px; font-weight: 600; color: #1e293b; line-height: 1; margin-bottom: 4px; font-family: 'DM Mono', monospace; }
        .stat-sub { font-size: 11px; color: #94a3b8; }
        .stat-trend { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; margin-left: 6px; }
        .trend-up   { color: #16a34a; }
        .trend-down { color: #dc2626; }
        .trend-flat { color: #94a3b8; }

        /* main grid */
        .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        @media (max-width: 720px) { .main-grid { grid-template-columns: 1fr; } }

        /* cards */
        .db-card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
        .card-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 10px; border-bottom: 1px solid #f1f5f9; }
        .card-title { font-size: 13px; font-weight: 600; color: #1e293b; }
        .card-link { font-size: 12px; color: #3b82f6; cursor: pointer; text-decoration: none; }
        .card-link:hover { text-decoration: underline; }
        .card-body { padding: 14px 16px; }

        /* enquiry rows */
        .enq-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f8fafc; }
        .enq-row:last-child { border-bottom: none; }
        .enq-info { flex: 1; min-width: 0; }
        .enq-name { font-size: 13px; font-weight: 500; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .enq-subj { font-size: 11px; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .enq-time { font-size: 11px; color: #94a3b8; white-space: nowrap; }

        /* order rows */
        .ord-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f8fafc; }
        .ord-row:last-child { border-bottom: none; }
        .ord-id { font-size: 11px; font-weight: 600; color: #3b82f6; font-family: 'DM Mono', monospace; min-width: 72px; }
        .ord-info { flex: 1; min-width: 0; }
        .ord-part { font-size: 12px; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ord-qty  { font-size: 11px; color: #64748b; }
        .ord-amt  { font-size: 12px; font-weight: 600; color: #1e293b; font-family: 'DM Mono', monospace; white-space: nowrap; }

        /* chart card spans full width */
        .chart-card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 14px; }
        .chart-legend { display: flex; gap: 16px; margin-bottom: 8px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 2px; display: inline-block; margin-right: 4px; }
        .legend-item { font-size: 12px; color: #64748b; display: flex; align-items: center; }

        /* bottom grid */
        .bottom-grid { display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: start; }
        @media (max-width: 720px) { .bottom-grid { grid-template-columns: 1fr; } }

        /* activity feed */
        .activity-item { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f8fafc; font-size: 12px; }
        .activity-item:last-child { border-bottom: none; }
        .act-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
        .act-text { color: #475569; line-height: 1.5; }
        .act-time { color: #94a3b8; font-size: 11px; margin-top: 2px; }

        /* quick actions */
        .qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .qa-btn { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center; cursor: pointer; transition: background 0.12s, border-color 0.12s; font-family: inherit; }
        .qa-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }
        .qa-icon { font-size: 20px; display: block; margin-bottom: 4px; }
        .qa-label { font-size: 12px; font-weight: 500; color: #1e293b; }
      `}</style>

      <div className="db-page">
        <div className={`db-header fade-row ${animIn ? "in" : ""}`}>
          <div>
            <p className="db-greeting">{greeting}, PLC Automation Admin 👋</p>
            <p className="db-sub">Here&apos;s what&apos;s happening with your store today.</p>
          </div>
          <div className="db-now">{now}</div>
        </div>

        <div className={`stats-grid fade-row ${animIn ? "in" : ""}`}>
          {STATS.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-accent" style={{ background: s.accent }} />
              <span className="stat-icon">{s.icon}</span>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">
                {s.value}
                <span className={`stat-trend ${s.trend === "up" ? "trend-up" : s.trend === "down" ? "trend-down" : "trend-flat"}`}>
                  {s.trend === "up" ? "▲" : s.trend === "down" ? "▼" : ""} {s.trendVal}
                </span>
              </div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>





        <div className={`main-grid fade-row ${animIn ? "in" : ""}`}>
          <div className="db-card">
            <div className="card-head">
              <span className="card-title">Stock Overview</span>
              <a className="card-link" href="/admin/products">Manage →</a>
            </div>
            <div className="card-body">
              <DonutChart data={STOCK_DATA} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="db-card">
              <div className="card-head">
                <span className="card-title">Quick Actions</span>
              </div>
              <div className="card-body">
                <div className="qa-grid">
                  {[
                    { icon: "📦", label: "Add Product", href: "/admin/products/add" },
                    { icon: "✉", label: "View Enquiries", href: "/admin/enquiries" },
                    { icon: "📊", label: "Export Report", href: "#" },
                    { icon: "⚙️", label: "Settings", href: "/admin/settings" },
                  ].map((q) => (
                    <a key={q.label} href={q.href} className="qa-btn" style={{ textDecoration: "none" }}>
                      <span className="qa-icon">{q.icon}</span>
                      <span className="qa-label">{q.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="db-card">
              <div className="card-head">
                <span className="card-title">Recent Enquiries</span>
                <a className="card-link" href="/admin/enquiries">View all →</a>
              </div>
              <div className="card-body">
                {RECENT_ENQUIRIES.map((e) => (
                  <div className="enq-row" key={e.id}>
                    <AvatarCircle name={e.name} />
                    <div className="enq-info">
                      <div className="enq-name">{e.name}</div>
                      <div className="enq-subj">{e.subject}</div>
                    </div>
                    <EnqStatusBadge status={e.status} />
                    <span className="enq-time">{e.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}