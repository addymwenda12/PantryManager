'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPantryItems } from "@/lib/pantryService";
import { getRecipeSuggestion } from "@/lib/openAI";
import { Typography, Box, Button, CircularProgress } from "@mui/material";

export default function Home() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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
    </Box>
  );
}
