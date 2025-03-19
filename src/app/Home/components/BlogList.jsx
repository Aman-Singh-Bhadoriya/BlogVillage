"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import DOMPurify from "dompurify";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const blogData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="py-6 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.slice(0, visibleCount).map((blog) => (
        <div
          key={blog.id}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          {/* ✅ Blog Image */}
          {blog.image ? (
            <div className="relative h-48">
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
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {blog.category || "Uncategorized"}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {blog.readTime || "5 min read"}
              </span>
            </div>

            {/* ✅ Blog Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
              {blog.title}
            </h3>

            {/* ✅ Blog Description */}
            <p
              className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-5 "
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
                  {blog.author || "Unknown Author"}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {blog.date || "Unknown Date"}
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
