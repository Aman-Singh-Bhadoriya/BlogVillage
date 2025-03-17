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
import SlugInput from "./Component/SlugInput";
import DOMPurify from "dompurify"; // ✅ Import DOMPurify

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [postId, setPostId] = useState(null);

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const editor = useRef(null);

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

  const loadPost = async (id) => {
    try {
      const postDoc = await getDoc(doc(db, "posts", id));
      if (postDoc.exists()) {
        const post = postDoc.data();
        setTitle(post.title);
        setSlug(post.slug || "");
        setContent(post.content);
        setImageUrl(post.image || "");
        setCategoryId(post.categoryId || "");
        setStatus(post.status || "");
      }
    } catch (error) {
      console.error("Error loading post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !slug || !content || !categoryId || !status) {
      alert("All fields are required");
      return;
    }
  
    // ✅ Sanitize content before saving to database
    const sanitizedContent = DOMPurify.sanitize(content);
  
    try {
      if (postId) {
        await updateDoc(doc(db, "posts", postId), {
          title,
          slug,
          content: sanitizedContent, // ✅ Save sanitized HTML to Firebase
          image: imageUrl,
          categoryId,
          status,
        });
      } else {
        if (!user) {
          alert("You must be logged in to create a post");
          return;
        }
  
        await addDoc(collection(db, "posts"), {
          title,
          slug,
          content: sanitizedContent, // ✅ Save sanitized HTML to Firebase
          image: imageUrl,
          categoryId,
          status,
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
        label="Content"
        value={content}
        onChange={(newContent) => setContent(newContent)}
        multiline
        rows={6}
        fullWidth
        required
      />

      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
      />


      <Box display="flex" gap={2}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
