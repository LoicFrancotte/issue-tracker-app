import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import labelRoutes from './routes/labelRoutes';
import issueRoutes from './routes/issueRoutes';
import commentRoutes from './routes/issueCommentRoutes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', commentRoutes);
app.use('/', issueRoutes);
app.use('/', labelRoutes);
app.use('/', userRoutes);

const PORT: number = Number(process.env.PORT);

mongoose.connect(process.env.DB_URL!);

mongoose.connection.on('error', (error: string) => {
  console.error(error);
});

mongoose.connection.once('open', () => {
  console.log('🌱 Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`🚀 Server ready on port ${PORT}`);
  });
});