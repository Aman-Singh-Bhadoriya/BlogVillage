"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "../api/getBlogBySlug";
import { setPageMetadata } from "../api/setMetadata";
import BlogDetailsPage from "../components/BlogDetailsPage"; // ✅ Import from new file

export default function Page() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const data = await getBlogBySlug(slug);
        if (data) {
          setBlog({
            ...data,
            createdAt: data.createdAt?.seconds
              ? new Date(data.createdAt.seconds * 1000).toISOString()
              : null,
          });
        }
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  // ✅ Set metadata when blog is loaded
  useEffect(() => {
    if (blog) {
      setPageMetadata(blog);
    }
  }, [blog]);

  // ✅ Loading State
  if (loading) return <p className="text-center py-10">Loading...</p>;

  // ✅ Not Found State
  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  // ✅ Render BlogDetailsPage
  return <BlogDetailsPage blog={blog} />;
}
