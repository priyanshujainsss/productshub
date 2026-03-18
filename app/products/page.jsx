"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import ProductFilters from "../components/productFilters";
import axios from "axios";
import Loader from "../components/Loader";
import { useSearchParams } from "next/navigation";

const LIMIT = 8;

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    brands: [],
  });
  const searchParams = useSearchParams();
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let skip = (page - 1) * LIMIT;
      let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

      if (filters.category) {
        url = `https://dummyjson.com/products/category/${filters.category}`;
        if (page > 1) {
          url = `https://dummyjson.com/products/category/${filters.category}?limit=${LIMIT}&skip=${skip}`;
        }
      }

      const res = await axios.get(url);

      let data = res.data.products;
      let filteredData = res.data.products;

      if (filters.minPrice) {
        filteredData = filteredData.filter(
          (p) => p.price >= Number(filters.minPrice),
        );
      }

      if (filters.maxPrice) {
        filteredData = filteredData.filter(
          (p) => p.price <= Number(filters.maxPrice),
        );
      }

      if (filters.brands.length) {
        filteredData = filteredData.filter((p) =>
          filters.brands.includes(p.brand),
        );
      }

      setProducts(data);
      setfilteredProducts(filteredData);
      setTotal(res.data.total || data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const brands = searchParams.get("brands")?.split(",") || [];

    setFilters({
      category,
      minPrice,
      maxPrice,
      brands,
    });

    setIsInitialized(true);
  }, [searchParams]);
  useEffect(() => {
    if (!isInitialized) return;

    fetchProducts();
  }, [page, filters, isInitialized]);

  const handleFilterChange = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="p-6 flex gap-6">
      <div className="w-1/4">
        <ProductFilters
          products={products}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="w-3/4">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(filters?.minPrice != "" ||
              filters?.maxPrice != "" ||
              filters?.brands?.length != 0
                ? filteredProducts
                : products
              ).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products?.length != 0 && totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
