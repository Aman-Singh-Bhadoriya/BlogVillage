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
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      
      {/* ✅ Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* ✅ Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              {/* ✅ Post Title */}
              <h3 className="text-lg font-bold">{post.title}</h3>

              {/* ✅ Post Content with HTML Filtering */}
              <div
                className="text-gray-500 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content), // ✅ Clean HTML here
                }}
              />

              {/* ✅ Read More Button */}
              <button
                onClick={() => router.push(`/Home/${post.slug}`)}
                className="mt-4 text-blue-500 hover:underline"
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
