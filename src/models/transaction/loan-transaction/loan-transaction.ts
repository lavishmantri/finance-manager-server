import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  insertLoan,
  LoanAccountModel,
} from '../../account/loan-account/loan-account';
import { GuarantorAccount } from '../../account/guarantor-account/guarantor-account';

enum LoanTransactionType {
  PRIMARY_DEBIT = 'PRIMARY_DEBIT',
  INTEREST_PAYMENT = 'INTEREST_PAYMENT',
  PRINCIPAL_REPAYMENT = 'PRINCIPAL_REPAYMENT',
}

const loanTransactionSchema = new mongoose.Schema({
  to: { type: ObjectId, ref: LoanAccountModel },
  amount: Number,
  interest: Number,
  estimatedDuration: Number,
  type: {
    type: String,
    enum: LoanTransactionType,
    default: LoanTransactionType.PRIMARY_DEBIT,
  },
  notes: String,
  startDate: Date,
  guarantor: { type: ObjectId, ref: GuarantorAccount },
});

export const LoanTransactionModel = mongoose.model(
  'LoanTransaction',
  loanTransactionSchema,
);

export const insertManyLoanTransactions = async (records: string[][]) => {
  await records.forEach(async record => {
    let insertedLoan;
    let loan;

    try {
      insertedLoan = await insertLoan(record[0]);
      loan = insertedLoan.toObject();
    } catch (e) {
      console.error('Error inserting Loan:: ', e);
    }

    let guarantor;
    if (record[4]) {
      const insertedGuarantor = await insertLoan(record[4]);
      guarantor = insertedGuarantor.toObject();
    }

    await new LoanTransactionModel({
      to: loan._id,
      amount: record[1] ? Number.parseInt(record[1]) : 0,
      startDate: new Date(record[2]),
      type: LoanTransactionType.PRIMARY_DEBIT,
      guarantor: guarantor?._id,
      notes: record[5],
      interest: Number.parseFloat(record[7]),
    }).save();
  });
};
