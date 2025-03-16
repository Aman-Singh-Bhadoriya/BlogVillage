"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";
import { Button, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // ✅ Import Auth Context

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { user } = useAuth(); // ✅ Get user info from context

  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Load all categories (including those created by other admins)
  const loadCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // ✅ Refresh list after creating/editing a category
  const handleCategoryCreated = () => {
    loadCategories(); // ✅ Reload categories
  };

  // ✅ Open form for editing (Only for admins)
  const handleEdit = (category) => {
    if (user?.role === "admin") {
      setEditingCategory(category);
      setFormOpen(true);
    }
  };

  // ✅ Handle delete (Only for admins)
  const handleDelete = (id) => {
    if (user?.role === "admin") {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <Box>
      {/* ✅ Only admins can see the "Add Category" button */}
      {user?.role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingCategory(null);
            setFormOpen(true);
          }}
          sx={{ mb: 2 }}
        >
          Add Category
        </Button>
      )}

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
            onEdit={user?.role === "admin" ? handleEdit : null} // ✅ Only admins can edit
            onDelete={user?.role === "admin" ? handleDelete : null} // ✅ Only admins can delete
          />
        ))}
      </Box>
    </Box>
  );
}
