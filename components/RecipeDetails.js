import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import Image from 'next/image';

const RecipeDetail = ({ recipe }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Source: {recipe.source}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <EditIcon />
            <PrintIcon />
            <StarBorderIcon />
            <ShareIcon />
          </Box>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Prep: {recipe.prepTime} mins</Typography>
            <Typography variant="body1">Cook: {recipe.cookTime} mins</Typography>
            <Typography variant="body1">Ready: {recipe.readyTime} mins</Typography>
            <Typography variant="body1">Servings: {recipe.servings}</Typography>
          </Box>
          <Image src={recipe.image} alt={recipe.name} style={{ width: '100%', borderRadius: '8px' }} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {recipe.photoCount} Photos
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecipeDetail;