import { GoogleGenAI } from "@google/genai";

export async function generateTripPlan(prompt: string) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GEMINI_AI_API_KEY,
    });
    const config = {
        responseMimeType: 'application/json',
    };
    const model = 'gemini-1.5-flash';
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

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    let fullText = '';

    for await (const chunk of response) {
        if (chunk.text) {
            fullText += chunk.text
        }
    }
    return fullText;
}