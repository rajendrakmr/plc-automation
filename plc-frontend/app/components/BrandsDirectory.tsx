// "use client"
// import { useMemo, useState, useEffect } from "react";
// import "./css/BrandsDirectory.css";
// import { useFetchData } from "../utils/useFetchData";
// // import { useFetchData } from "./hooks/useFetchData";

// const manufacturers = [
//   "ABB",
//   "AEG",
//   "Alstom",
//   "Bosch",
//   "Cisco",
//   "Delta",
//   "Eaton",
//   "Fanuc",
//   "GE",
//   "Hitachi",
//   "Honeywell",
//   "Lenze",
//   "Mitsubishi",
//   "Omron",
//   "Panasonic",
//   "Rockwell",
//   "Schneider Electric",
//   "Siemens",
//   "Yaskawa",
// ];
// interface Category {
//   category_id: number;
//   cat_name: string;
//   cat_slug: string;
// }

// const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// function useDebounce<T>(value: T, delay = 400): T {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const timer = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(timer);
//   }, [value, delay]);
//   return debounced;
// }
// const BrandsDirectory = () => {
//   const [activeLetter, setActiveLetter] = useState("A");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredManufacturers = useMemo(() => {

//     return manufacturers.filter((manufacturer) => {
//       const matchesLetter =
//         manufacturer.charAt(0).toUpperCase() === activeLetter;

//       const matchesSearch = manufacturer
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//       return matchesLetter && matchesSearch;
//     });
//   }, [activeLetter, searchTerm]);


//   const debouncedSearch = useDebounce(searchTerm, 400);
//   const { data: CATEGORIES, loading: catLoading } = useFetchData<Category[]>({
//     url: '/categories/list',
//     params: {
//       search: debouncedSearch || undefined,
//       // category_id: category_id || undefined,
//     },
//   });
//   return (
//     <section className="directory">
//       <div className="directory-container">
//         <h2 className="directory-title">
//           Directory of Manufacturers
//         </h2>
//         {/* Desktop Alphabet */}
//         <div className="alphabet-nav">
//           {alphabet.map((letter) => (
//             <button
//               key={letter}
//               className={`letter-btn ${activeLetter === letter ? "active" : ""
//                 }`}
//               onClick={() => setActiveLetter(letter)}
//             >
//               {letter}
//             </button>
//           ))}
//         </div>
//         <select
//           className="letter-select"
//           value={activeLetter}
//           onChange={(e) => setActiveLetter(e.target.value)}
//         >
//           {alphabet.map((letter) => (
//             <option key={letter} value={letter}>
//               {letter}
//             </option>
//           ))}
//         </select>
//         <div className="directory-header">
//           <div>
//             <h3>{activeLetter}</h3>
//             <span className="underline"></span>
//           </div>

//           <button
//             className="view-all"
//             onClick={() => {
//               setSearchTerm("");
//             }}
//           >
//             View all manufacturers
//           </button>
//         </div>
//         <div className="manufacturer-grid">
//           {CATEGORIES?.length > 0 ? (
//             CATEGORIES?.map((manufacturer) => (
//               <div
//                 key={manufacturer.category_id}
//                 className="manufacturer-card"
//               >
//                 {manufacturer.cat_name}
//               </div>
//             ))
//           ) : (
//             <p className="empty-state">
//               No manufacturers found.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BrandsDirectory;


"use client"
import { useState, useEffect } from "react";
import "./css/BrandsDirectory.css";
import { useFetchData } from "../utils/useFetchData";

interface Category {
  category_id: number;
  cat_name: string;
  cat_slug: string;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const BrandsDirectory = () => {
  const [activeLetter, setActiveLetter] = useState("A");

  const { data: categories, loading: catLoading } = useFetchData<Category[]>({
    url: '/categories/list',
    params: {
      search: activeLetter,
    }
  });

  return (
    <section className="directory">
      <div className="directory-container">
        <h2 className="directory-title">Directory of Manufacturers</h2> 
        <div className="alphabet-nav">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`letter-btn ${activeLetter === letter ? "active" : ""}`}
              onClick={() => setActiveLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div> 
        <select
          className="letter-select"
          value={activeLetter}
          onChange={(e) => setActiveLetter(e.target.value)}
        >
          {alphabet.map((letter) => (
            <option key={letter} value={letter}>{letter}</option>
          ))}
        </select>

        <div className="directory-header">
          <div>
            <h3>{activeLetter}</h3>
            <span className="underline"></span>
          </div>
        </div> 
        <div className="manufacturer-grid">
          {catLoading ? (
            <p className="empty-state">Loading...</p>
          ) : categories && categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat.category_id} className="manufacturer-card">
                {cat.cat_name}
              </div>
            ))
          ) : (
            <p className="empty-state">No manufacturers found.</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default BrandsDirectory;