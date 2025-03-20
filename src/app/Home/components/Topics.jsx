"use client";

import { useState } from "react";
import { useCategories } from "../api/useCategories";
import CategoryCard from "./CategoryCard";

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
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Explore Topics
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover content organized by topics that interest you the most
        </p>
      </div>

      <div className="py-6 px-[80px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.slice(0, Math.min(visibleCount, 6)).map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            description={category.description || "No description available"}
            icon={
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            }
            link={`/${category.id}`}
          />
        ))}
      </div>

      {/* ✅ Show More Button */}
      {visibleCount < categories.length && (
        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
}
