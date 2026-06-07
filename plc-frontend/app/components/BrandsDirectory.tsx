"use client"
import { useMemo, useState } from "react";
import "./css/BrandsDirectory.css";

const manufacturers = [
  "ABB",
  "AEG",
  "Alstom",
  "Bosch",
  "Cisco",
  "Delta",
  "Eaton",
  "Fanuc",
  "GE",
  "Hitachi",
  "Honeywell",
  "Lenze",
  "Mitsubishi",
  "Omron",
  "Panasonic",
  "Rockwell",
  "Schneider Electric",
  "Siemens",
  "Yaskawa",
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const BrandsDirectory = () => {
  const [activeLetter, setActiveLetter] = useState("A");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredManufacturers = useMemo(() => {
    return manufacturers.filter((manufacturer) => {
      const matchesLetter =
        manufacturer.charAt(0).toUpperCase() === activeLetter;

      const matchesSearch = manufacturer
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesLetter && matchesSearch;
    });
  }, [activeLetter, searchTerm]);

  return (
    <section className="directory">
      <div className="directory-container">
        <h2 className="directory-title">
          Directory of Manufacturers
        </h2> 
        {/* Desktop Alphabet */}
        <div className="alphabet-nav">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`letter-btn ${
                activeLetter === letter ? "active" : ""
              }`}
              onClick={() => setActiveLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Mobile Select */}
        <select
          className="letter-select"
          value={activeLetter}
          onChange={(e) => setActiveLetter(e.target.value)}
        >
          {alphabet.map((letter) => (
            <option key={letter} value={letter}>
              {letter}
            </option>
          ))}
        </select>

        {/* Header */}
        <div className="directory-header">
          <div>
            <h3>{activeLetter}</h3>
            <span className="underline"></span>
          </div>

          <button
            className="view-all"
            onClick={() => {
              setSearchTerm("");
            }}
          >
            View all manufacturers
          </button>
        </div>

        {/* Grid */}
        <div className="manufacturer-grid">
          {filteredManufacturers.length > 0 ? (
            filteredManufacturers.map((manufacturer) => (
              <div
                key={manufacturer}
                className="manufacturer-card"
              >
                {manufacturer}
              </div>
            ))
          ) : (
            <p className="empty-state">
              No manufacturers found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandsDirectory;