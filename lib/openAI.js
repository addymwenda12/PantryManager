import dotenv from "dotenv";
dotenv.config({ path: "../.env.local" });

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getRecipeSuggestions(pantryItems) {
	try {
		const prompt = `Given the following ingredients: ${pantryItems.join(', ')}, suggest 3 recipe.`;

		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: prompt,
			max_tokens: 200,
			n: 1,
			stop: null,
			temperature: 0.7,
		});

		const suggestions = JSON.parse(response.data.choices[0].text).choices;
		return suggestions;

	} catch (error) {
		console.error('Error getting recipe suggestions:', error);
		throw error;
	}
}