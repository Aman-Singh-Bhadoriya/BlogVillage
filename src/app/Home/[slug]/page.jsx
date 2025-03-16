"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "../api/getBlogBySlug";
import RelatedPosts from "../../Home/components/RelatedPosts";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const data = await getBlogBySlug(slug);
        if (data) {
          setBlog(data);
        }
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="text-gray-500 text-sm mb-4">
        {new Date(blog.createdAt).toLocaleDateString()} • {blog.views || 0} views
      </div>
      <p className="text-lg text-gray-700 leading-relaxed">{blog.content}</p>

      {/* ✅ Related Posts */}
      <RelatedPosts categoryId={blog.categoryId} currentPostId={blog.id} />
    </div>
  );
}
