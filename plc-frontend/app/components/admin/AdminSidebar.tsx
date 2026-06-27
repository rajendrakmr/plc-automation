'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FileText,
  ChevronDown,
  PlusCircle,
  List,
  Image as ImageIcon,
  HelpCircle,
  Home,
  Star,
  BookOpen,
  Phone,
} from 'lucide-react';

import "./sidemenu.css";

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: number;
  children?: SubItem[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Navigation",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      // { label: "Home Management", href: "/admin/home", icon: Home },
      // { label: "Banner Management", href: "/admin/banners", icon: ImageIcon },
      // {
      //   label: "Category Management",
      //   icon: List,
      //   children: [
      //     { label: "Add New Category", href: "/admin/categories/add" },
      //     { label: "Category Management", href: "/admin/categories" },
      //   ],
      // },
      {
        label: "Enquiries",
        href: "/admin/enquiries",
        icon: FileText, 
      },
      {
        label: "Product Management",
        icon: Package,
        children: [
          { label: "Add New Product", href: "/admin/products/add" },
          { label: "Product Management", href: "/admin/products" },
          { label: "Category", href: "/admin/products/category" },
          { label: "Feature", href: "/admin/products/feature" },
        ],
      },
      // { label: "Gallery Management", href: "/admin/gallery", icon: ImageIcon },
      {
        label: "Blog Management",
        icon: BookOpen,
        children: [
          { label: "Add New Blog", href: "/admin/blogs/add" },
          { label: "Blog Management", href: "/admin/blogs" },
          { label: "Category", href: "/admin/blogs/category" },
          { label: "Tag", href: "/admin/blogs/tag" },
          { label: "Feature", href: "/admin/blogs/feature" },
        ],
      },
      // { label: "Faq's Management", href: "/admin/faqs", icon: HelpCircle },
      // { label: "Contact Management", href: "/admin/contacts", icon: Phone },
      
    ],
  },
];

// ─── Single nav item (with optional submenu) ──────────────────────────────────
function NavItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();

  const isChildActive = item.children?.some((c) => pathname === c.href) ?? false;
  const [open, setOpen] = useState(isChildActive);

  const hasChildren = !!item.children?.length;
  const isActive = item.href ? pathname === item.href : isChildActive;
  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div className={`asb-group ${open ? 'asb-group--open' : ''}`}>
        <button
          className={`asb-nav-link asb-nav-link--parent ${isChildActive ? 'active' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <Icon size={17} className="asb-nav-icon" />
          <span className="asb-nav-label">{item.label}</span>
          <ChevronDown
            size={15}
            className={`asb-chevron ${open ? 'asb-chevron--open' : ''}`}
          />
        </button>

        {open && (
          <div className="asb-submenu">
            {item.children!.map((child) => {
              const childActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`asb-sub-link ${childActive ? 'active' : ''}`}
                >
                  <span className="asb-sub-dot" />
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={`asb-nav-link ${isActive ? 'active' : ''}`}
    >
      <Icon size={17} className="asb-nav-icon" />
      <span className="asb-nav-label">{item.label}</span>
      {item.badge && (
        <span className="asb-badge">{item.badge}</span>
      )}
    </Link>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <Link className="admin-logo" href="/">
        <Image
          src="/assets/clogo.png"
          alt="PLC Automation"
          width={300}
          height={70}
          style={{ width: '100%', height: 'auto' }}
        />
      </Link>

      <nav className="admin-nav">
        {menuSections.map((section, i) => (
          <div key={i}>
            <div className="admin-nav-section">{section.title}</div>
            {section.items.map((item, idx) => (
              <NavItem key={idx} item={item} />
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}