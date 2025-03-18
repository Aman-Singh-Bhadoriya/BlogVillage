"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { Box, Card, CardMedia, CardContent, Typography, Button, IconButton, Tooltip, Grid } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DOMPurify from "dompurify";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const blogData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogData);
    };
    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleReadMore = (slug) => {
    router.push(`/Home/${slug}`);
  };

  const handleShare = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.metaDescription || "Check out this blog!",
        url: window.location.href + `/Home/${blog.slug}`,
      }).catch(console.error);
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <Grid container spacing={3} sx={{ py: 4 }}>
      {blogs.slice(0, visibleCount).map((blog) => (
        <Grid item key={blog.id} xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              width: "100%",
              height: 420,
              display: "flex",
              flexDirection: "column",
              boxShadow: 4,
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
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
                  height: 180,
                  objectFit: "cover",
                }}
              />
            )}

            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
              {/* ✅ Blog Title */}
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  mb: 1,
                }}
              >
                {blog.title}
              </Typography>

              {/* ✅ Blog Content */}
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
                  lineHeight: "1.4",
                }}
              />

              {/* ✅ Buttons */}
              <Box mt="auto" display="flex" justifyContent="space-between" alignItems="center">
                {/* ✅ Share Button */}
                <Tooltip title="Share this post">
                  <IconButton onClick={() => handleShare(blog)} color="primary" size="small">
                    <ShareIcon />
                  </IconButton>
                </Tooltip>

                {/* ✅ Read More Button */}
                <Button
                  onClick={() => handleReadMore(blog.slug)}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  Read More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* ✅ Show More Button */}
      {visibleCount < blogs.length && (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button onClick={handleShowMore} variant="contained" color="primary" size="large">
            Show More
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
