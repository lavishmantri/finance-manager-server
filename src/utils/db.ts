import mongoose from 'mongoose';

export const connectdb = async () => {
  await mongoose.connect('mongodb://localhost:27017/finance-manager');
};
