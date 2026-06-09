"use client";

import Link from "next/link";
import Image from "next/image";
import { resources } from "@/app/data/content";
import { usePathname } from "next/navigation";
import SearchSection from "../SearchSection";
import BrandMegaMenuSection from "@/app/components/BrandMegaMenuSection";
import ResourceMegaMenuSection from "@/app/components/ResourceMegaMenuSection";
import { useEffect, useRef, useState } from "react";
const popularBrands = [
  { name: "ABB", image: "/assets/items/abb.webp", url: "/brands/abb" },
  { name: "Fanuc", image: "/assets/items/abb.webp", url: "/brands/fanuc" },
  { name: "Indramat", image: "/assets/items/abb.webp", url: "/brands/indramat" },
  { name: "Mitsubishi", image: "/assets/items/abb.webp", url: "/brands/mitsubishi" },
  { name: "Schneider", image: "/assets/items/abb.webp", url: "/brands/schneider" },
  { name: "Siemens", image: "/assets/items/abb.webp", url: "/brands/siemens" },
  { name: "B&R", image: "/assets/items/abb.webp", url: "/brands/br" },
];

const blogs = [
  {
    name: "How PLC Automation Works",
    image: "/assets/engineering-services-1.jpg",
    url: "/blog/plc-automation"
  },
  {
    name: "Top 5 Siemens PLC Tips",
    image: "/assets/engineering-services-2.jpg",
    url: "/blog/siemens-tips"
  },
  {
    name: "Troubleshooting Drives",
    image: "/assets/engineering-services-5.jpg",
    url: "/blog/drives-troubleshooting"
  },
  {
    name: "Industrial IoT Guide",
    image: "/assets/engineering-services-3.jpg",
    url: "/blog/iiot-guide"
  }
];


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  const pathname = usePathname();
  const closeMobileNav = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMobileNav = () => {
    setIsOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };



  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  // searched results
  const [results, setResults] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // default suggestions
  const defaultSuggestions = [
    "Please try to be as accurate as possible with the part number or description",
    "We can quote 1000s of parts, here are some popular searches",
  ];

  // close outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      const filtered = defaultSuggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filtered);

      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // click item
  const handleSelect = (item: string) => {
    setQuery(item);

    setOpen(false);

    console.log("Selected:", item);

    // router.push(`/search?q=${item}`)
  };

  // show matching results if available
  // otherwise show default suggestions
  const displayItems =
    results.length > 0 ? results : defaultSuggestions;

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

            {/* LEFT LINKS */}
            <div className="rk_topbar_links">
              <Link href="/about-us">About Us</Link>

              <Link href="/contact-us">Contact Us</Link>

              <Link href="/faq">FAQs</Link>
            </div>

            {/* SOCIAL ICONS */}
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

            {/* LOGO */}
            <Link className="logo brand-logo" href="/">
              <Image
                src="/assets/clogo.png"
                alt="PLC Automation"
                width={290}
                height={60}
              />
            </Link>

            {/* NAV */}
            <nav className="rk_nav_wrap">
              <ul className="nav-list">

                {/* LEFT MENU */}
                <div className="rk_nav_left">

                  {/* MANUFACTURERS */}
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

                    <BrandMegaMenuSection popularBrands={popularBrands} />
                  </li>

                  {/* RESOURCES */}
                  <li className="nav-item rk_has_mega">
                    <Link className="nav-link" href="#">
                      Resources
                      <svg viewBox="0 0 10 6">
                        <path d="M0 0l5 6 5-6z" />
                      </svg>
                    </Link>

                    <ResourceMegaMenuSection resources={resources} popularBrands={blogs} />
                  </li>

                  {/* OFFER PRODUCT */}

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

                  <div
                    className={`rk_expand_search ${open ? "active" : ""
                      }`}
                    ref={wrapperRef}
                  >
                    {/* ICON */}
                    <div className="rk_expand_search_icon">
                      <svg viewBox="0 0 20 20">
                        <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zm-.82-1.16a6 6 0 10-8.49-8.49 6 6 0 008.49 8.49z" />
                      </svg>
                    </div>

                    {/* INPUT */}
                    <input
                      type="text"
                      placeholder="Search Part Number"
                      value={query}
                      onFocus={() => setOpen(true)}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                      }}
                      className="rk_expand_search_input"
                    />

                    {/* DROPDOWN */}
                    {open && (
                      <div className="rk_expand_dropdown">
                        {loading ? (
                          <div className="rk_expand_dropdown_item">
                            Searching...
                          </div>
                        ) : (
                          <>
                            {results.length > 0 && (
                              <div className="rk_expand_dropdown_title">
                                Matching Results
                              </div>
                            )}

                            <ul className="rk_expand_dropdown_list">
                              {displayItems.map((item, index) => (
                                <li
                                  key={index}
                                  className="rk_expand_dropdown_item"
                                  onClick={() =>
                                    handleSelect(item)
                                  }
                                >
                                  <span className="rk_expand_dot">
                                    •
                                  </span>

                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>



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

          <div className="mob-search">
            <input
              type="text"
              placeholder="Search part number..."
            />
          </div>

        </header>

        {/* MOBILE OVERLAY */}
        {/* MOBILE NAV */}
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

                {popularBrands.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={closeMobileNav}
                  >
                    {item.name}
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

              <div
                className={`mob-submenu ${openMenu === "resources" ? "open" : ""
                  }`}
              >

                {blogs.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={closeMobileNav}
                  >
                    {item.name}
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