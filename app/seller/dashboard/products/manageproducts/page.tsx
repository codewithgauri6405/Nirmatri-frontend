"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";
import Link from "next/link";

export default function ManageProductsPage() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // ============================================
  // MOCK PRODUCTS DATA
  // ============================================
  const [products, setProducts] = useState([
    {
      id: "PROD-001",
      name: "Handmade Terracotta Vase",
      category: "Home Decor",
      price: 1200,
      stock: 45,
      status: "active",
      image: "🏺",
      sales: 128,
      rating: 4.8,
      dateAdded: "2025-12-15",
    },
    {
      id: "PROD-002",
      name: "Hand-painted Ceramic Plates Set",
      category: "Kitchenware",
      price: 1800,
      stock: 28,
      status: "active",
      image: "🍽️",
      sales: 95,
      rating: 4.9,
      dateAdded: "2026-01-10",
    },
    {
      id: "PROD-003",
      name: "Wooden Wall Art",
      category: "Art & Paintings",
      price: 980,
      stock: 12,
      status: "active",
      image: "🖼️",
      sales: 67,
      rating: 4.7,
      dateAdded: "2026-01-20",
    },
    {
      id: "PROD-004",
      name: "Handwoven Jute Basket",
      category: "Storage & Organization",
      price: 675,
      stock: 0,
      status: "outofstock",
      image: "🧺",
      sales: 142,
      rating: 4.6,
      dateAdded: "2025-11-05",
    },
    {
      id: "PROD-005",
      name: "Ceramic Dinner Set",
      category: "Kitchenware",
      price: 3200,
      stock: 18,
      status: "active",
      image: "🍴",
      sales: 54,
      rating: 5.0,
      dateAdded: "2026-01-25",
    },
    {
      id: "PROD-006",
      name: "Clay Pot Set",
      category: "Pottery & Ceramics",
      price: 2450,
      stock: 8,
      status: "lowstock",
      image: "🏺",
      sales: 89,
      rating: 4.8,
      dateAdded: "2025-12-28",
    },
    {
      id: "PROD-007",
      name: "Bamboo Serving Tray",
      category: "Kitchenware",
      price: 850,
      stock: 35,
      status: "active",
      image: "🎋",
      sales: 76,
      rating: 4.5,
      dateAdded: "2026-02-01",
    },
    {
      id: "PROD-008",
      name: "Embroidered Wall Hanging",
      category: "Textiles & Fabrics",
      price: 1500,
      stock: 22,
      status: "inactive",
      image: "🧵",
      sales: 34,
      rating: 4.4,
      dateAdded: "2025-10-12",
    },
  ]);

  // ============================================
  // FILTERS & SEARCH
  // ============================================
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  // ============================================
  // BULK ACTIONS
  // ============================================
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedProducts.length} products?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
      setShowBulkActions(false);
    }
  };

  const handleBulkStatusChange = (status: string) => {
    setProducts(products.map(p => 
      selectedProducts.includes(p.id) ? { ...p, status } : p
    ));
    setSelectedProducts([]);
    setShowBulkActions(false);
  };

  // ============================================
  // INDIVIDUAL ACTIONS
  // ============================================
  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleDuplicate = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const newProduct = {
        ...product,
        id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
        name: `${product.name} (Copy)`,
      };
      setProducts([...products, newProduct]);
    }
  };

  // ============================================
  // STATS
  // ============================================
  const stats = {
    total: products.length,
    active: products.filter(p => p.status === "active").length,
    lowStock: products.filter(p => p.status === "lowstock").length,
    outOfStock: products.filter(p => p.status === "outofstock").length,
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all your product listings
          </p>
        </div>

        {/* ============================================ */}
        {/* STATS CARDS */}
        {/* ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Products" value={stats.total} icon="🏺" color="blue" />
          <StatCard title="Active" value={stats.active} icon="✅" color="green" />
          <StatCard title="Low Stock" value={stats.lowStock} icon="⚠️" color="orange" />
          <StatCard title="Out of Stock" value={stats.outOfStock} icon="❌" color="red" />
        </div>

        {/* ============================================ */}
        {/* FILTERS & ACTIONS */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== "all").map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="lowstock">Low Stock</option>
              <option value="outofstock">Out of Stock</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={() => handleBulkStatusChange("active")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Mark Active
              </button>
              <button
                onClick={() => handleBulkStatusChange("inactive")}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Mark Inactive
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedProducts([])}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* PRODUCTS DISPLAY */}
        {/* ============================================ */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id)}
                onSelect={() => handleSelectProduct(product.id)}
                onDelete={() => handleDelete(product.id)}
                onDuplicate={() => handleDuplicate(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <ProductTable
              products={filteredProducts}
              selectedProducts={selectedProducts}
              onSelectAll={handleSelectAll}
              onSelect={handleSelectProduct}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <Link
              href="/seller/dashboard/products/add"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================ */
/* COMPONENTS */
/* ============================================ */

// Stat Card
function StatCard({ title, value, icon, color }: any) {
  const colorClasses: any = {
    blue: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20",
    green: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
    orange: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20",
    red: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}

// Product Card (Grid View)
function ProductCard({ product, isSelected, onSelect, onDelete, onDuplicate }: any) {
  const statusColors: any = {
    active: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    lowstock: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
    outofstock: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    inactive: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 overflow-hidden transition-all ${
      isSelected ? "border-blue-500 shadow-lg" : "border-gray-200 dark:border-gray-700"
    }`}>
      {/* Image & Checkbox */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-6xl">{product.image}</span>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-3 left-3 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded ${statusColors[product.status]}`}>
          {product.status.charAt(0).toUpperCase() + product.status.slice(1).replace("stock", " Stock")}
        </span>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Stock: {product.stock}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-yellow-500">⭐</span>
          <span className="text-gray-900 dark:text-white font-medium">{product.rating}</span>
          <span className="text-gray-500 dark:text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">{product.sales} sales</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/seller/dashboard/products/edit/${product.id}`}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg text-center transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={onDuplicate}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
            title="Duplicate"
          >
            📋
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

// Product Table (List View)
function ProductTable({ products, selectedProducts, onSelectAll, onSelect, onDelete, onDuplicate }: any) {
  const statusColors: any = {
    active: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    lowstock: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
    outofstock: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    inactive: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length && products.length > 0}
                onChange={onSelectAll}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Product</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Category</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Sales</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product: any) => (
            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => onSelect(product.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{product.image}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.category}</td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">₹{product.price}</td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.stock}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[product.status]}`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1).replace("stock", " Stock")}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{product.sales}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/seller/dashboard/products/edit/${product.id}`}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDuplicate(product.id)}
                    className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
