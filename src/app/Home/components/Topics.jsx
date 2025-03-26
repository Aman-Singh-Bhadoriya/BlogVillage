"use client";

import { useState } from "react";
import { useCategories } from "../api/useCategories";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

export default function Topics() {
  const { categories, loading } = useCategories();
  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading categories...</p>;
  }

  return (
    <div className="px-32 bg- py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Explore Topics
        </h2>
        <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto mb-12">
          Discover content organized by topics that interest you the most
        </p>
      </div>

      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.slice(0, Math.min(visibleCount)).map((category, index) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            description={category.description || "No description available"}
            className={`p-6 rounded-lg shadow-md transition-all duration-300 ${
              index % 2 === 0 ? "bg-[#5d83d3]" : "bg-[#72a14c]"
            }`}
            icon={
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-xl"
              />
            }
            link={`/Home/category/${category.id}`} // Change the link to use category.id instead of category.title
          />
        ))}
      </div>

      <div className="flex justify-center ">
        <Link
          href="/Home/category"
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg mb-12 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          View All Topics
        </Link>
      </div>
    </div>
  );
}
