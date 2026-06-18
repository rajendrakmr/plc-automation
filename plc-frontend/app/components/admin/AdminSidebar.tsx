'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Factory,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';
const menuSections = [
  {
    title: "General",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Enquiries", href: "/admin/enquiries", badge: 12, icon: FileText },
      // { label: "Orders", href: "/admin/orders", badge: 5, icon: ShoppingCart },
    ],
  },
  {
    title: "Catalogue",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      // { label: "Brands", href: "/admin/brands", icon: Factory },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blog / Pages", href: "/admin/blogs", icon: FileText },
      // { label: "Offers & Deals", href: "/admin/offers", icon: BarChart3 },
    ],
  },
  // {
  //   title: "System",
  //   items: [
  //     { label: "Users & Roles", href: "/admin/users", icon: Users },
  //     { label: "Import Logs", href: "/admin/import-logs", icon: Settings },
  //     { label: "Settings", href: "/admin/settings", icon: Settings },
  //   ],
  // },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="admin-sidebar">
      <Link className="admin-logo" href="/">
        <Image
          src="/assets/clogo.png"
          alt="PLC Automation"
          width={300}
          height={70}
        />
      </Link>

      <nav className="admin-nav">
        {menuSections.map((section, i) => (
          <div key={i}>
            <div className="admin-nav-section">{section.title}</div>

            {section.items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`admin-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />

                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="admin-nav-badge">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}