'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addPantryItem } from "@/lib/pantryService";
import AddItemForm from "@/components/AddItemForm";


/* ADD PANTRY ITEM */
export default function AddItem() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAddItem(item) {
    setLoading(true);
    try {
      await addPantryItem(item);
      router.push("/pantry");
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