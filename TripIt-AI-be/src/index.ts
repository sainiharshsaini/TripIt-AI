import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateRoute from './routes/generate'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
    res.send("Express on Vercel")
});

app.use('/api', generateRoute);

app.listen(port, () => console.log(`Server listening on port ${port}`))