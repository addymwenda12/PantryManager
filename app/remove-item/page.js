"use client";

import { useState } from "react";
import { deletePantryItem } from "@/lib/pantryService";
import RemoveItemForm from "@/components/RemoveItemForm";
import { useHistory } from "react-router-dom";

/* REMOVE ITEM */
export default function RemoveItem() {
  const [message, setMessage] = useState("");
  const [itemId, setItemId] = useState("");
  const history = useHistory();

  const handleRemoveItem = async (e) => {
    e.preventDefault();
    try {
      await deletePantryItem(itemId);
      history.push("/pantry");
      setMessage("Item removed successfully");
    } catch (e) {
      setMessage("Error removing item. Please try again.");
    }
  };

  return (
    <div>
      <h2>Remove Item</h2>
      <RemoveItemForm
        setItemId={setItemId}
        handleRemoveItem={handleRemoveItem}
      />
      {message && <p>{message}</p>}
    </div>
  );
}
