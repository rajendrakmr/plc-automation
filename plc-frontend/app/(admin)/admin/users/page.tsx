import Link from "next/link";

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        sku: "WHP-001-BK",
        category: "Electronics",
        stock: 45,
        price: 299,
        image: "/assets/products/1712807183.jpg",
    },
    {
        id: 2,
        name: "Ergonomic Office Chair",
        sku: "CHR-442-GR",
        category: "Furniture",
        stock: 12,
        price: 450,
        image: "/assets/products/1712807183.jpg",
    },
];

export default function Products() {
    return (
        <div id="tab-products">

            {/* Header */}

            {/* Stats */}
            <div className="admin-stats">
                <div className="stat-card">
                    <span>Total Items</span>
                    <h3>1,284</h3>
                </div>
                <div className="stat-card">
                    <span>Out of Stock</span>
                    <h3>12</h3>
                </div>
                <div className="stat-card">
                    <span>Low Stock</span>
                    <h3>28</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="admin-filters">
                <div className="admin-page-header">

                    <button className="add-btn">+ Add Product</button>
                </div>

                <input placeholder="Search by name, SKU, or category..." />

                <button className="filter-btn">Category: All</button>
                {/* <button className="filter-btn">Stock: Descending</button> */}

                <button className="reset-btn">Reset Filters</button>
            </div>

            {/* Table */}
            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Product Details</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item) => (
                            <tr key={item.id}>

                                <td><input type="checkbox" /></td>

                                <td>
                                    <div className="product-info">
                                        <img src={item.image} className="product-img" />
                                        <div>
                                            <strong>{item.name}</strong>
                                            <p>{item.sku}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <span className="badge">{item.category}</span>
                                </td>

                                <td>{item.stock} <span className="muted">units</span></td>

                                <td>
                                    <span className={`status ${getStatusClass(item.stock)}`}>
                                        {getStatusText(item.stock)}
                                    </span>
                                </td>

                                <td className="price">${item.price}</td>

                                <td className="actions">
                                    ✏️ 🗑️
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

/* Helpers */
function getStatusText(stock: number) {
    if (stock === 0) return "Out of Stock";
    if (stock < 20) return "Low Stock";
    return "In Stock";
}

function getStatusClass(stock: number) {
    if (stock === 0) return "out-of-stock";
    if (stock < 20) return "low-stock";
    return "in-stock";
}