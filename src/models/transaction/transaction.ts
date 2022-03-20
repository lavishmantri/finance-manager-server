import mongoose from 'mongoose';

enum TransactionType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
}

enum TransactionMode {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  EWallet = 'E_WALLET',
  Neft = 'NEFT',
  PayLater = 'PAY_LATER',
  Rtgs = 'RTGS',
  Upi = 'UPI',
}

const transactionSchema = new mongoose.Schema({
  description: String,
  mode: TransactionType,
  type: TransactionMode,
  fromUser: String,
});

export const transactionModel = new mongoose.Model(
  'Transaction',
  transactionSchema,
);
