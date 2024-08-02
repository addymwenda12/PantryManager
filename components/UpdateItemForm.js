import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { firestore } from "@/firebase";

const UpdateItemForm = ({ item, onUpdateItem }) => {
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity || "");
  const [expiryDate, setExpiryDate] = useState(item?.expiryDate || "");

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setQuantity(item.quantity || "");
      setExpiryDate(item.expiryDate || "");
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with values:", { name, quantity, expiryDate });
    try {
      if (typeof onUpdateItem !== 'function') {
        throw new Error("onUpdateItem is not a function");
      }
      console.log("Calling onUpdateItem with:", { ...item, name, quantity, expiryDate });
      onUpdateItem({ ...item, name, quantity, expiryDate });
    } catch (error) {
      console.error("Error updating item:", error);
    }
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