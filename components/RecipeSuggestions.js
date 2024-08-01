import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const RecipeSuggestions = ({ recipes }) => {
  return (
    <List>
      {recipes.map((recipe, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={recipe.name}
            secondary={recipe.ingredients.join(", ")}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecipeSuggestions;