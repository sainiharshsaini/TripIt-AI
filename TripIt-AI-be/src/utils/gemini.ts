import { GoogleGenAI } from "@google/genai";

export async function generateTripPlan(prompt: string): Promise<string> {
    if (!prompt || prompt.trim() === '') {
        throw new Error('Prompt is required');
    }

    if (!process.env.GOOGLE_GEMINI_AI_API_KEY) {
        throw new Error('Missing Google Gemini AI API key');
    }

    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GEMINI_AI_API_KEY,
    });

    const config = {
        responseMimeType: 'application/json',
    };
    const model = 'gemini-2.5-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    try {
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        let fullText = '';

        for await (const chunk of response) {
            if (chunk.text) {
                fullText += chunk.text;
            }
        }

        return fullText;
    } catch (error) {
        console.error('Error in generateTripPlan:', error);
        // Wrap or rethrow so caller can handle errors gracefully
        throw new Error('Failed to generate trip plan. Please try again later.');
    }
}
