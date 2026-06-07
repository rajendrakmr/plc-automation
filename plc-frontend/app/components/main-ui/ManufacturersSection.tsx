"use client";

import Image from "next/image";
import Link from "next/link";

const manufacturers = [
  { name: "ABB", image: "/assets/items/abb.webp" },
  { name: "Fanuc", image: "/assets/items/abb.webp" },
  { name: "Indramat", image: "/assets/items/abb.webp" },
  { name: "Mitsubishi", image: "/assets/items/abb.webp" },
  { name: "Schneider", image: "/assets/items/abb.webp" },
  { name: "Siemens", image: "/assets/items/abb.webp" },
  { name: "B&R", image: "/assets/items/abb.webp" },
  {
    name: "Control Techniques",
    image: "/assets/items/abb.webp",
  },
  { name: "Omron", image: "/assets/items/abb.webp" },
  { name: "Yaskawa", image: "/assets/items/abb.webp" },
];

export default function ManufacturersSection() {
  return (
    <section className="section_white_content"> 
      <div className="section_container manufacturers-container"> 
        <div className="manufacturers-content">
          <h2 className="title">Manufacturers</h2>

          <p className="desc">
            We stock thousands of automation and control components from
            leading OEMs, all accessible to you from a single place. If it’s
            not in stock, our multilingual team will scour the globe to find
            you the part you need for the best price.
          </p>

          <Link href="/manufacturers" className="view-link">
            View all manufacturers
          </Link>
        </div>

        {/* RIGHT GRID */}
        <div className="manufacturers-grid">
          {manufacturers.map((item) => (
            <div className="manufacturer-card" key={item.name}>

              <div className="manufacturer-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="img"
                />
              </div>

              <h3 className="manufacturer-name">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}