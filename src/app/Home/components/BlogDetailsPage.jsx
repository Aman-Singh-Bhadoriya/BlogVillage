"use client";

import { Box, Card, CardMedia, CardContent, Typography, Grid, IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import RelatedPosts from "./RelatedPosts";
import DOMPurify from "dompurify";

export default function BlogDetailsPage({ blog }) {
  if (!blog) return <Typography align="center" sx={{ py: 5, color: "white" }}>Blog not found.</Typography>;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.metaDescription || "Check out this blog!",
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <Box 
      mx="auto" 
      py={5} 
      px={10} 
      sx={{
        fontFamily: "'Merriweather', serif",
        color: "rgb(229 231 235)", // Text color (gray-200)
        borderRadius: "12px",
      }}
    >
      <Card 
        sx={{ 
          boxShadow: 3, 
          borderRadius: 3, 
          overflow: "hidden",
          backgroundColor: "rgb(31 41 55)", // 🌙 Dark Card Background (gray-800)
          color: "rgb(229 231 235)", // Light Text (gray-200)
        }}
      >
        {/* ✅ Blog Image with Fixed Height */}
        {blog.image && (
          <CardMedia
            component="img"
            image={blog.image}
            alt={blog.title}
            sx={{
              height: { xs: 200, sm: 300 },
              objectFit: "cover",
            }}
          />
        )}

        <CardContent>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              fontFamily: "'Inter', sans-serif",
              color: "rgb(229 231 235)", // 🌙 Light text (gray-200)
            }}
          >
            {blog.title}
          </Typography>

          <Grid container justifyContent="space-between" alignItems="center" mb={2}>
            <Typography 
              variant="body2" 
              sx={{
                fontFamily: "'Merriweather', serif",
                color: "rgb(156 163 175)", // 🌙 gray-400
              }}
            >
              {"Date of Publish: "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown Date"}
            </Typography>

            {/* ✅ Share Button */}
            <Tooltip title="Share this post">
              <IconButton onClick={handleShare} sx={{ color: "rgb(96 165 250)" }}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          {/* ✅ Render Blog Content */}
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
            sx={{ 
              lineHeight: 1.8, 
              fontFamily: "'Merriweather', serif",
              px: "12px",
              color: "rgb(209 213 219)", // 🌙 Light gray-300 for readability
            }}
          />
        </CardContent>
      </Card>

      {/* ✅ Related Posts */}
      <Box mt={5}>
        <RelatedPosts categoryId={blog.categoryId} currentPostId={blog.id} />
      </Box>
    </Box>
  );
}
