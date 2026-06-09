"use client";
import Link from "next/link";
import { useState } from "react";
import Reference from "../(main)/blogs/Reference";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tag: string;
};

const blogsData: Blog[] = [
  { id: 1, title: "Understanding PLC Automation Systems", excerpt: "Learn how PLC systems power modern industries and improve efficiency across complex workflows.", image: "/assets/1.jpg", date: "Aug 12, 2025", tag: "Automation" },
  { id: 2, title: "How to Handle Obsolete Automation Parts", excerpt: "Best strategies to manage discontinued industrial components and minimize operational risk.", image: "/assets/2.jpg", date: "Aug 10, 2025", tag: "Maintenance" },
  { id: 3, title: "Top 5 Industrial Automation Brands", excerpt: "A breakdown of the most trusted automation manufacturers and what sets them apart.", image: "/assets/3.jpg", date: "Aug 05, 2025", tag: "Industry" },
  { id: 4, title: "Reducing Downtime with Spare Parts", excerpt: "Tips to ensure continuous operations in industrial setups through smart inventory planning.", image: "/assets/4.jpg", date: "Aug 01, 2025", tag: "Operations" },
  { id: 5, title: "Automation Trends in 2025", excerpt: "Explore the future of industrial automation and AI integration in manufacturing.", image: "/assets/5.jpg", date: "Jul 28, 2025", tag: "Trends" },
  { id: 6, title: "Choosing the Right PLC", excerpt: "Key factors to consider when selecting PLC systems for your industrial environment.", image: "/assets/6.jpg", date: "Jul 20, 2025", tag: "Automation" },
  { id: 7, title: "SCADA Systems Explained", excerpt: "An overview of SCADA architecture and how it enables real-time industrial monitoring.", image: "/assets/7.jpg", date: "Jul 15, 2025", tag: "Systems" },
  { id: 8, title: "Predictive Maintenance 101", excerpt: "How predictive maintenance strategies can save costs and extend equipment lifespan.", image: "/assets/8.jpg", date: "Jul 10, 2025", tag: "Maintenance" },
  { id: 9, title: "Industrial IoT in Practice", excerpt: "Real-world applications of IIoT sensors and connectivity on the factory floor.", image: "/assets/9.jpg", date: "Jul 05, 2025", tag: "IoT" },
  { id: 10, title: "Supply Chain Resilience", excerpt: "Building robust supply chains for critical automation components and spare parts.", image: "/assets/10.jpg", date: "Jun 30, 2025", tag: "Supply Chain" },
  { id: 11, title: "HMI Design Best Practices", excerpt: "Principles for designing human-machine interfaces that operators actually find intuitive.", image: "/assets/11.jpg", date: "Jun 25, 2025", tag: "Design" },
  { id: 12, title: "Energy Efficiency in Automation", excerpt: "Strategies to reduce energy consumption without compromising industrial output.", image: "/assets/12.jpg", date: "Jun 20, 2025", tag: "Efficiency" },
  { id: 13, title: "Variable Frequency Drives", excerpt: "How VFDs improve motor control and deliver measurable energy savings in automation.", image: "/assets/13.jpg", date: "Jun 15, 2025", tag: "Drives" },
];

const BLOGS_PER_PAGE = 9;

export default function BlogsSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogsData.length / BLOGS_PER_PAGE);
  const indexOfFirst = (currentPage - 1) * BLOGS_PER_PAGE;
  const currentBlogs = blogsData.slice(indexOfFirst, indexOfFirst + BLOGS_PER_PAGE);

  const getSlug = (title: string) =>
    title.toLowerCase().replace(/ /g, "-");

  const getPaginationItems = () => {
    const items: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        items.push(i);
      } else if (Math.abs(i - currentPage) === 2) {
        items.push("...");
      }
    }
    return [...new Set(items.map(String))].map((v) =>
      v === "..." ? "..." : Number(v)
    );
  };

  return (
    <section className="section_grey_content">
      <div className="section_container" style={{ paddingTop: "0px" }}>
        <div className="blogs-section-header">
          <h2 className="blogs-title">Blogs</h2>
          <p className="blogs-sub">
            Expert articles and updates in industrial automation, supply chain
            optimization, and critical spare parts sourcing.
          </p>
        </div>

        {/* Grid */}
        <div className="blogs-grid">
          {currentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${getSlug(blog.title)}`}
              className="blog-card-link"
            >
              <div className="blog-card">
                {/* Image */}
                <div
                  className="blog-card-img"
                  style={{ backgroundImage: `url(${blog.image})` }}
                >
                  <span className="blog-tag">{blog.tag}</span>
                </div>

                {/* Body */}
                <div className="blog-card-body">

                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <span className="blog-read-more">
                    Read more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 4 }}>
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="blogs-pagination">
          <button
            className="pg-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>

          {getPaginationItems().map((item, i) =>
            item === "..." ? (
              <span key={`ellipsis-${i}`} className="pg-ellipsis">…</span>
            ) : (
              <button
                key={item}
                className={`pg-btn${currentPage === item ? " pg-active" : ""}`}
                onClick={() => setCurrentPage(item as number)}
              >
                {item}
              </button>
            )
          )}

          <button
            className="pg-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </div>

        <Reference />
      </div>

      <style jsx>{`
        .blogs-section-header {
          margin-bottom: 2rem;
        }
        .blogs-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 6px;
        }
        .blogs-title {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #111;
        }
        .blogs-sub {
          font-size: 14px;
          color: #666;
          line-height: 1.7;
          max-width: 560px;
        }

        /* Grid — 3 col desktop, 1 col mobile */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .blogs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .blogs-grid {
            grid-template-columns: 1fr;
          }
        }

        .blog-card-link {
          text-decoration: none;
          color: inherit;
        }
        .blog-card {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .blog-card:hover {
          border-color: #ccc;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }
        .blog-card-img {
          height: 160px;
          background-color: #f3f3f3;
          background-size: cover;
          background-position: center;
          position: relative;
          flex-shrink: 0;
        }
        .blog-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 99px;
          background: #fff;
          color: #555;
          border: 1px solid #e0e0e0;
        }
        .blog-card-body {
          padding: 14px 16px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .blog-card-date {
          font-size: 12px;
          color: #999;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        .blog-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #111;
          line-height: 1.45;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-excerpt {
          font-size: 13px;
          color: #666;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          margin-bottom: 14px;
        }
        .blog-read-more {
          font-size: 13px;
          font-weight: 500;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          transition: gap 0.15s;
        }
        .blog-card:hover .blog-read-more svg {
          transform: translateX(3px);
          transition: transform 0.15s;
        }

        /* Pagination */
        .blogs-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }
        .pg-btn {
          min-width: 34px;
          height: 34px;
          padding: 0 10px;
          border-radius: 8px;
          border: 1px solid var(--blue);
          background: #fff;
          color: #555;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.12s;
        }
        .pg-btn:hover:not(:disabled) {
          border-color: var(--blue);
          color: #111;
        }
        .pg-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .pg-active {
          background:var(--blue);
          border-color: #bbb;
          color: #fff;
          font-weight: 600;
        }
        .pg-ellipsis {
          font-size: 14px;
          color: #aaa;
          padding: 0 2px;
        }
      `}</style>
    </section>
  );
}