import mongoose from 'mongoose';

// NOTE:: Debit cards debit from BANK ACCOUNT only. We need to make this implied

enum AccountType {
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  CREDIT_CARD = 'CREDIT_CARD_ACCOUNT',
  LOAN = 'LOAN_ACCOUNT',
  E_WALLET = 'E_WALLET',
  PAY_LATER = 'PAY_LATER',
  DEMAT = 'DEMAT',
  MUTUAL_FUND = 'MUTUAL_FUND',
  BANK_LOCKER = 'BANK_LOCKER',
  CASH = 'CASH',
}

const accountSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: AccountType,
});

export const accountModel = new mongoose.Model('Account', accountSchema);
