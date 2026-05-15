import mongoose from 'mongoose';

export default async function initializeDatabaseConnection(db: string | undefined): Promise<boolean> {
  if (typeof db !== 'string') throw Error('Database initilization failed. Malformed connection string provided.');
  await mongoose.connect(db);
  return true;
}
