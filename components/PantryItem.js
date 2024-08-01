import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const PantryItem = ({ item }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{item.name}</Typography>
        <Typography>Quantity: {item.quantity}</Typography>
        <Typography>Expiry Date: {item.expiryDate}</Typography>
      </CardContent>
    </Card>
  );
};

export default PantryItem;