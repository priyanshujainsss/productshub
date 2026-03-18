"use client";

import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-green-600 font-bold text-xl mt-2">
          ₹{product.price}
        </p>

        <div className="flex items-center mt-2 text-yellow-500">
          <span className="mr-1">⭐</span>
          <span className="text-sm text-gray-600">{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
