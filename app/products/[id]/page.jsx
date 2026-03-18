"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.thumbnail);
      } catch (err) {
        setError(true);
        console.log("🚀 ~ fetchProduct ~ err:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (!product || loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black cursor-pointer"
      >
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-xl shadow"
          />

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  selectedImage === img ? "border-black" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

          <p className="text-gray-500 mt-1">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>

          <p className="text-gray-500">
            Category:{" "}
            <span className="font-medium capitalize">{product.category}</span>
          </p>

          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹{product.price}
          </p>

          <div className="flex items-center mt-2 text-yellow-500">
            ⭐ <span className="ml-1 text-gray-600">{product.rating}</span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        {product.reviews?.length ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{review.reviewerName}</h3>
                  <span className="text-yellow-500">⭐ {review.rating}</span>
                </div>

                <p className="text-sm text-gray-500">{review.reviewerEmail}</p>

                <p className="mt-2 text-gray-700">{review.comment}</p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews available</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
