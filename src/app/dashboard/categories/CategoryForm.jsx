"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Modal, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function CategoryForm({ open, onClose, onCategoryCreated, category }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("active");

  // ✅ Pre-fill the form if editing
  useEffect(() => {
    if (category) {
      setName(category.name);
      setImage(category.image);
      setStatus(category.status || "active");
    } else {
      setName("");
      setImage("");
      setStatus("active");
    }
  }, [category]);

  // ✅ Handle form submission for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image || !status) {
      alert("All fields are required!");
      return;
    }

    try {
      if (category) {
        // ✅ Update existing category
        const categoryRef = doc(db, "categories", category.id);
        await updateDoc(categoryRef, {
          name,
          image,
          status,
        });
        alert("Category updated successfully!");
      } else {
        // ✅ Create new category
        await addDoc(collection(db, "categories"), {
          name,
          image,
          status,
        });
        alert("Category added successfully!");
      }

      onCategoryCreated(); // ✅ Refresh categories list
      onClose(); // ✅ Close the modal
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to save category");
    }
  };

  // ✅ Handle delete category
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteDoc(doc(db, "categories", category.id));
        alert("Category deleted successfully!");
        onCategoryCreated(); // ✅ Refresh categories list
        onClose();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" mb={2}>
          {category ? "Edit Category" : "Add Category"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* ✅ Category Name */}
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          {/* ✅ Image URL */}
          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />

          {/* ✅ Status */}
          <FormControl fullWidth required sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          {/* ✅ Submit Button */}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            {category ? "Update Category" : "Create Category"}
          </Button>

          {/* ✅ DELETE Button (Only in edit mode) */}
          {category && (
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
            >
              Delete Category
            </Button>
          )}
        </form>
      </Box>
    </Modal>
  );
}
