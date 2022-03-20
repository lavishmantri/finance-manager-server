import mongoose from 'mongoose';

const GuarantorAccountSchema = new mongoose.Schema({
  name: String,
});

export const GuarantorAccountModel = new mongoose.Model(
  'GuarantorAccount',
  GuarantorAccountSchema,
);
