import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

// middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // allow Vite frontend
// Root route for health check
app.get('/', (req, res) => {
  res.send('Pregnancy Companion API is running.');
});
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// connect & start
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, { dbName: 'MyDatabase' })
  .then(() => {
    console.log('✅ MongoDB connected (db: MyDatabase)');
    app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
