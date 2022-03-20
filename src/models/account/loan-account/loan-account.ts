import mongoose from 'mongoose';

const loanAccountSchema = new mongoose.Schema({
  name: String,
});

export const loanAccountModel = new mongoose.Model(
  'LoanAccount',
  loanAccountSchema,
);
