import mongoose from 'mongoose';

export interface BankAccount extends Document {
  accountNumber: number;
}
