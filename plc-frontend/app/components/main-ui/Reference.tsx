"use client";
import { useState } from "react";

type ReferenceLink = {
    title: string;
    url: string;
};

type BlogDetailProps = {
    title: string;
    date: string;
    tag: string;
    content: React.ReactNode;
    references?: ReferenceLink[];
};

const ShareButtons = ({ title, compact = false }: { title: string; compact?: boolean }) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const encoded = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const links = [
        {
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
            ),
            color: "#0a66c2",
        },
        {
            label: "Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
            color: "#1877f2",
        },
        {
            label: "X / Twitter",
            href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
            icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            color: "#000",
        },
    ];

    return (
        <div className={`share-row ${compact ? "share-compact" : ""}`}>
            <span className="share-label">Share</span>
            <div className="share-btns" style={{ display:"flex",gap:"10px", justifyContent:"space-evenly"}}>
                {links.map((l) => (
                    <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-btn"
                        aria-label={`Share on ${l.label}`}
                        style={{ "--btn-color": l.color } as React.CSSProperties}
                    >
                        {l.icon}
                        {!compact && <span>{l.label}</span>}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default function Reference() {
    const [helpful, setHelpful] = useState<"yes" | "no" | null>(null);
    const references = [
        {
            title: "Siemens SIMATIC PLC – Official Documentation",
            url: "siemens.com/global/en/products/automation/systems/industrial/plc"
        },
        {
            title: "Inductive Automation – What is a PLC?",
            url: "siemens.com/global/en/products/automation/systems/industrial/plc"
        },
        {
            title: "Rockwell Automation – Allen-Bradley PLC Overview",
            url: "siemens.com/global/en/products/automation/systems/industrial/plc"
        },
        {
            title: "ISA – Industrial Automation Standards & Resources",
            url: "siemens.com/global/en/products/automation/systems/industrial/plc"
        }
    ];
    return (
        <article className="blog-detail">
            {references.length > 0 && (
                <div className="references-section">
                    <h3 className="references-title">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 7, verticalAlign: -2 }}>
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        References
                    </h3>
                    <ol className="references-list">
                        {references.map((ref, i) => (
                            <li key={i}>
                                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="ref-link">
                                    {ref.title}
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 5, flexShrink: 0 }}>
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            )}


            {/* ── Did you find this helpful? ── */}
            <div className="helpful-box">
                <p className="helpful-q">Did you find this article helpful?</p>
                {helpful === null ? (
                    <div className="helpful-btns">
                        <button className="helpful-btn yes" onClick={() => setHelpful("yes")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                            Yes
                        </button>
                        <button className="helpful-btn no" onClick={() => setHelpful("no")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                                <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                            </svg>
                            No
                        </button>
                    </div>
                ) : (
                    <p className="helpful-thanks">
                        {helpful === "yes" ? "🎉 Thanks for the feedback!" : "Thanks for letting us know. We'll keep improving."}
                    </p>
                )}
            </div>


            {/* ── Top share bar ── */}
            <div className="share-bar share-bar-top">
                <ShareButtons title="Plc" />
            </div> 


            {/* ── Reference links ── */}

            <style jsx>{`
        .blog-detail {
          max-width: 740px;
          margin: 0 auto;
          padding: 2rem 1rem 3rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* ── Share bar ── */
        .share-bar {
          padding: 12px 16px;
          border-radius: 10px;
          background: #f8f8f8;
          border: 1px solid #ebebeb;
        }
        .share-bar-top { margin-bottom: 2rem; }
        .share-bar-bottom { margin-top: 2rem; }
        .share-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .share-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #888;
          white-space: nowrap;
        }
        
        // .share-btn {
        //   display: inline-flex;
        //   align-items: center;
        //   gap: 6px;
        //   padding: 6px 14px;
        //   border-radius: 99px;
        //   border: 1px solid #e0e0e0;    
        //   background: #fff;
        //   font-size: 13px;
        //   font-weight: 500;
        //   color: var(--btn-color, #333);
        //   text-decoration: none;
        //   transition: background 0.12s, border-color 0.12s;
        //   cursor: pointer;
        // }
        .share-btn:hover {
          background: #f0f0f0;
          border-color: #ccc;
        }

        /* ── Blog header ── */
        .blog-header { margin-bottom: 2rem; }
        .blog-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 99px;
          border: 1px solid #e0e0e0;
          background: #fff;
          color: #555;
          margin-bottom: 12px;
        }
        .blog-heading {
          font-size: 28px;
          font-weight: 700;
          color: #111;
          line-height: 1.35;
          margin-bottom: 10px;
        }
        .blog-meta-date {
          font-size: 13px;
          color: #999;
          display: flex;
          align-items: center;
        }

        /* ── Content ── */
        .blog-content {
          font-size: 15px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 2rem;
        }

        /* ── Helpful box ── */
        .helpful-box {
          border: 1px solid #ebebeb;
          border-radius: 12px;
          padding: 20px 24px;
          margin: 2rem 0;
          background: #fafafa;
          text-align: center;
        }
        .helpful-q {
          font-size: 15px;
          font-weight: 600;
          color: #111;
          margin-bottom: 14px;
        }
        .helpful-btns { display: flex; gap: 10px; justify-content: center; }
        .helpful-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 22px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          background: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.12s;
        }
        .helpful-btn.yes { color: #16a34a; }
        .helpful-btn.yes:hover { background: #f0fdf4; border-color: #86efac; }
        .helpful-btn.no { color: #dc2626; }
        .helpful-btn.no:hover { background: #fef2f2; border-color: #fca5a5; }
        .helpful-thanks {
          font-size: 14px;
          color: #555;
          margin: 0;
        }

        /* ── References ── */
        .references-section {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #ebebeb;
        }
        .references-title {
          font-size: 15px;
          font-weight: 600;
          color: #111;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
        }
        .references-list {
          list-style: decimal;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        //   .share-btns { display: flex !important; gap: 8px;  }
          .share-btns { display: flex; gap: 10px; justify-content: center; }
        .ref-link {
          font-size: 14px;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          line-height: 1.5;
        }
        .ref-link:hover { text-decoration: underline; }

        @media (max-width: 560px) {
          .blog-heading { font-size: 22px; }
          .share-btn span { display: none; }
          .share-btn { padding: 7px 10px; }
        }
          
      `}</style>
        </article>
    );
}