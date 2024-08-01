import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddItemForm = ({ onaddItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onaddItem({ name, quantity, expiryDate });
    setName("");
    setQuantity("");
    setExpiryDate("");
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
        Add Item
      </Button>
    </form>
  );
};

export default AddItemForm;