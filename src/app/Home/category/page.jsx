"use client";

import { useState } from "react";
import { useCategories } from "../api/useCategories";
import CategoryCard from "../components/CategoryCard";

export default function Page() {
  const { categories, loading } = useCategories();
  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading categories...</p>;
  }
  // console.log(category);

  return (
    <div className="py-12 bg-gray-50 dark:bg-neutral-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          All Category's
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Discover content organized by topics that interest you the most
        </p>
      </div>

      <div className="py-6 lg:px-[80px] px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.slice(0, Math.min(visibleCount)).map((category, index) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            description={category.description || "No description available"}
            className={`p-6 rounded-lg shadow-md transition-all duration-300 ${
              index % 2 === 0
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-green-100 dark:bg-green-900/30"
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
    </div>
  );
}
