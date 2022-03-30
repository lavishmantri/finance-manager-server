import mongoose from 'mongoose';

const loanAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

export const LoanAccountModel = mongoose.model(
  'LoanAccount',
  loanAccountSchema,
);

export const fetchLoanAccounts = async () => {
  return await LoanAccountModel.find({});
};

export const insertLoan = (name: string, description: string = '') => {
  return new LoanAccountModel({
    name,
    description,
  }).save();
};
