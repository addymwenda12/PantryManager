'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPantryItems, addPantryItem } from "@/lib/pantryService";
import { getRecipeSuggestions } from "@/lib/openAI";
import { classifyImage } from "@/lib/imageClassifications";
import { Typography, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import CameraSection from "@/components/CameraSection";

export default function Home() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    async function fetchRecipeSuggestion() {
      try {
        const items = await getPantryItems();
        const itemNames = items.map((item) => item.name);
        const suggestions = await getRecipeSuggestion(itemNames);
        setRecipe(suggestions[0]);
      } catch (e) {
        console.error("Error fetching recipe suggestion:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipeSuggestion();
  }, []);

  const handleCapture = async (file) => {
    try {
      setLoading(true);
      const base64Image = await fileToBase64(file);
      const result = await classifyImage(base64Image);
      const topClass = result[0];

      await addPantryItem({
        name: topClass.label,
        quantity: 1,
        unit: 'piece',
      });

      setSnackbar({ open: true, message: `Added ${topClass.label} to pantry` });
    } catch (e) {
      console.error("Error processing image:", e);
      setSnackbar({ open: true, message: 'Error processing image' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Pantry
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button variant="contained" component={Link} href="/pantry">
          View Pantry
        </Button>
        <Button variant="contained" component={Link} href="/add-item">
          Add Item
        </Button>
        <Button variant="contained" component={Link} href="/remove-item">
          Remove Item
        </Button>
        <Button variant="contained" component={Link} href="/update-item">
          Update Item
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          AI Recipe Suggestion
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : recipe ? (
          <Box>
            <Typography variant="h6">{recipe.name}</Typography>
            <Typography variant="body1">Ingredients: {recipe.ingredients.join(", ")}</Typography>
            <Button variant="outlined" component={Link} href={`/recipes/${recipe.id}`} sx={{ mt: 2 }}>
              View Full Recipe
            </Button>
          </Box>
        ) : (
          <Typography>No recipe suggestions available. Try adding more items to your pantry.</Typography>
        )}
      </Box>
      <CameraSection onCapture={handleCapture} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Box>
  );
}

// Helper function to convert a file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}
