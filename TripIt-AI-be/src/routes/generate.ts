import express, { Request, Response, NextFunction } from 'express';
import { generateTripPlan } from '../utils/gemini';

const router = express.Router();

router.post('/generate', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { prompt } = req.body;

    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
    }

    try {
        const trip = await generateTripPlan(prompt);
        res.status(200).json({ trip });
    } catch (error) {
        next(error);
    }
});

export default router;
