import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function Filter({ onFilterChange }) {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    onFilterChange({ category, status });
  }, [category, status]);

  const handleClear = () => {
    setCategory("");
    setStatus("");
    onFilterChange({ category: "", status: "" });
  };

  return (
    <Box display="flex" gap={2} mb={2} alignItems="center">
      {/* Category Dropdown */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Status Dropdown */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {/* Clear Button */}
      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
    </Box>
  );
}
