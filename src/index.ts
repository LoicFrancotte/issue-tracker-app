import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

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

app.get('/swagger', (req, res) => {
  const swaggerHtmlPath = path.join(__dirname, 'public', 'swagger.html');
  res.sendFile(swaggerHtmlPath);
});

app.get('/openapi.yaml', (req, res) => {
  const openApiYamlPath = path.join(__dirname, 'public', 'openapi.yaml');
  res.sendFile(openApiYamlPath);
});

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