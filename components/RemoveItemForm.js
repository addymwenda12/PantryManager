import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const RemoveItemForm = ({ handleRemoveItem }) => {
  const [itemId, setItemId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRemoveItem(e, itemId);
    setItemId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <Button type="submit" variant="contained" color="secondary">
        Remove Item
      </Button>
    </form>
  );
};

export default RemoveItemForm;