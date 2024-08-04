import React, { useState } from 'react';
import { Button } from '@mui/material';

const ImageUploader = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
    setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    onUpload(image);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id='capture-button'
        capture='environment'
        onChange={handleCapture}
      />
      <label htmlFor='capture-button'>
        <Button variant="contained" component="span">
          Capture Image
        </Button>
      </label>
      {image && (
        <Button type="submit" variant="contained" color="primary">
          Upload Image
        </Button>
      )}
    </form>
  );
};

export default ImageUploader;
