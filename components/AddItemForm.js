import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

const AddItemForm = ({ onAddItem, loading }) => {
  const [item, setItem] = useState({
    name: "",
    quantity: "",
    unit: "",
    expiryDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(item);
  };

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
        value={item.name}
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
        value={item.quantity}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="unit"
        label="Unit"
        name="unit"
        value={item.unit}
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
        value={item.expiryDate}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Add Item"}
      </Button>
    </Box>
  );
};

export default AddItemForm;