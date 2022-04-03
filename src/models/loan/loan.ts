import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  findLoanAccountById,
  LoanAccount,
} from '../account/loan-account/loan-account';
import {
  findGuarantorById,
  GuarantorAccount,
} from '../account/guarantor-account/guarantor-account';

enum LoanBasis {
  BASIS_1 = 'BASIS_1',
  BASIS_2 = 'BASIS_2',
}

const loanSchema = new mongoose.Schema({
  interestRate: {
    type: Number,
    required: true,
  },
  principal: {
    type: Number,
    required: true,
  },
  estimatedDuration: Number,
  startingDate: Date,
  loanAccount: { type: ObjectId, ref: LoanAccount },
  notes: String,
  guarantor: { type: ObjectId, ref: GuarantorAccount },
  basis: {
    type: String,
    enum: LoanBasis,
    required: true,
  },
});

export const LoanModel = mongoose.model('Loan', loanSchema);

export const fetchLoans = async () => {
  return await LoanModel.find({});
};

export const insertLoan = async (
  interestRate: number,
  principal: number,
  loanAccount: string,
  basis: LoanBasis,
  date?: string,
  notes?: string,
  guarantor?: string,
) => {
  const loanAccountInstance = await findLoanAccountById(loanAccount);
  const guarantorAccountInstance = await findGuarantorById(guarantor);

  return new LoanModel({
    interestRate,
    principal,
    loanAccount: loanAccountInstance._id,
    basis,
    startingDate: date,
    notes,
    guarantor: guarantorAccountInstance._id,
  }).save();
};
