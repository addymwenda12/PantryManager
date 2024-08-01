'use-client';

import { useState, useEffect } from "react";
import { getPantryItems } from "@/lib/pantryService";
import { getRecipeSuggestion } from "@/lib/openAI";
import RecipeSuggestions from "@/components/RecipeSuggestions";

export default function Recipes() {
  const [pantryItems, setPantryItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPantryItemsAndRecipes() {
      try {
        // Fetch pantry items from firebase
        const items = await getPantryItems();
        setPantryItems(items);

        // Get recipes suggestions based on pantry items
        const itemNames = items.map((item) => item.name);
        const suggestions = await getRecipeSuggestion(itemNames);
        setRecipes(suggestions);
      } catch (e) {
        setError("Error fetching pantry items. Please try again.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPantryItemsAndRecipes();
  }, []);

  if (loading) {
    return <div>Loading recipes...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Recipe Suggestions</h2>
      <h3>Based on your pantry contents:</h3>
      <ul>
        {pantryItems.map((item) => (
          <li key={item.id}>{item.name} - {item.quantity} {item.unit}</li>
        ))}
      </ul>
      {recipes.length > 0 ? (
        <RecipeSuggestions recipes={recipes} />
      ) : (
        <p>No recipe suggestions available. Try adding more items to your pantry</p>
      )}
    </div>
  );
}