"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import PostForm from "./PostForm";
import { useAuth } from "../../context/AuthContext";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { user } = useAuth();

  // ✅ Function to fetch posts
  const fetchPosts = async () => {
    if (user) {
      try {
        const q = query(collection(db, "posts"), where("authorId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const postList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  // ✅ Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, [user]);

  // ✅ Handle Post Deletion
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  // ✅ Handle Post Creation/Update
  const handlePostCreatedOrUpdated = async () => {
    setShowForm(false);
    setEditingPost(null);
    await fetchPosts(); // ✅ Refresh posts after creation or update
  };

  // ✅ Handle Editing Post
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  return (
    <div className="p-5">
      {/* ✅ Header with New Post Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPost(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {/* ✅ New Post Form */}
      {showForm && (
        <PostForm
          onPostCreated={handlePostCreatedOrUpdated}
          post={editingPost}
        />
      )}

      {/* ✅ Table for Previous Posts */}
      <div className="overflow-x-auto mt-5">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Image
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id} className="border-b">
                  {/* ✅ Index */}
                  <td className="px-4 py-2">{index + 1}</td>

                  {/* ✅ Title */}
                  <td className="px-4 py-2">{post.title}</td>

                  {/* ✅ Content */}
                  <td className="px-4 py-2">
                    {post.content.length > 50
                      ? `${post.content.slice(0, 50)}...`
                      : post.content}
                  </td>

                  {/* ✅ Image */}
                  <td className="px-4 py-2">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-20 h-20 object-cover rounded-md"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=No+Image"; 
                        }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>

                  {/* ✅ Actions */}
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
