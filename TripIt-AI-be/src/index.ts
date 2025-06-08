import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateRoute from './routes/generate'

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:5173', // For local development
    'https://tripit-ai-fe.vercel.app', // Your Vercel frontend URL
    'https://tripit-ai-4n99q0f8d-harsh-sainis-projects-87c6ad77.vercel.app' // Add if you have Vercel preview deployments
];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // Allow requests with no origin (like mobile apps)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/api', generateRoute);

app.listen(port, () => console.log(`Backend server running on port ${port}`))