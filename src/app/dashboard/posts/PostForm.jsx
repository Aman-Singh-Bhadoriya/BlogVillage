"use client";
import { useState } from "react";
import { db, storage } from "../../utils/firebase";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PostForm({ post, onPostCreated }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle File Change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // ✅ Upload Image and Save Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = post?.image || ""; // Keep existing image if not updated

      if (image) {
        // ✅ Upload image to Firebase Storage
        const imageRef = ref(storage, `posts/${Date.now()}-${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref); // ✅ Get download URL
      }

      if (post) {
        // ✅ Update Post (if post exists)
        await updateDoc(doc(db, "posts", post.id), {
          title,
          content,
          image: imageUrl,
        });
      } else {
        // ✅ Create New Post
        await addDoc(collection(db, "posts"), {
          title,
          content,
          image: imageUrl,
          authorId: post?.authorId || "",
        });
      }

      onPostCreated(); // ✅ Refresh after update/create
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ✅ Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-4 py-2 w-full"
        required
      />

      {/* ✅ Content */}
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded px-4 py-2 w-full"
        required
      />

      {/* ✅ File Upload */}
      <input
        type="file"
        onChange={handleFileChange}
        className="border rounded px-4 py-2 w-full"
      />

      {/* ✅ Display Existing Image */}
      {post?.image && (
        <img
          src={post.image}
          alt="Existing post"
          className="w-20 h-20 object-cover rounded-md"
        />
      )}

      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
