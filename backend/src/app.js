import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN }));

export default app;
