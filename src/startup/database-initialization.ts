import mongoose from 'mongoose';

export default async function initializeDatabaseConnection(db) {
  await mongoose.connect(db);
}
