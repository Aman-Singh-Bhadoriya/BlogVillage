"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Box, Card, CardMedia, CardContent, Typography, Grid, Avatar, Button } from "@mui/material";
import DOMPurify from "dompurify";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const blogData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <Grid container spacing={4} sx={{ py: 6, px:6, }}>
      {blogs.slice(0, visibleCount).map((blog) => (
        <Grid item key={blog.id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "100%",
              height: 420,
              display: "flex",
              flexDirection: "column",
              boxShadow: 4,
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "var(--secondary-color)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            {/* ✅ Blog Image */}
            {blog.image && (
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  height: 200,
                  objectFit: "cover",
                }}
              />
            )}

            {/* ✅ Blog Content */}
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
              {/* ✅ Blog Title */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="var(--primary-color)"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  mb: 1,
                }}
              >
                {blog.title}
              </Typography>

              {/* ✅ Blog Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.content.slice(0, 120)) + "...",
                }}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                  mb: 2,
                  lineHeight: 1.5,
                }}
              />

              {/* ✅ Author and Date */}
              <Box mt="auto" display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  {blog.authorImage && (
                    <Avatar src={blog.authorImage} alt={blog.author} sx={{ width: 32, height: 32 }} />
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {blog.author || "Unknown Author"}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {blog.date || "Unknown Date"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* ✅ Show More Button */}
      {visibleCount < blogs.length && (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            onClick={handleShowMore}
            variant="contained"
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
              },
              padding: "10px 24px",
              borderRadius: "8px",
              fontWeight: "500",
              textTransform: "none",
            }}
          >
            Show More
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
