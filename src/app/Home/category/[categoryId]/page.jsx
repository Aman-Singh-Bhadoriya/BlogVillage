"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCategories } from "../../api/useCategories";
import { fetchBlogsByCategory } from "../../api/fetchBlogsByCategory";
import BlogCard from "../../components/BlogCard"; // ✅ Import BlogCard Component

export default function CategoryBlogsPage() {
  const { categoryId } = useParams();
  const { categories, loading: categoriesLoading } = useCategories();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState("Unknown Category");
  const [description, setDescription] = useState(""); // ✅ Add description state
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (categories.length > 0) {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
        setCategoryTitle(category.name);
        setDescription(category.description || ""); // ✅ Set category description
      }
    }
  }, [categories, categoryId]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const categoryBlogs = await fetchBlogsByCategory(categoryId);
        setBlogs(categoryBlogs);
      } catch (error) {
        console.error("Error fetching category blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    getBlogs();
  }, [categoryId]);

  if (categoriesLoading || loading) {
    return <p className="text-center text-gray-500">Loading blogs...</p>;
  }

  return (
    <div className="py-12 px-18 bg-gray-50 dark:bg-neutral-900">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {categoryTitle}
        </h1>
        {description && ( // ✅ Only show if description exists
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      <div className="py-6 px-8 flex flex-col gap-6">
        {blogs.slice(0, visibleCount).map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </div>
  );
}
