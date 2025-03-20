import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function CategoryCard({ category, onEdit, onDelete }) {
  // ✅ Handle category deletion
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // ✅ Ensure alignment
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
        height: "auto", // ✅ Dynamic height
        overflow: "visible", // ✅ Prevent clipping
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
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
        <Typography
          variant="h6"
          sx={{
            mt: 1,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {category.name}
          <Chip
            label={category.status === "active" ? "Active" : "Inactive"}
            sx={{
              mb: 0,
              pb:0,
              fontWeight: "bold",
              backgroundColor:
                category.status === "active" ? "success.main" : "#d82727", // ✅ Red background for inactive
              color: category.status === "active" ? "#fff" : "#fff", // ✅ Ensure text is readable
            }}
          />
        </Typography>

        {/* ✅ Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // ✅ Limit to 2 lines
          }}
        >
          {category.description || "No description available"}
        </Typography>
      </CardContent>

      {/* ✅ Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "#fafafa",
        }}
      >
        {/* ✅ EDIT Button */}
        <IconButton
          onClick={() => onEdit(category)}
          color="primary"
          size="small"
        >
          <Edit />
        </IconButton>

        {/* ✅ DELETE Button */}
        <IconButton onClick={handleDelete} color="error" size="small">
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
}
