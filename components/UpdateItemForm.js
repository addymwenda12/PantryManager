import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const UpdateItemForm = ({ item, onUpdateItem }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateItem({ ...item, name, quantity, expiryDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <TextField
        label="Expiry Date"
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        InputLabelProps={{
        shrink: true,
      }}
      />
      <Button type="submit" variant="contained" color="primary">
        Update Item
      </Button>
    </form>
  );
};

export default UpdateItemForm;