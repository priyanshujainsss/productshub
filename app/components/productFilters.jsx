"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ProductFilters({ products, onFilterChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!products?.length) return;

    const uniqueBrands = [
      ...new Set(products.map((p) => p.brand).filter(Boolean)),
    ];

    setBrands(uniqueBrands);
  }, [products]);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const min = searchParams.get("minPrice") || "";
    const max = searchParams.get("maxPrice") || "";
    const brandsParam = searchParams.get("brands") || "";

    setSelectedCategory(category);
    setMinPrice(min);
    setMaxPrice(max);
    setSelectedBrands(brandsParam ? brandsParam.split(",") : []);
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (selectedBrands.length) {
      params.set("brands", selectedBrands.join(","));
    }

    router.replace(`/products?${params.toString()}`, { scroll: false });

    onFilterChange({
      category: selectedCategory,
      minPrice,
      maxPrice,
      brands: selectedBrands,
    });
  }, [selectedCategory, minPrice, maxPrice, selectedBrands]);

  return (
    <div className="p-4 bg-white shadow rounded-xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Filters</h2>

        <button
          onClick={() => {
            setSelectedCategory("");
            setMinPrice("");
            setMaxPrice("");
            setSelectedBrands([]);
          }}
          className="text-sm text-red-500"
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block font-medium">Category</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedBrands([]);
          }}
        >
          <option value="">All</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block font-medium">Price Range</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border p-2 rounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border p-2 rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {brands.length > 0 && (
        <div>
          <label className="block font-medium mb-2">Brands</label>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  selectedBrands.includes(brand)
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFilters;
