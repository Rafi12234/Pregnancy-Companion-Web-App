import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import aiRoutes from './routes/ai.js'; // public AI endpoint
import profileRoutes from './routes/profile.js';  
import appointmentRoutes from './routes/appointments.js';

dotenv.config();

const app = express();

/* ---------- Core middleware ---------- */
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '1mb' })); // must be before routes

/* ---------- Health check ---------- */
app.get('/', (_req, res) => res.send('Pregnancy Companion API is running.'));

/* ---------- Routes ---------- */
app.use('/api/auth', authRoutes);           // keep if you still use login elsewhere
app.use('/api/dashboard', dashboardRoutes); // your data persistence
app.use('/api/ai', aiRoutes);               // <-- PUBLIC Gemini chat
app.use('/api/profile', profileRoutes);
app.use('/api/appointments', appointmentRoutes); 

/* ---------- DB & Server ---------- */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB || 'MyDatabase';

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing in .env');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connect(MONGO_URI, { dbName: DB_NAME })
  .then(() => {
    console.log(`✅ MongoDB connected (db: ${DB_NAME})`);
    app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

/* ---------- Optional error handler ---------- */
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});
