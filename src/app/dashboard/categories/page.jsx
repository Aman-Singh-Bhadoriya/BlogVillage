"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";
import { Button, Box } from "@mui/material";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleCategoryCreated = () => {
    loadCategories(); // ✅ Refresh list
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <Box>
      {/* ✅ Add Category Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditingCategory(null); // Reset for new category
          setFormOpen(true);
        }}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>

      {/* ✅ Category Form */}
      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCategoryCreated={handleCategoryCreated}
        category={editingCategory}
      />

      {/* ✅ Category List */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Box>
  );
}
