"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePantryItem } from "@/lib/pantryService";
import RemoveItemForm from "@/components/RemoveItemForm";

export default function RemoveItem() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRemoveItem = async (e, itemId) => {
    e.preventDefault();
    try {
      await deletePantryItem(itemId);
      router.push("/pantry");
      setMessage("Item removed successfully");
    } catch (e) {
      setMessage("Error removing item. Please try again.");
    }
  };

  return (
    <div>
      <h2>Remove Item</h2>
      <RemoveItemForm handleRemoveItem={handleRemoveItem} />
      {message && <p>{message}</p>}
    </div>
  );
}