import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.use((err: any, req: Request, res: Response ) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

export default app;

