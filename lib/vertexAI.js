// Load environment variables from .env.local
require('dotenv').config({ path: '../.env.local' });

const fs = require('fs');
import { v1 } from "@google-cloud/aiplatform";

// Ensure the GOOGLE_APPLICATION_CREDENTIALS environment variable is set
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('The GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.');
}

// Read the credentials file specified by GOOGLE_APPLICATION_CREDENTIALS
const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'));

const { PredictionServiceClient } = v1;

const client = new PredictionServiceClient();

export async function classifyImageWithVertexAi(imageBytes) {
  const endpoint = credentials.endpoint;

  try {
    const [response] = await client.predict({
      endpoint,
      instances: [
        {
          content: imageBytes.toString('base64'),
          mimeType: 'image/jpeg',
        },
      ],
      parameters: {
        confidenceThreshold: 0.5,
        maxPredictions: 5,
      },
    });

    return response.predictions;
  } catch (error) {
    console.error('Error classifying image with Vertex AI:', error);
    throw error;
  }
}