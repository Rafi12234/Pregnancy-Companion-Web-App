import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MyDatabase';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({}); // Clear existing users
  const password = await bcrypt.hash('demo1234', 10);
  await User.create({
    email: 'demo@example.com',
    phone: '0000000000',
    password
  });
  console.log('Demo user inserted: demo@example.com / demo1234');
  mongoose.disconnect();
}

seed();
