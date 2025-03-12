"use client";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
};

const SlugInput = ({ title, slug, setSlug }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (title && !isEditing) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditing, setSlug]);

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
    setIsEditing(true);
  };

  return (
    <TextField
      label="Slug"
      value={slug}
      onChange={handleSlugChange}
      fullWidth
      required
      helperText="Slug will be used in the URL"
    />
  );
};

export default SlugInput;
