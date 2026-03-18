import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Products Hub
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Explore a wide range of products with filters, reviews, and more.
        </p>

        {/* CTA Button */}
        <Link href="/products">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Visit Products
          </button>
        </Link>
      </div>
    </div>
  );
}