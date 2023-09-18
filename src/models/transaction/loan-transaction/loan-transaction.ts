import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  insertLoanAccount,
  LoanAccount,
  LoanAccountModel,
} from '../../account/loan-account/loan-account';

enum LoanTransactionType {
  NOT_DEFINED = 'NOT_DEFINED',
  INTEREST_PAYMENT = 'INTEREST_PAYMENT',
  PRINCIPAL_REPAYMENT = 'PRINCIPAL_REPAYMENT',
}

export interface LoanTransaction extends Document {
  id: ObjectId;
  loanId: ObjectId;
  amount: number;
  type: LoanTransactionType;
  date: string;
  notes?: string;
}

const loanTransactionSchema = new mongoose.Schema<LoanTransaction>({
  loanId: { type: ObjectId, ref: LoanAccountModel },
  amount: Number,
  type: {
    type: String,
    enum: LoanTransactionType,
    default: LoanTransactionType.INTEREST_PAYMENT,
  },
  notes: String,
  date: Date,
});

export const LoanTransactionModel = mongoose.model(
  'LoanTransaction',
  loanTransactionSchema,
);

export const fetchLoanTransactions = async (
  loanId: string,
): Promise<LoanTransaction[]> => {
  const loanTransactions = await LoanTransactionModel.find({ loanId });
  return loanTransactions;
};

export const insertLoanTransaction = async (
  loanId: string,
  amount: number,
  date: string,
  type: LoanTransactionType,
  notes,
) => {
  const loanTransaction = await new LoanTransactionModel({
    loanId,
    amount,
    date,
    type,
    notes,
  }).save();

  return loanTransaction;
};

// TODO:: need to adapt to new schema
export const insertManyLoanTransactions = async (records: string[][]) => {
  await records.forEach(async record => {
    let insertedLoan;
    let loan;

    try {
      insertedLoan = await insertLoanAccount(record[0]);
      loan = insertedLoan.toObject();
    } catch (e) {
      console.error('Error inserting Loan:: ', e);
    }

    let guarantor;
    if (record[4]) {
      const insertedGuarantor = await insertLoanAccount(record[4]);
      guarantor = insertedGuarantor;
    }

    await new LoanTransactionModel({
      to: loan._id,
      amount: record[1] ? Number.parseInt(record[1]) : 0,
      date: new Date(record[2]),
      type: LoanTransactionType.INTEREST_PAYMENT,
      notes: record[5],
    }).save();
  });
};
