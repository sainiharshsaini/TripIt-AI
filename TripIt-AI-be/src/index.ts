import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import generateRoute from './routes/generate';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://tripit-ai-fe.vercel.app',
  'https://tripit-ai-4n99q0f8d-harsh-sainis-projects-87c6ad77.vercel.app',
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('combined'));

// Routes
app.use('/api', generateRoute);

// Centralized error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
