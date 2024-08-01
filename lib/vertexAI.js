const fs = require('fs');
import { v1 } from "@google-cloud/aiplatform";

const credentials = JSON.parse(fs.readFileSync('vertex-ai.json', 'utf8'));

const {PredictionServiceClient} = v1;

const client = new PredictionServiceClient();

export async function classifyImageWithVertexAi() {
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