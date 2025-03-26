"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../../../utils/firebase";
import JoditEditor from "jodit-react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import SlugInput from "./component/SlugInput";
import DOMPurify from "dompurify";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState({ id: "", name: "" });
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [postId, setPostId] = useState(null);

  // ✅ Meta fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaTags, setMetaTags] = useState("");

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const editor = useRef(null);

  // ✅ Load post data and categories
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setPostId(id);
      loadPost(id);
    }

    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Load existing post data
  const loadPost = async (id) => {
    try {
      const postDoc = await getDoc(doc(db, "posts", id));
      if (postDoc.exists()) {
        const post = postDoc.data();

        setTitle(post.title);
        setSlug(post.slug || "");
        setContent(post.content || "");
        setImageUrl(post.image || "");
        setCategoryId({
          id: post.categoryId || "",
          name: post.categoryName || "",
        });
        setStatus(post.status || "");

        // ✅ Load meta fields correctly
        setMetaTitle(post.metaTitle || "");
        setMetaDescription(post.metaDescription || "");
        setMetaTags(post.metaTags?.join(", ") || "");
      }
    } catch (error) {
      console.error("Error loading post:", error);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !slug || !content || !categoryId.id || !status) {
      alert("All fields are required");
      return;
    }

    // ✅ Sanitize content before saving
    const sanitizedContent = DOMPurify.sanitize(content);

    try {
      if (postId) {
        // ✅ Update existing post
        await updateDoc(doc(db, "posts", postId), {
          title,
          slug,
          content: sanitizedContent,
          image: imageUrl,
          categoryId: categoryId.id,
          categoryName: categoryId.name,
          status,
          metaTitle,
          metaDescription,
          metaTags: metaTags.split(",").map((tag) => tag.trim()),
        });
      } else {
        // ✅ Create new post
        if (!user) {
          alert("You must be logged in to create a post");
          return;
        }

        await addDoc(collection(db, "posts"), {
          title,
          slug,
          content: sanitizedContent,
          image: imageUrl,
          categoryId: categoryId.id,
          categoryName: categoryId.name,
          status,
          metaTitle,
          metaDescription,
          metaTags: metaTags.split(",").map((tag) => tag.trim()),
          authorId: user.uid,
          authorEmail: user.email,
          createdAt: new Date(),
        });
      }

      alert("Post saved successfully!");
      router.push("/dashboard/posts");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to save post");
    }
  };

  // ✅ Handle cancel
  const handleCancel = () => {
    router.push("/dashboard/posts");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-2">
      {/* ✅ Title */}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />

      {/* ✅ Slug Component */}
      <SlugInput title={title} slug={slug} setSlug={setSlug} />

      {/* ✅ Content */}
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />

      {/* ✅ Image URL */}
      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
      />

      {/* ✅ Category & Status */}
      <Box display="flex" gap={2}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId.id || ""}
            onChange={(e) => {
              const selectedCategory = categories.find(
                (category) => category.id === e.target.value
              );
              setCategoryId({
                id: selectedCategory.id,
                name: selectedCategory.name,
              });
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* ✅ Meta Title */}
      <TextField
        label="Meta Title"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        fullWidth
      />

      {/* ✅ Meta Description */}
      <TextField
        label="Meta Description"
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />

      {/* ✅ Meta Tags */}
      <TextField
        label="Meta Tags (comma-separated)"
        value={metaTags}
        onChange={(e) => setMetaTags(e.target.value)}
        fullWidth
      />

      {/* ✅ Submit & Cancel Buttons */}
      <Box display="flex" gap={2}>
        <Button type="submit" variant="contained" color="primary">
          {postId ? "Update Post" : "Create Post"}
        </Button>
        <Button onClick={handleCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </form>
  );
}
