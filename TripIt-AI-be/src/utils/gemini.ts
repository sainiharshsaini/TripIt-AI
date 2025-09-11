import { GoogleGenAI } from "@google/genai";

export async function generateTripPlan(prompt: string): Promise<string> {

    console.log("prompt: ", prompt);
    
    if (!prompt) {
        throw new Error('Prompt is required');
    }

    if (!process.env.GOOGLE_GEMINI_AI_API_KEY) {
        throw new Error('Missing Google Gemini AI API key');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_AI_API_KEY });

    const tools = [
        {
            googleSearch: {
            }
        },
    ];

    const config = {
        thinkingConfig: {
            thinkingBudget: -1,
        },
        tools,
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

        console.log(fullText);
        
        return fullText;
    } catch (error) {
        console.error('Error in generateTripPlan:', error);
        throw new Error('Failed to generate trip plan. Please try again later.');
    }
}
