'use client';

import { useState } from 'react';
import { classifyImage } from '../../lib/imageClassification';
import { addPantryItem } from '../../lib/pantryService';
import ImageUploader from '../../components/ImageUploader';

export default function ImageUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classification, setClassification] = useState(null);
  const [itemAdded, setItemAdded] = useState(false);

  const handleUpload = async (imageFile) => {
    setLoading(true);
    setError(null);
    setClassification(null);
    setItemAdded(false);

    try {
      // Convert the file to base64
      const base64Image = await fileToBase64(imageFile);

      // Classify the image
      const result = await classifyImage(base64Image);

      // Get the top classification
      const topClass = result[0];

      setClassification(topClass);
    } catch (err) {
      setError('Error classifying image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPantry = async () => {
    if (!classification) return;

    try {
      await addPantryItem({
        name: classification.label,
        quantity: 1,
        unit: 'piece',
      });
      setItemAdded(true);
    } catch (err) {
      setError('Error adding item to pantry');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Upload and Classify Item</h1>
      <ImageUploader onUpload={handleUpload} />

      {loading && <p>Classifying image...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {classification && (
        <div>
          <h2>Classification Result:</h2>
          <p>Item: {classification.label}</p>
          <p>Confidence: {(classification.score * 100).toFixed(2)}%</p>
          <button onClick={handleAddToPantry}>Add to Pantry</button>
        </div>
      )}

      {itemAdded && <p style={{ color: 'green' }}>Item added to pantry successfully!</p>}
    </div>
  );
}

// Helper function to convert a file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}