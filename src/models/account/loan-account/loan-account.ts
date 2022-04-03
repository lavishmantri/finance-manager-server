import mongoose from 'mongoose';

const loanAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

export const LoanAccount = mongoose.model('LoanAccount', loanAccountSchema);

export const fetchLoanAccounts = async () => {
  return await LoanAccount.find({});
};

export const findLoanAccountById = (id: string) => {
  return LoanAccount.findById(id).exec();
};

export const insertLoanAccount = (name: string, description: string = '') => {
  const loanAccount = new LoanAccount({
    name,
    description,
  }).save();

  return loanAccount.toObject({ virtuals: true });
};
