"use client";

import { useEffect, useState } from "react";
import { getRelatedPosts } from "../api/getRelatedPosts";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export default function RelatedPosts({ categoryId, currentPostId }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (categoryId) {
        const data = await getRelatedPosts(categoryId, currentPostId);
        setRelatedPosts(data);
      }
    };

    fetchRelatedPosts();
  }, [categoryId, currentPostId]);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      {/* ✅ Section Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Related Posts</h2>

      {/* ✅ Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {relatedPosts.map((post) => (
          <div
            key={post.id}
            className="text-gray-600 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
          >
            {/* ✅ Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}

            {/* ✅ Card Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold">{post.title}</h3>

              <div
                className="text-gray-600 pt-2 line-clamp-2 flex-grow"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content), // ✅ Clean HTML here
                }}
              />

              {/* ✅ Read More Button Fixed at Bottom */}
              <div className="mt-auto">
                <button
                  onClick={() => router.push(`/Home/${post.slug}`)}
                  className="mt-4 w-full text-white bg-blue-700 font-medium hover:bg-blue-500 border px-4 py-2 rounded-lg transition"
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
