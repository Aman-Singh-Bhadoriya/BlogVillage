"use client";

import { Box, Card, CardMedia, CardContent, Typography, Grid, IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import RelatedPosts from "./RelatedPosts";
import DOMPurify from "dompurify";

export default function BlogDetailsPage({ blog }) {
  if (!blog) return <Typography align="center" sx={{ py: 5 }}>Blog not found.</Typography>;

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
    <Box maxWidth="lg" mx="auto" py={5} px={15}>
      <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: "hidden" }}>
        {/* ✅ Blog Image with Fixed Height */}
        {blog.image && (
          <CardMedia
            component="img"
            image={blog.image}
            alt={blog.title}
            sx={{
              height: { xs: 200, sm: 300 }, // Responsive height
              objectFit: "cover", // Maintain aspect ratio and cover space
            }}
          />
        )}

        <CardContent>
          {/* ✅ Blog Title & Meta Info */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {blog.title}
          </Typography>
          <Grid container justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body2" color="text.secondary">
              {"Date of Publish: "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown Date"}
            </Typography>

            {/* ✅ Share Button */}
            <Tooltip title="Share this post">
              <IconButton onClick={handleShare} color="primary">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          {/* ✅ Render Blog Content */}
          <Typography
            variant="body1"
            color="text.primary"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
            sx={{ lineHeight: 1.8 }}
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
