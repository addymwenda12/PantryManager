'use client';

import { useState } from "react";
import { addPantryItem } from "@/lib/pantryService";
import AddItemForm from "@/components/AddItemForm";
import { useHistory } from "react-router-dom";

/* ADD PANTRY ITEM */
export default function AddItem() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleAddItem(item) {
    setLoading(true);
    try {
      await addPantryItem(item);
      history.push("/pantry");
      setMessage("Item added successfully!");
    } catch (e) {
      setMessage("Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Add New Item</h1>
      <AddItemForm onAddItem={handleAddItem} loading={loading} />
      {message && <p>{message}</p>}
    </div>
  );
}