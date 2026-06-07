"use client";

import Link from "next/link";
import Image from "next/image";

// Brand data with images
const popularBrands = [
  { name: "ABB", image: "/assets/items/abb.webp", url: "/brand/abb" },
  { name: "Fanuc", image: "/assets/items/fanuc.webp", url: "/brand/fanuc" },
  { name: "Indramat", image: "/assets/items/indramat.webp", url: "/brand/indramat" },
  { name: "Mitsubishi", image: "/assets/items/mitsubishi.webp", url: "/brand/mitsubishi" },
  { name: "Schneider", image: "/assets/items/schneider.webp", url: "/brand/schneider" },
  { name: "Siemens", image: "/assets/items/siemens.webp", url: "/brand/siemens" },
  { name: "B&R", image: "/assets/items/br.webp", url: "/brand/br" },
];

export default function MegaMenu() {
  return (
    <> 

      {/* ── RIGHT COLUMN: Brand Cards Grid ── */}
      <div className="rk_mm_right">
        <p className="rk_mm_right_desc">
          We supply an extensive catalogue of automation and control equipment
          from over 100 of the world&apos;s leading parts manufacturers.
        </p>
        <div className="rk_mm_cards_grid">
          {popularBrands.slice(0, 6).map((brand) => (
            <Link href={brand.url} key={brand.url} className="rk_mm_card">
              <div className="rk_mm_card_img_wrap">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="rk_mm_card_info">
                <span className="rk_mm_card_name">{brand.name}</span>
                <span className="rk_mm_card_cta">View all parts</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Styles scoped with rk_ prefix ── */}
      <style jsx>{`
        /* LEFT COLUMN */
        .rk_mm_left {
          min-width: 180px;
          padding-right: 2rem;
          border-right: 1px solid #e5e7eb;
        }

        .rk_mm_left_title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
          margin-bottom: 0.75rem;
        }

        .rk_mm_brand_list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .rk_mm_brand_link {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          color: #111827;
          padding: 0.3rem 0;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .rk_mm_brand_link:hover {
          color: #e11d48;
        }

        .rk_mm_view_all {
          display: inline-block;
          margin-top: 0.6rem;
          font-size: 0.82rem;
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s ease;
        }

        .rk_mm_view_all:hover {
          color: #1d4ed8;
        }

        /* RIGHT COLUMN */
        .rk_mm_right {
          flex: 1;
          width: 100%;
          padding-left: 1.5rem;
          background: #f8fafc;
        }

        .rk_mm_right_desc {
          font-size: 0.85rem;
          color: #4b5563;
          margin-bottom: 1.25rem;
          line-height: 1.5;
          max-width: 620px;
        }

        /* 2-column card grid */
        .rk_mm_cards_grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.85rem;
        }

        /* Card */
        .rk_mm_card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          text-decoration: none;
          border-radius: 6px;
          padding: 0.5rem;
          transition: background 0.15s ease;
        }

        .rk_mm_card:hover {
          background: #f3f4f6;
        }

        .rk_mm_card_img_wrap {
          position: relative;
          width: 80px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 4px;
          overflow: hidden;
          background: #1f2937;
        }

        .rk_mm_card_info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .rk_mm_card_name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #111827;
        }

        .rk_mm_card_cta {
          font-size: 0.8rem;
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .rk_mm_card:hover .rk_mm_card_cta {
          color: #1d4ed8;
        }

        /* Responsive: stack on small screens */
        @media (max-width: 768px) {
          .rk_mm_left {
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
            padding-right: 0;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
          }

          .rk_mm_right {
            padding-left: 0;
          }

          .rk_mm_cards_grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}