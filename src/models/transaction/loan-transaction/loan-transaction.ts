import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

enum LoanTransactionType {
  PRIMARY_DEBIT = 'PRIMARY_DEBIT',
  INTEREST_PAYMENT = 'INTEREST_PAYMENT',
  PRINCIPAL_REPAYMENT = 'PRINCIPAL_REPAYMENT',
}

const loanTransactionSchema = new mongoose.Schema({
  from: { account: ObjectId, ref: 'LoanAccount' },
  to: { account: ObjectId, ref: 'LoanAccount' },
  amount: Number,
  interest: Number,
  estimatedDuration: Number,
  type: LoanTransactionType,
  notes: String,
  startDate: Date,
  guarantor: { account: ObjectId, ref: 'GuarantorAccount' },
});

const loanTransactionModel = new mongoose.Model(
  'LoanTransaction',
  loanTransactionSchema,
);
