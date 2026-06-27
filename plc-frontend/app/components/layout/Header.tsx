"use client";

import Link from "next/link";
import Image from "next/image";
import { resources } from "@/app/data/content";
import { usePathname } from "next/navigation";
import BrandMegaMenuSection from "@/app/components/BrandMegaMenuSection";
import ResourceMegaMenuSection from "@/app/components/ResourceMegaMenuSection";
import { useState } from "react";
import { useFetchData } from "@/app/utils/useFetchData";
import ExpandSearchSection from "../main-ui/ExpandSearchSection";
import MobSearchSection from "../main-ui/MobSearchSection";

interface Categories {
  category_id: number;
  cat_name: string;
  cat_slug: string;
  image_url: string;
}

export interface BlogCategory {
  blog_cat_id: number;
  blog_cat_name: string;
}

export interface Blog {
  blog_id: number;
  blog_title: string;
  blog_meta_title: string;
  blog_slug: string;
  blog_meta_desc: string;
  blog_excerpt: string;
  blog_meta_keywords: string;
  blog_content: string;
  blog_published_at: string | null;
  blog_img_url: string;
  blog_author: string;
  category: BlogCategory;
}

function truncate(str: string, words = 5) {
  const w = str.trim().split(/\s+/);
  return w.length <= words ? str : w.slice(0, words).join(" ") + "...";
}
 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { data: BLOGS, loading: BlogLoading } = useFetchData<Blog[]>({
    url: '/blogs/feature',
    params: {
      limit: 6,
      type: "header"
    },
  });

  const toggleSubmenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  const pathname = usePathname();
  const closeMobileNav = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };
  const { data: categories, loading: catLoading } = useFetchData<Categories[]>({
    url: '/categories/feature?type=popular',
    params: {
      limit: 10,
      type: "popular"
    },
  });
  const toggleMobileNav = () => {
    setIsOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };



  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <Image
                src="/assets/Icons/phone-plcautomationgroup.png"
                alt="Email Icon"
                width={20}
                height={20}
              />

              <Link href="tel:+6569808259">
                +65 6980 8259
              </Link>
              <span style={{ margin: "0 5px" }}>|</span>
              <Image
                src="/assets/Icons/phone-plcautomationgroup.png"
                alt="Email Icon"
                width={20}
                height={20}
              />
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
              <Image
                src="/assets/Icons/email-plcautomationgroup.png"
                alt="Email Icon"
                width={20}
                height={20}
              />

              <Link href="mailto:sales@plcautomat.com">
                sales@plcautomat.com
              </Link>
            </span>
          </div>

          <div className="rk_topbar_right">
            <div className="rk_topbar_links">
              <Link href="/about-us">About Us</Link>
              <Link href="/contact-us">Contact Us</Link>
              <Link href="/faq">FAQs</Link>
            </div>

            <div className="rk_social_icons">
              <Link href="https://www.reddit.com/user/plc_automation_2021/">
                <i className="fab fa-reddit"></i>
              </Link>
              <Link href="https://www.linkedin.com/company/78855232">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link href="https://www.instagram.com/plc_automation_2021/">
                <i className="fab fa-instagram"></i>
              </Link>

              <Link href="https://www.facebook.com/plcautomat">
                <i className="fab fa-facebook-f"></i>
              </Link>

              <Link href="https://youtube.com/@plcautomationgroup">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="site-header-wrap">
        <header className="rk_header_root">
          <div className="header-inner">
            <Link className="logo brand-logo" href="/">
              <Image
                src="/assets/clogo.png"
                alt="PLC Automation"
                width={290}
                height={60}
              />
            </Link>

            <nav className="rk_nav_wrap">
              <ul className="nav-list">
                <div className="rk_nav_left">
                  <li className="nav-item rk_has_mega">
                    <Link
                      className="nav-link"
                      href="#"
                    >
                      Manufacturers
                      <svg viewBox="0 0 10 6">
                        <path d="M0 0l5 6 5-6z" />
                      </svg>
                    </Link>
                    <BrandMegaMenuSection popularBrands={categories || []} />
                  </li>


                  <li className="nav-item rk_has_mega">
                    <Link className="nav-link" href="#">
                      Resources
                      <svg viewBox="0 0 10 6">
                        <path d="M0 0l5 6 5-6z" />
                      </svg>
                    </Link>
                    <ResourceMegaMenuSection resources={resources} />
                  </li>

                  {!open &&
                    <li
                      className={`nav-item ${pathname === "/offer-product-list"
                        ? "active"
                        : ""
                        }`}
                    >
                      <Link
                        className="nav-link"
                        href="/offer-product-list"
                      >
                        Offer Product
                      </Link>
                    </li>}
                </div>

                {/* RIGHT SEARCH */}
                <div className="rk_nav_right">
                  <ExpandSearchSection />
                </div>

              </ul>
            </nav>

            {/* MOBILE BTN */}
            {
              !isOpen ?
                <button
                  className="hamburger"
                  aria-label="Open menu"
                  onClick={toggleMobileNav}
                >
                  <span />
                  <span />
                  <span />
                </button> :
                <button
                  className="mobile-nav-close"
                  onClick={closeMobileNav}
                >
                  ✕
                </button>
            }




          </div>

          <MobSearchSection />

        </header>

        <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>


          <div className="mobile-nav-body">

            <Link
              href="/offer-product-list"
              className="mob-link"
              onClick={closeMobileNav}
            >
              Offer Product
            </Link>

            <Link
              href="/about-us"
              className="mob-link"
              onClick={closeMobileNav}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className="mob-link"
              onClick={closeMobileNav}
            >
              Contact Us
            </Link>

            {/* Manufacturers */}

            <div className="mob-menu-group">

              <button
                className="mob-dropdown-btn"
                onClick={() => toggleSubmenu("brands")}
              >
                Manufacturers
                <span>
                  {openMenu === "brands" ? "−" : "+"}
                </span>
              </button>

              <div
                className={`mob-submenu ${openMenu === "brands" ? "open" : ""
                  }`}
              >

                {categories?.map((item) => (
                  <Link
                    key={item?.category_id}
                    href={`/brands/${item.cat_slug}`}
                    onClick={closeMobileNav}
                  >
                    {item.cat_name}
                  </Link>
                ))}

              </div>

            </div>

            {/* Resources */}

            <div className="mob-menu-group">

              <button
                className="mob-dropdown-btn"
                onClick={() => toggleSubmenu("resources")}
              >
                Resources
                <span>
                  {openMenu === "resources" ? "−" : "+"}
                </span>
              </button>

              <div className={`mob-submenu ${openMenu === "resources" ? "open" : ""
                }`}
              >

                {BLOGS?.map((item) => (
                  <Link
                    key={item.blog_id}
                    href={`/blog/${item.blog_slug}`}
                    onClick={closeMobileNav}
                  >
                    {truncate(item.blog_title, 6)}
                  </Link>
                ))}

              </div>

              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <Image
                  src="/assets/Icons/phone-plcautomationgroup.png"
                  alt="Email Icon"
                  width={20}
                  height={20}
                />

                <Link href="tel:+6569808259,+61 421 000 214">
                  +65 6980 8259, AU: +61 421 000 214
                </Link>
              </span>
              <br />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Image
                  src="/assets/Icons/email-plcautomationgroup.png"
                  alt="Email Icon"
                  width={20}
                  height={20}
                />

                <Link href="mailto:sales@plcautomat.com">
                  sales@plcautomat.com
                </Link>
              </span>

            </div>


            <div className="eu-footer-social" style={{ marginTop: "20px", justifyContent: "center" }}>
              <Link href="https://www.reddit.com/user/plc_automation_2021/">
                <i className="fab fa-reddit"></i>
              </Link>
              <Link href="https://www.linkedin.com/company/78855232">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link href="https://www.instagram.com/plc_automation_2021/">
                <i className="fab fa-instagram"></i>
              </Link>

              <Link href="https://www.facebook.com/plcautomat">
                <i className="fab fa-facebook-f"></i>
              </Link>

              <Link href="https://youtube.com/@plcautomationgroup">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>


          </div>


        </nav>
      </div>
    </>
  );
}