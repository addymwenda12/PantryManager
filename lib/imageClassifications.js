import dotenv from "dotenv";
dotenv.config({ path: "../.env.local" });

const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function classifyImage(imageUrl) {
  try {
    const response = await openai.createImageClassification({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What's in this image?" },
            { type: "image_url", image_url: imageUrl },
          ],
        },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error classifying image:', error);
    throw error;
  }
}
