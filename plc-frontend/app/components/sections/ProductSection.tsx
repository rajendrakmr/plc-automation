"use client";
import { useState } from "react";
import CardProductItem from "./common/CardProductItem";
import { catalogProducts } from "@/app/data/content";

export default function ProductSection() {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const filteredProducts =
    selectedBrand === "All"
      ? catalogProducts
      : catalogProducts.filter((p) => p.brand === selectedBrand);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="product-section">
      <div className="product-container">

        {/* FILTER */}
        <aside className="product-filter">
          <h3>Filter</h3>

          <div className="filter-group">
            <label>Brand</label>
            <select
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1); // reset page
              }}
            >
              <option value="All">All</option>
              <option value="Siemens">Siemens</option>
              <option value="ABB">ABB</option>
              <option value="Allen Bradley">Allen Bradley</option>
              <option value="Schneider">Schneider</option>
              <option value="Omron">Omron</option>
              <option value="Fanuc">Fanuc</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Yaskawa">Yaskawa</option>
            </select>
          </div>

          <button className="filter-btn">Apply Filters</button>
        </aside>

        {/* PRODUCTS */}
        <div className="product-list">
          <div className="product-grid">

            <CardProductItem products={catalogProducts} />

          </div>

          {/* PAGINATION */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
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