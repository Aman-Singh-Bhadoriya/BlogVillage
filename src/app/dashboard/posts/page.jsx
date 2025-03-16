"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from "../../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Skeleton,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // ✅ Fetch Posts
  const fetchPosts = async () => {
    setLoading(true);
    if (user) {
      try {
        // ✅ Fetch categories
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoryMap = categorySnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data().name;
          return acc;
        }, {});

        // ✅ Fetch posts
        const q = query(
          collection(db, "posts"),
          where("authorId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const postList = querySnapshot.docs.map((doc) => {
          const postData = doc.data();
          return {
            id: doc.id,
            ...postData,
            category: categoryMap[postData.categoryId] || "N/A",
          };
        });

        setPosts(postList);
        setFilteredPosts(postList);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  // ✅ Handle Filter Change
  const handleFilterChange = ({ category, status }) => {
    let filtered = posts;

    if (category) {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (status) {
      filtered = filtered.filter((post) => post.status === status);
    }

    setFilteredPosts(filtered);
  };

  // ✅ Open Post Form for New Post
  const handleNewPost = () => {
    router.push("/dashboard/posts/PostForm");
  };

  // ✅ Open Post Form for Editing
  const handleEditPost = (postId) => {
    router.push(`/dashboard/posts/PostForm?id=${postId}`);
  };

  // ✅ Handle Post Deletion
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
      setFilteredPosts(posts.filter((post) => post.id !== postId));
      setMessage("Post deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <Box p={4} sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* ✅ Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#333">
          My Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleNewPost}
          sx={{
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "8px",
          }}
        >
          New Post
        </Button>
      </Box>

      {/* ✅ Filter Component */}
      <Filter onFilterChange={handleFilterChange} />

      {/* ✅ Posts Table */}
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(90deg, #4f46e5, #6366f1)",
              }}
            >
              {[
                "ID",
                "Title",
                "Description",
                "Category",
                "Status",
                "Image",
                "Actions",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    fontWeight: "bold",
                    color: "#ffffff",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={7}>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No posts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post, index) => (
                <TableRow key={post.id} sx={{ borderBottom: "1px solid #e5e7eb" }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{post.title}</TableCell>
                  {/* ✅ Limit content to 4 lines + scrollbar */}
                  <TableCell align="center">
                    <Box
                      sx={{
                        maxHeight: "4.8em", // 4 lines
                        overflowY: "auto",
                        lineHeight: "1.2em",
                      }}
                    >
                      {post.content}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{post.category || "N/A"}</TableCell>
                  <TableCell align="center">{post.status || "N/A"}</TableCell>
                  <TableCell align="center">
                    {post.image && (
                      <img src={post.image} alt="Post" width={50} height={50} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditPost(post.id)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(post.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}