"use client";

import RelatedPosts from "./RelatedPosts";
import DOMPurify from "dompurify";

export default function BlogDetailsPage({ blog }) {
  if (!blog) {
    return <p className="text-center py-5 text-gray-700">Blog not found.</p>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.metaDescription || "Check out this blog!",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <div className="mx-auto font-merriweather text-gray-200">
      <div className="overflow-hidden px-32">
        <div className="px-32 py-6">
          <h1 className="text-5xl font-bold text-gray-700 font-inter mb-4">
            {blog.title}
          </h1>
          <div className="flex justify-between items-center text-gray-500 mb-4 border-b border-b-gray-700 px-1 pb-2">
            <p className="text-sm">
              Date of Publish:{" "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown Date"}
            </p>

            <button
              onClick={handleShare}
              className="text-gray-700 hover:text-blue-500 transition"
              title="Share this post"
            >
              🔗
            </button>
          </div>
        </div>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title} 
            className="w-full h-full object-cover px-10"
          />
        )}
        <p className="text-center pt-4 text-gray-600"><u>Photo By: Aman Singh</u></p>

        <div className="px-32 py-6">
          <div
            className="prose max-w-none text-xl text-gray-600 leading-relaxed px-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          />
        </div>
      </div>

      <div className="mt-6 px-64">
        <RelatedPosts categoryId={blog.categoryId} currentPostId={blog.id} />
      </div>
    </div>
  );
}
