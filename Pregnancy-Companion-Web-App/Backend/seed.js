import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pregnancy_companion';

const users = [
  {
    email: 'test1@example.com',
    phone: '1234567890',
    password: await bcrypt.hash('password1', 10)
  },
  {
    email: 'test2@example.com',
    phone: '0987654321',
    password: await bcrypt.hash('password2', 10)
  }
];

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({}); // Clear existing users
  await User.insertMany(users);
  console.log('Dummy users inserted');
  mongoose.disconnect();
}

seed();
