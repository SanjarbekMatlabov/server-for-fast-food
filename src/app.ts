import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cartRoutes from './routes/cart.routes.ts';
import cookieParser from 'cookie-parser';

dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', cartRoutes);
export default app;