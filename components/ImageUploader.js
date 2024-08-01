import React, { useState } from 'react';
import { Button } from '@material-ui/core';

const ImageUploader = () => {
  const [image, setImage] = useState(null);

	const handleCapture = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
    // Proceed with the upload logic
		else {
			onUpload(image);
		}
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