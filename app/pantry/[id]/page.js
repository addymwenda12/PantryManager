'use client';

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updatePantryItem, deletePantryItem } from "@/lib/pantryService";
import { useRouter } from "next/navigation";

export default function PantryItem({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchItem() {
      try {
        const docRef = doc(db, "pantry", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = { itemId: docSnap.id, ...docSnap.data() };
          setItem(itemData);
          setEditedItem(itemData);
        } else {
          setError("Item not found");
        }
      } catch (e) {
        setError("Error fetching item. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [params.id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedItem(item);
  };

  const handleSave = async () => {
    try {
      await updatePantryItem(item.id, editedItem);
      setItem(editedItem);
      setEditMode(false);
    } catch (e) {
      setError("Error updating item. Please try again.");
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deletePantryItem(item.id);
        router.push("/pantry");
      } catch (e) {
        setError("Error deleting item. Please try again.");
        console.error(e);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <div>
      <h1>Pantry Item Details</h1>
      {editMode ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedItem.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={editedItem.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="unit">Unit:</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={editedItem.unit}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={editedItem.expiryDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
          {item.expiryDate && (
            <p><strong>Expiry Date:</strong> {new Date(item.expiryDate).toLocaleDateString()}</p>
          )}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}