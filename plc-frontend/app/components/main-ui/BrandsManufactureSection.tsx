"use client";

import Image from "next/image";
import Link from "next/link";

const popularBrands = [
  { name: "ABB", image: "/assets/items/abb.webp", url: "/brands/abb" },
  { name: "Fanuc", image: "/assets/items/abb.webp", url: "/brands/fanuc" },
  { name: "Indramat", image: "/assets/items/abb.webp", url: "/brands/indramat" },
  { name: "Mitsubishi", image: "/assets/items/abb.webp", url: "/brands/mitsubishi" },
  { name: "Schneider", image: "/assets/items/abb.webp", url: "/brands/schneider" },
  { name: "Siemens", image: "/assets/items/abb.webp", url: "/brands/siemens" },
  { name: "B&R", image: "/assets/items/abb.webp", url: "/brands/br" },
];

export default function BrandsManufactureSection() {
  return (
    <section className="section_white_content">
      <div className="section_container manufacturers-container">

        {/* LEFT CONTENT */}
        <div className="manufacturers-content">
          <h2 className="title">Manufacturers</h2>
        </div>

        {/* RIGHT GRID */}
        <div className="manufacturers-container-grid ">
          <div className="rk_mega_right">
            <p className="rk_mega_desc">
              We supply an extensive catalogue of automation and control equipment from over 100 of the world’s leading parts manufacturers, with many qualifying for same or next day delivery.
            </p>


          </div>
        </div>
        <div className="rk_brands_grid">
          {popularBrands.slice(0, 5).map((brand) => (
            <Link
              href={brand.url}
              key={brand.url}
              className="rk_mega_card"
            >
              <div className="rk_mega_card_img">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="rk_mega_card_info">
                <span className="rk_mega_card_name">
                  {brand.name}
                </span>

                <span className="rk_mega_card_cta">
                  View all parts
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


