import mongoose from 'mongoose';

export interface LoanAccount extends Document {
  id: string;
  name: string;
  description?: string;
}

const loanAccountSchema = new mongoose.Schema<LoanAccount>({
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

export const findLoanAccountById = (id: string) => {
  return LoanAccountModel.findById(id).exec();
};

export const insertLoanAccount = async (
  name: string,
  description: string = '',
) => {
  const loanAccount = await new LoanAccountModel({
    name,
    description,
  }).save();

  return loanAccount.toObject({ virtuals: true });
};
