import { Configuration, OpenAIApi } from 'openapi';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function classifyImage(imageUrl) {
	try {
		const response = await openai.createImageClassification({
			model: "gpt-4-vision-preview",
			messages: [
				{
					role: "user",
					content: [
						{ type: "text", text: "What's in this image?"},
						{ type: "image_url", image_url: imageUrl},
					],
				},
			],
		});

		return response.data.choices[0].message.content;
	} catch (error) {
		console.error('Error classifying image:', error);
	}
}