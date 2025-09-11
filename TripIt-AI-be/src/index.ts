import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateRoute from './routes/generate';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());

const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];

const corsOptions = {
  // allow requests with no origin (like mobile apps, curl, Postman)
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // allow cookies & authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use('/api', apiLimiter, generateRoute);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

export default app;
