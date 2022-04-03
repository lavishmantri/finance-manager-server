import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  insertLoanAccount,
  LoanAccount,
} from '../../account/loan-account/loan-account';
import { GuarantorAccount } from '../../account/guarantor-account/guarantor-account';

enum LoanTransactionType {
  NOT_DEFINED = 'NOT_DEFINED',
  INTEREST_PAYMENT = 'INTEREST_PAYMENT',
  PRINCIPAL_REPAYMENT = 'PRINCIPAL_REPAYMENT',
}

const loanTransactionSchema = new mongoose.Schema({
  to: { type: ObjectId, ref: LoanAccount },
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
      guarantor = insertedGuarantor.toObject();
    }

    await new LoanTransactionModel({
      to: loan._id,
      amount: record[1] ? Number.parseInt(record[1]) : 0,
      startDate: new Date(record[2]),
      type: LoanTransactionType.INTEREST_PAYMENT,
      notes: record[5],
    }).save();
  });
};
