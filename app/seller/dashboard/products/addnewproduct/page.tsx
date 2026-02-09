"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function AddProductPage() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  // Form Data State
  const [productData, setProductData] = useState({
    // Basic Info
    productName: "",
    category: "",
    subCategory: "",
    description: "",
    
    // Pricing
    basePrice: "",
    discount: "",
    finalPrice: "",
    
    // Inventory
    sku: "",
    stockQuantity: "",
    lowStockAlert: "5",
    
    // Shipping
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    shippingClass: "standard",
    
    // Images
    images: [] as File[],
    
    // Additional
    tags: [] as string[],
    materials: "",
    handmadeProcess: "",
    customizationAvailable: false,
    returnPolicy: "7days",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTag, setCurrentTag] = useState("");

  // ============================================
  // CATEGORIES DATA
  // ============================================
  const categories = [
    { 
      name: "Home Decor", 
      subcategories: ["Wall Art", "Vases", "Candle Holders", "Sculptures", "Mirrors", "Clocks"]
    },
    { 
      name: "Kitchenware", 
      subcategories: ["Plates", "Bowls", "Cups & Mugs", "Serving Dishes", "Utensils", "Storage Jars"]
    },
    { 
      name: "Textiles & Fabrics", 
      subcategories: ["Cushion Covers", "Table Runners", "Curtains", "Bed Covers", "Rugs", "Towels"]
    },
    { 
      name: "Jewelry & Accessories", 
      subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Bags", "Scarves"]
    },
    { 
      name: "Pottery & Ceramics", 
      subcategories: ["Planters", "Decorative Pots", "Clay Figurines", "Tiles", "Tea Sets"]
    },
    { 
      name: "Wood Crafts", 
      subcategories: ["Furniture", "Toys", "Decorative Items", "Kitchen Items", "Boxes"]
    },
    { 
      name: "Art & Paintings", 
      subcategories: ["Canvas Art", "Framed Prints", "Wall Hangings", "Miniature Art"]
    },
    { 
      name: "Storage & Organization", 
      subcategories: ["Baskets", "Boxes", "Shelves", "Organizers"]
    },
  ];

  const selectedCategory = categories.find(cat => cat.name === productData.category);

  // ============================================
  // HANDLERS
  // ============================================
  const updateProductData = (field: string, value: any) => {
    setProductData(prev => ({ ...prev, [field]: value }));
    // Clear error when user updates field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file size and type
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Max 5MB per image.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file.`);
        return false;
      }
      return true;
    });

    // Limit to 5 images
    const currentImages = productData.images;
    const totalImages = currentImages.length + validFiles.length;
    
    if (totalImages > 5) {
      alert("Maximum 5 images allowed");
      const allowedFiles = validFiles.slice(0, 5 - currentImages.length);
      setProductData(prev => ({ ...prev, images: [...prev.images, ...allowedFiles] }));
    } else {
      setProductData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
    }
  };

  const removeImage = (index: number) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !productData.tags.includes(currentTag.trim())) {
      setProductData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // Calculate final price when base price or discount changes
  const calculateFinalPrice = () => {
    const base = parseFloat(productData.basePrice) || 0;
    const disc = parseFloat(productData.discount) || 0;
    const final = base - (base * disc / 100);
    updateProductData("finalPrice", final.toFixed(2));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic Info
    if (!productData.productName.trim()) newErrors.productName = "Product name is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.description.trim()) newErrors.description = "Description is required";

    // Pricing
    if (!productData.basePrice) newErrors.basePrice = "Price is required";
    else if (parseFloat(productData.basePrice) <= 0) newErrors.basePrice = "Price must be greater than 0";

    // Inventory
    if (!productData.stockQuantity) newErrors.stockQuantity = "Stock quantity is required";
    else if (parseInt(productData.stockQuantity) < 0) newErrors.stockQuantity = "Stock cannot be negative";

    // Images
    if (productData.images.length === 0) newErrors.images = "At least one product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Replace with actual API call
    console.log("Product Data:", productData);

    // Success
    alert("Product added successfully!");
    router.push("/seller/dashboard/products");
  };

  const handleDraft = () => {
    console.log("Saving as draft:", productData);
    alert("Product saved as draft!");
  };

  // ============================================
  // TABS CONFIGURATION
  // ============================================
  const tabs = [
    { name: "Basic Info", icon: "📝" },
    { name: "Pricing", icon: "💰" },
    { name: "Inventory", icon: "📦" },
    { name: "Images", icon: "🖼️" },
    { name: "Additional", icon: "✨" },
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Products</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details to list your handmade product
          </p>
        </div>

        {/* ============================================ */}
        {/* TABS NAVIGATION */}
        {/* ============================================ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`flex-1 min-w-[120px] px-4 py-4 text-sm md:text-base font-medium transition-all border-b-2 ${
                  currentTab === index
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* TAB CONTENT */}
        {/* ============================================ */}
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8"
        >
          {currentTab === 0 && <BasicInfoTab productData={productData} updateProductData={updateProductData} errors={errors} categories={categories} selectedCategory={selectedCategory} />}
          {currentTab === 1 && <PricingTab productData={productData} updateProductData={updateProductData} errors={errors} calculateFinalPrice={calculateFinalPrice} />}
          {currentTab === 2 && <InventoryTab productData={productData} updateProductData={updateProductData} errors={errors} />}
          {currentTab === 3 && <ImagesTab productData={productData} handleImageUpload={handleImageUpload} removeImage={removeImage} errors={errors} />}
          {currentTab === 4 && <AdditionalTab productData={productData} updateProductData={updateProductData} currentTag={currentTag} setCurrentTag={setCurrentTag} addTag={addTag} removeTag={removeTag} />}
        </motion.div>

        {/* ============================================ */}
        {/* FOOTER ACTIONS */}
        {/* ============================================ */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentTab(Math.max(0, currentTab - 1))}
              disabled={currentTab === 0}
              className="px-6 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              ← Previous
            </button>
            {currentTab < tabs.length - 1 && (
              <button
                onClick={() => setCurrentTab(Math.min(tabs.length - 1, currentTab + 1))}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md hover:shadow-lg"
              >
                Next →
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDraft}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              💾 Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Publishing...
                </span>
              ) : (
                "✨ Publish Product"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================ */
/* TAB COMPONENTS */
/* ============================================ */

// Basic Info Tab
function BasicInfoTab({ productData, updateProductData, errors, categories, selectedCategory }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Basic Information</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Essential details about your product</p>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          value={productData.productName}
          onChange={(e) => updateProductData("productName", e.target.value)}
          placeholder="e.g., Handmade Terracotta Vase"
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            errors.productName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          }`}
        />
        {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
      </div>

      {/* Category & Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={productData.category}
            onChange={(e) => {
              updateProductData("category", e.target.value);
              updateProductData("subCategory", ""); // Reset subcategory
            }}
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.category ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subcategory
          </label>
          <select
            value={productData.subCategory}
            onChange={(e) => updateProductData("subCategory", e.target.value)}
            disabled={!productData.category}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select subcategory</option>
            {selectedCategory?.subcategories.map((sub: string) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Description *
        </label>
        <textarea
          value={productData.description}
          onChange={(e) => updateProductData("description", e.target.value)}
          placeholder="Describe your product, its unique features, how it's made, materials used, etc."
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
            errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {productData.description.length} / 1000 characters
          </p>
        </div>
      </div>
    </div>
  );
}

// Pricing Tab
function PricingTab({ productData, updateProductData, errors, calculateFinalPrice }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Pricing</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Set your product pricing and discounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Base Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Base Price (₹) *
          </label>
          <input
            type="number"
            value={productData.basePrice}
            onChange={(e) => {
              updateProductData("basePrice", e.target.value);
              setTimeout(calculateFinalPrice, 0);
            }}
            placeholder="1200"
            min="0"
            step="0.01"
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.basePrice ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Discount (%)
          </label>
          <input
            type="number"
            value={productData.discount}
            onChange={(e) => {
              updateProductData("discount", e.target.value);
              setTimeout(calculateFinalPrice, 0);
            }}
            placeholder="10"
            min="0"
            max="100"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Final Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Final Price (₹)
          </label>
          <input
            type="text"
            value={productData.finalPrice ? `₹${productData.finalPrice}` : ""}
            readOnly
            placeholder="₹1080"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Pricing Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-400">
          <strong>💡 Pricing Tip:</strong> Consider material costs, labor time, and marketplace fees (10%) when setting your price. Competitive pricing helps attract more customers!
        </p>
      </div>
    </div>
  );
}

// Inventory Tab
function InventoryTab({ productData, updateProductData, errors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Inventory & Stock</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage product availability and stock levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SKU (Stock Keeping Unit)
          </label>
          <input
            type="text"
            value={productData.sku}
            onChange={(e) => updateProductData("sku", e.target.value.toUpperCase())}
            placeholder="VASE-001"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors uppercase"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unique identifier for inventory tracking</p>
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            value={productData.stockQuantity}
            onChange={(e) => updateProductData("stockQuantity", e.target.value)}
            placeholder="50"
            min="0"
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.stockQuantity ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>}
        </div>

        {/* Low Stock Alert */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Low Stock Alert Threshold
          </label>
          <input
            type="number"
            value={productData.lowStockAlert}
            onChange={(e) => updateProductData("lowStockAlert", e.target.value)}
            placeholder="5"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Get notified when stock falls below this number</p>
        </div>

        {/* Shipping Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={productData.weight}
            onChange={(e) => updateProductData("weight", e.target.value)}
            placeholder="0.5"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used for shipping cost calculation</p>
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dimensions (cm)
        </label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            value={productData.dimensions.length}
            onChange={(e) => updateProductData("dimensions", { ...productData.dimensions, length: e.target.value })}
            placeholder="Length"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <input
            type="number"
            value={productData.dimensions.width}
            onChange={(e) => updateProductData("dimensions", { ...productData.dimensions, width: e.target.value })}
            placeholder="Width"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <input
            type="number"
            value={productData.dimensions.height}
            onChange={(e) => updateProductData("dimensions", { ...productData.dimensions, height: e.target.value })}
            placeholder="Height"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Shipping Class */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Shipping Class
        </label>
        <select
          value={productData.shippingClass}
          onChange={(e) => updateProductData("shippingClass", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="standard">Standard Shipping</option>
          <option value="express">Express Shipping</option>
          <option value="fragile">Fragile / Special Handling</option>
          <option value="oversized">Oversized Item</option>
        </select>
      </div>
    </div>
  );
}

// Images Tab
function ImagesTab({ productData, handleImageUpload, removeImage, errors }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Product Images</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Upload high-quality images of your product (Max 5 images, 5MB each)</p>
      </div>

      {/* Upload Area */}
      <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        errors.images 
          ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
          : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-600 bg-gray-50 dark:bg-gray-700/50"
      }`}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
          disabled={productData.images.length >= 5}
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${productData.images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="text-6xl mb-4">📸</div>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            {productData.images.length >= 5 ? "Maximum images reached" : "Click to upload images"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            JPG, PNG, WEBP • Max 5MB per image • Up to 5 images
          </p>
        </label>
      </div>

      {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

      {/* Image Preview Grid */}
      {productData.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {productData.images.map((image: File, index: number) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-900 dark:text-yellow-400">
          <strong>📷 Photo Tips:</strong> Use natural lighting, show multiple angles, include size reference, avoid filters. High-quality images increase sales by up to 30%!
        </p>
      </div>
    </div>
  );
}

// Additional Tab
function AdditionalTab({ productData, updateProductData, currentTag, setCurrentTag, addTag, removeTag }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Additional Information</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Extra details to help customers understand your product better</p>
      </div>

      {/* Materials */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Materials Used
        </label>
        <input
          type="text"
          value={productData.materials}
          onChange={(e) => updateProductData("materials", e.target.value)}
          placeholder="e.g., Clay, Natural dyes, Cotton thread"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Handmade Process */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Handmade Process
        </label>
        <textarea
          value={productData.handmadeProcess}
          onChange={(e) => updateProductData("handmadeProcess", e.target.value)}
          placeholder="Describe how this product is made by hand..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Tags
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add tag (e.g., eco-friendly, handpainted)"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <button
            onClick={addTag}
            type="button"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
          >
            Add
          </button>
        </div>
        
        {/* Tags Display */}
        <div className="flex flex-wrap gap-2">
          {productData.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Customization Available */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="customization"
          checked={productData.customizationAvailable}
          onChange={(e) => updateProductData("customizationAvailable", e.target.checked)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="customization" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
          Customization available (customers can request modifications)
        </label>
      </div>

      {/* Return Policy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Return Policy
        </label>
        <select
          value={productData.returnPolicy}
          onChange={(e) => updateProductData("returnPolicy", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="7days">7 Days Return (Damaged/Defective only)</option>
          <option value="14days">14 Days Return</option>
          <option value="30days">30 Days Return</option>
          <option value="noreturn">No Returns (Final Sale)</option>
        </select>
      </div>
    </div>
  );
}
