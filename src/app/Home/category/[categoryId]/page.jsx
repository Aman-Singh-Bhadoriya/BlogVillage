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
        setDescription(category.description || "");
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
    <div className="lg:py-12 md:py-5 lg:px-18 md:px-5 bg-gray-50 ">
      <div className="text-center lg:mb-12 mb-8">
        <h1 className="lg:text-3xl text-3xl mt-6 font-bold text-gray-700 ">
          {categoryTitle}
        </h1>
        {description && (
          <p className="text-gray-600 lg:text-xl text-xl  mt-2 mx-auto">{description}</p>
        )}
      </div>

      <div className="py-6 lg:px-32 px-6 flex flex-col gap-6">
        {blogs.slice(0, visibleCount).map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </div>
  );
}
