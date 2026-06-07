"use client";

import Image from "next/image";
import { useState } from "react";
// import "@/app/(public)/components/delivery-section.css"; // adjust path as needed

// ── Icons ──────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" stroke="var(--blue)" strokeWidth="1" />
    <path
      d="M4.5 8l2.5 2.5 4-4"
      stroke="var(--blue)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`ds-chevron${open ? " ds-chevron--open" : ""}`}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M4.5 6.75L9 11.25L13.5 6.75"
      stroke="#94a3b8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────
type SimpleRow = { text: string; highlight?: boolean };

type DeliverySection = {
  id: "delivery" | "warranty" | "returns";
  label: string;
  rows: SimpleRow[];
};

type PaymentSection = {
  id: "payment";
  label: string;
  tradeCreditTitle: string;
  tradeCreditText: string;
  paymentOptionsTitle: string;
  paymentOptionsText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

type SectionItem = DeliverySection | PaymentSection;

// ── Data ───────────────────────────────────────────────────────────────────────
const sections: SectionItem[] = [
  {
    id: "delivery",
    label: "Delivery",
    rows: [
      { text: "Logistic partners UPS, FedEx and DHL" },
      { text: "International delivery available" },
      { text: "Premium nine hour delivery service available to anywhere in Europe" },
      { text: "Same day dispatch from group stock" },
      { text: "Dedicated customer support team" },
    ],
  },
  {
    id: "warranty",
    label: "Warranty",
    rows: [
      { text: "All parts new or reconditioned are covered by PLC Automation 12 month warranty" },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    rows: [
      { text: "No hassle returns policy" },
      { text: "Dedicated customer support team" },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    tradeCreditTitle: "Trade Credit",
    tradeCreditText:
      "We understand that credit is a necessary part of business and offer credit agreements on request, subject to status.",
    paymentOptionsTitle: "Payment options",
    paymentOptionsText: "We accept Bank transfers and the following methods of payment:",
    footerText:
      "All transactions are handled securely by HSBC and HSBC Merchant Services. For more information, please visit our dedicated",
    footerLinkText: "payments page",
    footerLinkHref: "#",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function DeliverySection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="ds-page">
      <div className="ds-wrapper">

        {/* Header */}
        <button
          className="ds-header"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <span className="ds-header-title">Delivery and payment</span>
          <ChevronIcon open={open} />
        </button>

        {/* Body */}
        <div className={`ds-body${open ? " ds-body--open" : ""}`}>
          {sections.map((section, sIdx) => (
            <div
              key={section.id}
              className="ds-section"
            >
              {/* Section label */}
              <div className="ds-section-label">{section.label}</div>

              {/* Delivery / Warranty / Returns — simple rows */}
              {(section.id === "delivery" ||
                section.id === "warranty" ||
                section.id === "returns") && (
                <div className="ds-rows">
                  {(section as DeliverySection).rows.map((row, rIdx) => (
                    <div key={rIdx} className="ds-row">
                      <span className="ds-check-icon">
                        <CheckIcon />
                      </span>
                      <span className="ds-row-text">{row.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Payment — rich layout */}
              {section.id === "payment" && (() => {
                const p = section as PaymentSection;
                return (
                  <div>
                    <p className="ds-sub-heading">{p.tradeCreditTitle}</p>
                    <p className="ds-body-text">{p.tradeCreditText}</p>

                    <p className="ds-sub-heading ds-sub-heading--mt">{p.paymentOptionsTitle}</p>
                    <p className="ds-body-text">{p.paymentOptionsText}</p>

                    <div className="ds-logos-row">
                      <Image
                        src="/payment-gatway.webp"
                        alt="Payment gateway logos"
                        className="payment-gateway"
                        width={450}
                        height={60}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>

                    <p className="ds-body-text ds-body-text--mt">
                      {p.footerText}{" "}
                      <a href={p.footerLinkHref} className="ds-link">
                        {p.footerLinkText}
                      </a>
                      .
                    </p>
                  </div>
                );
              })()}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}