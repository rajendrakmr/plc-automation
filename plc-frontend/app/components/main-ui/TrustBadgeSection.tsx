import Image from "next/image";

interface TrustBadge {
  icon: string;
  alt: string;
  label: string;
}

const badges: TrustBadge[] = [
  {
    icon: "/assets/plc_automation/Icon_new/plcautomation-global-delivery.svg",
    alt: "Global Delivery",
    label: "Global Delivery",
  },
  {
    icon: "/assets/plc_automation/Icon_new/plcautomation-genuine-parts.svg",
    alt: "12 Months Warranty",
    label: "12 Months Warranty",
  },
  {
    icon: "/assets/plc_automation/Icon_new/plcautomation-authenthic-product.svg",
    alt: "100% Authentic Parts",
    label: "100% Authentic Parts",
  },
  {
    icon: "/assets/plc_automation/Icon_new/plcautomation-same-day-dispatch.svg",
    alt: "Quick Dispatch",
    label: "Quick Dispatch",
  },
  {
    icon: "/assets/plc_automation/Icon_new/plcautomation-24_7-support.svg",
    alt: "24/7 Customer Support",
    label: "24/7 Customer Support",
  },
  {
    icon: "/assets/plc_automation/Icon_new/plcautomation-hassle-free-return.svg",
    alt: "Hassle-Free Return",
    label: "Hassle-Free Return",
  },
];

export default function TrustBadgeSection() {
  return (
    <div className="mmp-features">
      <ul>
        {badges.map((badge) => (
          <li key={badge.label}>
            <Image
              src={badge.icon}
              alt={badge.alt}
              width={16}
              height={16}
            />
            <span>{badge.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}