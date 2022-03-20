import mongoose from 'mongoose';

const connectdb = async () => {
  await mongoose.connect('mongodb://localhost:27017/finance-manager');
};
