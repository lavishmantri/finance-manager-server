import mongoose from 'mongoose';

const GuarantorAccountSchema = new mongoose.Schema({
  name: String,
});

export const GuarantorAccount = mongoose.model(
  'GuarantorAccount',
  GuarantorAccountSchema,
);
