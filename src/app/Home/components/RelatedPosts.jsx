"use client";

import { useEffect, useState } from "react";
import { getRelatedPosts } from "../api/getRelatedPosts";
import { useRouter } from "next/navigation";

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
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-500 line-clamp-2">{post.content}</p>
              <button
                onClick={() => router.push(`/blog/${post.slug}`)}
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
