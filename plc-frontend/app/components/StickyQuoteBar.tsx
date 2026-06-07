
import Link from "next/link";

interface StickyQuoteBarProps {
  visible: boolean;
  onQuoteClick: () => void;
  onDeleveryClick: () => void;
  onReviewClick: () => void;
  partNo: string;
}
export default function StickyQuoteBar({
  visible,
  onQuoteClick,
  onDeleveryClick,
  onReviewClick,
  partNo
}: StickyQuoteBarProps) {
  return (
    <div className={`sticky-quote-bar ${visible ? "show" : "hide"}`}>
      <div className="sticky-quote-inner">
        <div className="sticky-links">
          <h2>{partNo}</h2>
          <a href="#"
            onClick={(e) => {
              e.preventDefault();
              onDeleveryClick();
            }}>Delivery and payment</a>
          <span>|</span>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onReviewClick();
          }}>Reviews</a>
        </div>

        <div className="sticky-actions">
          <button onClick={onQuoteClick}>
            Get a Quote
          </button>

          <div className="sticky-links">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <Link href="tel:+6569808259">
                +65 6980 8259
              </Link>
              <span style={{ margin: "0 5px" }}>|</span>
              <Link href="tel:+61 421 000 214">
                AU: +61 421 000 214
              </Link>
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ margin: "0 5px" }}>|</span>

              <Link href="mailto:sales@plcautomat.com">
                sales@plcautomat.com
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}