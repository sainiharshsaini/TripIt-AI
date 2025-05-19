import express, { Request, Response } from 'express';
import { generateTripPlan } from '../utils/gemini';

const router = express.Router();

router.post('/generate', async (req: Request, res: Response) => {
    const { prompt } = req.body;

    console.log("backend " + prompt);

    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return
    }

    try {
        const trip = await generateTripPlan(prompt);
        res.status(200).json({ trip });
    } catch (error) {
        console.error('Error generating trip:', error);
        res.status(500).json({ error: 'Failed to generate trip' })
    }
});

export default router;