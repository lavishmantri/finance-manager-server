import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
  name: String,
});

export const bankModel = new mongoose.Model('BankModel', bankSchema);
