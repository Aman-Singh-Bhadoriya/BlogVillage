"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const blogData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogData);
    };
    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleReadMore = (slug) => {
    // console.log(slug);
    router.push(`/Home/${slug}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
      {blogs.slice(0, visibleCount).map((blog) => (
        <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <div
              className="text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content), // ✅ Clean HTML content
              }}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-400 text-sm">{blog.views || 0} views</span>
              <button
                onClick={() => handleReadMore(blog.slug)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
      {visibleCount < blogs.length && (
        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
