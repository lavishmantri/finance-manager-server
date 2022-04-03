import mongoose from 'mongoose';

export const connectdb = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL);
};
