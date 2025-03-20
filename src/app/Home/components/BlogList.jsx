"use client";

import { useEffect, useState } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import DOMPurify from "dompurify";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // ✅ Filter only posts with status "active"
        const q = query(
          collection(db, "posts"),
          where("status", "==", "active")
        );
        const querySnapshot = await getDocs(q);

        const blogData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            content: data.content || "",
            image: data.image || "",
            slug: data.slug || "",
            categoryName: data.categoryName || "Uncategorized",
            readTime: data.readTime || "5 min read",
            author: data.author || "Unknown Author",
            authorImage: data.authorImage || null,
            createdAt: data.createdAt
              ? formatDate(data.createdAt.seconds * 1000)
              : "Unknown Date", // ✅ Format createdAt date
            date: data.date
              ? new Date(data.date.seconds * 1000).toLocaleDateString()
              : "Unknown Date",
          };
        });
        setBlogs(blogData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Date formatting helper function
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown Date";
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="py-6 px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.slice(0, visibleCount).map((blog) => (
        <div
          key={blog.id}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
        >
          {/* ✅ Blog Image */}
          {blog.image ? (
            <div className="relative h-[180px]">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* ✅ Blog Content */}
          <div className="p-6">
            {/* ✅ Category and Read Time */}
            <div className="flex items-center justify-between space-x-2 mb-3">
              <span
                className={`${
                  blog.categoryName === "Uncategorized"
                    ? "bg-red-400" // 🚨 Red for Uncategorized
                    : "bg-blue-100 dark:bg-green-900 text-white dark:text-blue-300"
                } text-s font-medium px-2.5 py-0.5 rounded-full`}
              >
                {blog.categoryName}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {blog.createdAt}
              </span>
            </div>

            {/* ✅ Blog Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
              {blog.title}
            </h3>

            {/* ✅ Blog Description */}
            <p
              className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-5"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content.slice(0, 120)) + "...",
              }}
            />

            {/* ✅ Author and Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {blog.authorImage ? (
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {blog.author}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {blog.date}
              </span>
            </div>
          </div>

          {/* ✅ Link Overlay */}
          <a
            href={`/Home/${blog.slug}`}
            className="absolute inset-0 z-10"
            aria-label={`Read more about ${blog.title}`}
          ></a>
        </div>
      ))}

      {/* ✅ Show More Button */}
      {visibleCount < blogs.length && (
        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-primary hover:bg-accent text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
