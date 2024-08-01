'use client';

import { useState } from "react";
import { updatePantryItem } from "@/lib/pantryService";
import UpdateItemForm from "@/components/UpdateItemForm";

/* UPDATE ITEM */
export default function UpdateItem() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdateItem(itemId, newData) {
    setLoading(true);
    try {
      await updatePantryItem(item, newData);
      setMessage("Item updated successfully!");
    } catch (e) {
      setMessage("Error updating item. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Update Item</h2>
      <UpdateItemForm onUpdateItem={handleUpdateItem} loading={loading} />
      {message && <p>{message}</p>}
    </div>
  );
}