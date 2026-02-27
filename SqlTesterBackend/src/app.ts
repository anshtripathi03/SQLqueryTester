import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import assignmentRoutes from './routes/assignmentRoutes'
import actionRoutes from './routes/actionRoutes'
import authRoutes from './routes/authRoutes'

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.use('/api/assignments', assignmentRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/action', actionRoutes)

app.use((err: any, req: Request, res: Response,next: any ) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

export default app;

