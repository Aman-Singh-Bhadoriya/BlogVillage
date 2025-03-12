import { Card, CardContent, IconButton, Typography, Chip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function CategoryCard({ category, onEdit, onDelete }) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await deleteDoc(doc(db, "categories", category.id));
        alert("Category deleted successfully!");
        onDelete(category.id);
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      }
    }
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* ✅ Category Image */}
        <img
          src={category.image}
          alt={category.name}
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        {/* ✅ Category Name */}
        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
          {category.name}
        </Typography>

        {/* ✅ Status */}
        <Chip
          label={category.status === "active" ? "Active" : "Inactive"}
          color={category.status === "active" ? "success" : "default"}
          sx={{
            mt: 1,
            fontWeight: "bold",
          }}
        />
      </CardContent>

      {/* ✅ Action Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 12px 12px" }}>
        {/* ✅ EDIT Button */}
        <IconButton onClick={() => onEdit(category)} color="primary" size="small">
          <Edit />
        </IconButton>
        {/* ✅ DELETE Button */}
        <IconButton onClick={handleDelete} color="error" size="small">
          <Delete />
        </IconButton>
      </div>
    </Card>
  );
}
