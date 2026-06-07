"use client";

import { useState, useMemo } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Siemens PLC S7-300", brand: "Siemens", price: "$1200", image: "/assets/1.jpg" },
  { id: 2, name: "ABB Drive ACS580", brand: "ABB", price: "$980", image: "/assets/2.jpg" },
  { id: 3, name: "Allen Bradley PLC", brand: "Allen Bradley", price: "$1500", image: "/assets/3.jpg" },
  { id: 4, name: "Schneider HMI", brand: "Schneider", price: "$600", image: "/assets/4.jpg" },
  { id: 5, name: "Mitsubishi Servo", brand: "Mitsubishi", price: "$1100", image: "/assets/5.jpg" },
  { id: 6, name: "Omron Sensor", brand: "Omron", price: "$250", image: "/assets/6.jpg" },
  { id: 7, name: "Fanuc CNC", brand: "Fanuc", price: "$2000", image: "/assets/7.jpg" },
  { id: 8, name: "Yaskawa Drive", brand: "Yaskawa", price: "$900", image: "/assets/8.jpg" },
];

const ITEMS_PER_PAGE = 6;

export default function ProductListSection() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Brand counts
  const brandCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.brand] = (map[p.brand] || 0) + 1;
    });
    return map;
  }, []);

  // ✅ Brand list
  const brands = useMemo(
    () => ["All", ...Object.keys(brandCounts)],
    [brandCounts]
  );

  // ✅ Filter logic (brand + search)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchBrand =
        selectedBrand === "All" || p.brand === selectedBrand;

      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());

      return matchBrand && matchSearch;
    });
  }, [selectedBrand, search]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  return (
    <section className="product-section">
      <div className="product-inner">

        {/* LEFT SIDEBAR */}
        <aside className="product-sidebar">
          <h3>Brands</h3>

          {brands.map((brand) => (
            <button
              key={brand}
              className={selectedBrand === brand ? "active" : ""}
              onClick={() => {
                setSelectedBrand(brand);
                setCurrentPage(1);
              }}
            >
              {brand}
              <span className="count">
                {brand === "All"
                  ? products.length
                  : brandCounts[brand] || 0}
              </span>
            </button>
          ))}
        </aside>

        {/* RIGHT CONTENT */}
        <div className="product-content">

          {/* SEARCH + COUNT */}
          <div className="product-toolbar">
            <input
              type="text"
              placeholder="Enter Part Number, Manufacturer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <p className="result-count">
              {filteredProducts.length} parts found in this category
            </p>
          </div>

          {/* GRID VIEW */}
          <div className="product-grid">
            {paginatedProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <span className="brand">{p.brand}</span>
                <p className="price">{p.price}</p>
                <button className="view-btn">View Details →</button>
              </div>
            ))}
          </div>

          {/* TABLE VIEW (OPTIONAL) */}
          {/* Uncomment if needed */}
          {/*
          <table className="product-table">
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Manufacturer</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td className="in-stock">In Stock</td>
                  <td>
                    <button className="quote-btn">
                      Request For Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          */}

          {/* PAGINATION */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}