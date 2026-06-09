// "use client";

// import { useMemo, useState } from "react";
// import {
//     Button,
//     CardContent,
//     MenuItem,
//     Stack,
//     TextField,
//     Typography,
// } from "@mui/material";

// import { catalogProductPages } from "@/app/data/content";
// import PCCard from "@/app/components/sections/common/PCCard";

// export default function ProductCategory() {
//     const [manufacturer, setManufacturer] = useState("");
//     const [availability, setAvailability] = useState("");
//     const [search, setSearch] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);

//     const productsPerPage = 6;

//     /* ALL PRODUCTS */
//     const allProducts = useMemo(
//         () => catalogProductPages.flat(),
//         []
//     );

//     /* FILTER OPTIONS */
//     const manufacturerOptions = useMemo(
//         () =>
//             [...new Set(allProducts.map((p) => p.brand))]
//                 .filter(Boolean)
//                 .sort(),
//         [allProducts]
//     );

//     const availabilityOptions = useMemo(
//         () =>
//             [...new Set(allProducts.map((p) => p.status))]
//                 .filter(Boolean),
//         [allProducts]
//     );

//     /* FILTER PRODUCTS */
//     const filteredProducts = useMemo(() => {
//         return allProducts.filter((p) => {
//             const manufacturerMatch =
//                 !manufacturer ||
//                 p.brand === manufacturer;

//             const availabilityMatch =
//                 !availability ||
//                 p.status === availability;

//             const searchMatch =
//                 p.name
//                     ?.toLowerCase()
//                     .includes(search.toLowerCase()) ||
//                 p.partNumber
//                     ?.toLowerCase()
//                     .includes(search.toLowerCase()) ||
//                 p.brand
//                     ?.toLowerCase()
//                     .includes(search.toLowerCase());

//             return (
//                 manufacturerMatch &&
//                 availabilityMatch &&
//                 searchMatch
//             );
//         });
//     }, [
//         allProducts,
//         manufacturer,
//         availability,
//         search,
//     ]);

//     /* PAGINATION */
//     const totalPages = Math.ceil(
//         filteredProducts.length /
//         productsPerPage
//     );

//     const currentProducts = useMemo(() => {
//         const start =
//             (currentPage - 1) *
//             productsPerPage;

//         const end =
//             start + productsPerPage;

//         return filteredProducts.slice(
//             start,
//             end
//         );
//     }, [
//         filteredProducts,
//         currentPage,
//     ]);

//     /* RESET */
//     const resetFilters = () => {
//         setManufacturer("");
//         setAvailability("");
//         setSearch("");
//         setCurrentPage(1);
//     };

//     return (
//         <section className="rm_section">

//             <div className="rm_container">

//                 {/* LEFT FILTER */}
//                 <aside className="rm_filter">

//                     <CardContent>

//                         <Typography
//                             variant="h6"
//                             sx={{
//                                 mb: 3,
//                                 fontWeight: 700,
//                             }}
//                         >
//                             Filters
//                         </Typography>

//                         <Stack spacing={2}>

//                             <TextField
//                                 select
//                                 label="Manufacturer"
//                                 size="small"
//                                 value={manufacturer}
//                                 onChange={(e) => {
//                                     setManufacturer(
//                                         e.target.value
//                                     );
//                                     setCurrentPage(1);
//                                 }}
//                                 fullWidth
//                                 SelectProps={{
//                                     MenuProps: {
//                                         PaperProps: {
//                                             sx: {
//                                                 maxHeight: 300,
//                                                 "& .MuiMenuItem-root": {
//                                                     fontSize: "14px",
//                                                     minHeight: "32px",
//                                                     padding: "6px 12px"
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }}
//                             >
//                                 <MenuItem value="">
//                                     All
//                                 </MenuItem>

//                                 {manufacturerOptions.map(
//                                     (item) => (
//                                         <MenuItem
//                                             key={item}
//                                             value={item}
//                                         >
//                                             {item}
//                                         </MenuItem>
//                                     )
//                                 )}
//                             </TextField>

//                             <TextField
//                                 select
//                                 label="Availability"
//                                 size="small"
//                                 value={availability}
//                                 onChange={(e) => {
//                                     setAvailability(
//                                         e.target.value
//                                     );

//                                     setCurrentPage(1);
//                                 }}
//                                 fullWidth
//                             >
//                                 <MenuItem value="">
//                                     All
//                                 </MenuItem>

//                                 {availabilityOptions.map(
//                                     (item) => (
//                                         <MenuItem
//                                             key={item}
//                                             value={item}
//                                         >
//                                             {item}
//                                         </MenuItem>
//                                     )
//                                 )}
//                             </TextField>

//                             <TextField
//                                 label="Search"
//                                 size="small"
//                                 placeholder="Search product..."
//                                 value={search}
//                                 onChange={(e) => {
//                                     setSearch(
//                                         e.target.value
//                                     );

//                                     setCurrentPage(1);
//                                 }}
//                                 fullWidth
//                             />

//                             <Button
//                                 variant="contained"
//                                 onClick={
//                                     resetFilters
//                                 }
//                             >
//                                 Reset Filters
//                             </Button>

//                         </Stack>

//                     </CardContent>

//                 </aside>

//                 {/* RIGHT SIDE */}
//                 <div className="rm_content">

//                     <div className="rm_topbar">

//                         <div className="rm_count">

//                             Showing{" "}
//                             <strong>
//                                 {
//                                     filteredProducts.length
//                                 }
//                             </strong>{" "}
//                             products

//                         </div>

//                     </div>

//                     {filteredProducts.length >
//                         0 ? (
//                         <>
//                             <div className="rm_grid">

//                                 <PCCard
//                                     products={
//                                         currentProducts
//                                     }
//                                 />

//                             </div>

//                             {totalPages >
//                                 1 && (
//                                     <div className="rm_pagination">

//                                         {[...Array(
//                                             totalPages
//                                         )].map(
//                                             (
//                                                 _,
//                                                 i
//                                             ) => (
//                                                 <button
//                                                     key={
//                                                         i
//                                                     }
//                                                     className={
//                                                         currentPage ===
//                                                             i +
//                                                             1
//                                                             ? "active"
//                                                             : ""
//                                                     }
//                                                     onClick={() =>
//                                                         setCurrentPage(
//                                                             i +
//                                                             1
//                                                         )
//                                                     }
//                                                 >
//                                                     {i +
//                                                         1}
//                                                 </button>
//                                             )
//                                         )}

//                                     </div>
//                                 )}

//                         </>
//                     ) : (
//                         <div className="rm_empty">

//                             No products found

//                         </div>
//                     )}

//                 </div>

//             </div>

//         </section>
//     );
// }