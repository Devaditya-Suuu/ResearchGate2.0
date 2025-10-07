import mongoose from 'mongoose';

export async function dbConnect() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
  }
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  return mongoose.connect(process.env.MONGODB_URI);
}
