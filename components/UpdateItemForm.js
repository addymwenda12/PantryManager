import React, { useState, useEffect } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const UpdateItemForm = ({ item, onUpdateItem, loading }) => {
  const [updatedItem, setUpdatedItem] = useState({
    name: "",
    quantity: "",
    unit: "",
    expiryDate: ""
  });

  useEffect(() => {
    if (item) {
      setUpdatedItem(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateItem(updatedItem.id, updatedItem);
  };

  if (!item) {
    return <p>No item to update</p>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Item Name"
        name="name"
        autoFocus
        value={updatedItem.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="quantity"
        label="Quantity"
        name="quantity"
        type="number"
        value={updatedItem.quantity}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="unit"
        label="Unit"
        name="unit"
        value={updatedItem.unit}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="expiryDate"
        label="Expiry Date"
        name="expiryDate"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={updatedItem.expiryDate}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Update Item"}
      </Button>
    </Box>
  );
};

export default UpdateItemForm;