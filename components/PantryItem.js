import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PantryItem = ({ item }) => {
  return (
    <Card elevation={3} sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {item.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Quantity: {item.quantity}</Typography>
          <Typography variant="body1">Expiry: {item.expiryDate}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PantryItem;
