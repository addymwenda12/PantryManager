import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const RemoveItemForm = ({ onRemoveItem }) => {
  const [itemId, setItemId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRemoveItem(itemId);
    setItemId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={itemId}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" variant="contained" color="secondary">
        Remove Item
      </Button>
    </form>
  );
};

export default RemoveItemForm;