// File: components/CameraSection.js
import React, { useState, useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Camera } from 'lucide-react';
import Image from 'next/image';

const CameraSection = ({ onCapture }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      onCapture(file);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Capture Ingredient
      </Typography>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button
        variant="contained"
        startIcon={<Camera />}
        onClick={() => fileInputRef.current.click()}
      >
        Take Photo
      </Button>
      {imagePreview && (
        <Box sx={{ mt: 2 }}>
          <Image src={imagePreview} alt="Captured ingredient" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </Box>
      )}
    </Box>
  );
};

export default CameraSection;
