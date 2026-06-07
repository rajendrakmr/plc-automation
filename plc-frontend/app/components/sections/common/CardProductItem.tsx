'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ── Types ── */
export interface Product {
  id?: number;
  name: string;
  brand: string;
  price?: string;
  image?: string;
  partNumber?: string;
  description?: string;
  stock?: 'in-stock' | 'low-stock' | 'out-of-stock';
  category?: string;
  href?: string;
}

interface CardProductProps {
  products: Product[];
}

/* ── Stock badge config ── */
const stockConfig = {
  'in-stock': { label: 'In Stock', className: 'badge-stock badge-in' },
  'low-stock': { label: 'Low Stock', className: 'badge-stock badge-low' },
  'out-of-stock': { label: 'Out of Stock', className: 'badge-stock badge-out' },
};

/* ── Single card ── */
function CardProductItem({ p }: { p: Product }) {
  const [imgError, setImgError] = useState(false);
  const stock = p.stock ?? 'in-stock';
  const { label, className } = stockConfig[stock];
  const href = p.href ?? `/products/${p.id}`;

  return (
    <div className="pc-card">
      {/* Image */}
      <div className="pc-img-wrap">
        {!imgError ? (
          <img
            src={p.image}
            alt={p.name}
            className="pc-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="pc-img-fallback">
            <span>⚙</span>
          </div>
        )}

        {/* Category ribbon */}
        {p.category && (
          <span className="pc-category">{p.category}</span>
        )}

        {/* Quick-view overlay */}
        <div className="pc-overlay">
          <Link href={href} className="pc-quick-view">
            Quick View
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="pc-body">
        {/* Brand + stock row */}
        <div className="pc-meta">
          <span className="pc-brand">{p.name}</span>
          <span className={className}>{label}</span>
        </div>


        {/* Name */}
        <h4 className="pc-name">{p.brand}</h4>

        {/* Part number */}
        {p.partNumber && (
          <p className="pc-part">Part #: <code>{p.partNumber}</code></p>
        )}

        {p.description && (
          <p className="pc-part">{p.description}</p>
        )}

        {/* Price + CTA */}
        <div className="pc-footer">
          <Link
            href={href}
            className={`pc-btn${stock === 'out-of-stock' ? ' pc-btn-disabled' : ''}`}
            aria-disabled={stock === 'out-of-stock'}
            tabIndex={stock === 'out-of-stock' ? -1 : 0}
          >
            {stock === 'out-of-stock' ? 'Unavailable' : 'Enquire →'}
          </Link>
        </div>
      </div>

      {/* Styles — scoped via CSS custom properties from the global design system */}
      <style>{`
        
      `}</style>
    </div>
  );
}

/* ── Grid component (default export) ── */
export default function CardProduct({ products }: CardProductProps) {
  console.log('Rendering CardProduct with products:', products);
  if (!products?.length) {
    return (
      <div className="pc-empty">
        <span>⚙</span>
        <p>No products found.</p>
        <style>{`
          .pc-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 4rem 2rem;
            color: var(--steel, #64748b);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
          }
          .pc-empty span { font-size: 2.5rem; opacity: 0.4; }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="pc-grid">
        {products.map((p) => (
          <CardProductItem key={p.id} p={p} />
        ))}
      </div>

      <style>{`
       
      `}</style>
    </>
  );
}