'use client';

import { useState, useEffect } from "react";
import { getPantryItems } from "@/lib/pantryService";
import { getRecipeSuggestions } from "@/lib/openAI";
import RecipeDetail from "@/components/RecipeDetails";
import { Typography, Box, CircularProgress } from "@mui/material";

export default function Recipes() {
  const [pantryItems, setPantryItems] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPantryItemsAndRecipe() {
      try {
        const items = await getPantryItems();
        setPantryItems(items);

        const itemNames = items.map((item) => item.name);
        const suggestions = await getRecipeSuggestion(itemNames);
        setRecipe(suggestions[0]); // Assuming getRecipeSuggestion returns an array of recipes
      } catch (e) {
        setError("Error fetching data. Please try again.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPantryItemsAndRecipe();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Recipe Suggestion
      </Typography>
      {recipe ? (
        <RecipeDetail recipe={recipe} />
      ) : (
        <Typography>
          No recipe suggestions available. Try adding more items to your pantry.
        </Typography>
      )}
    </Box>
  );
}