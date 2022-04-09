import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  findLoanAccountById,
  LoanAccount,
  LoanAccountModel,
} from '../account/loan-account/loan-account';
import {
  findGuarantorById,
  GuarantorAccount,
  GuarantorAccountModel,
} from '../account/guarantor-account/guarantor-account';

enum LoanBasis {
  BASIS_1 = 'BASIS_1',
  BASIS_2 = 'BASIS_2',
}

interface Loan extends Document {
  id: ObjectId;
  interestRate: number;
  principal: number;
  estimatedDuration?: number;
  startingDate?: Date;
  notes: string;
  basis: LoanBasis;
  tags: string[];
}

interface LoanWithRelations extends Loan {
  loanAccount: ObjectId;
  guarantor: ObjectId;
}

interface LoanWithAccountAndGuarantor extends Loan {
  loanAccount: LoanAccount;
  guarantor?: GuarantorAccount;
}

const loanSchema = new mongoose.Schema<LoanWithRelations>({
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
  loanAccount: { type: ObjectId, ref: LoanAccountModel },
  notes: String,
  guarantor: { type: ObjectId, ref: GuarantorAccountModel },
  basis: {
    type: String,
    enum: LoanBasis,
    required: true,
  },
  tags: [String],
});

export const LoanModel = mongoose.model<LoanWithRelations>('Loan', loanSchema);

export const fetchLoans = async (): Promise<LoanWithAccountAndGuarantor[]> => {
  const loans = await LoanModel.find({})
    .populate<{ loanAccount: LoanAccount }>('loanAccount')
    .populate<{ guarantor: GuarantorAccount }>('guarantor')
    .exec();

  // return loans;
  return loans.map(loan => ({
    ...loan.toObject({ virtuals: true }),
  })) as unknown[] as LoanWithAccountAndGuarantor[];
  // return loans.map(loan => ({
  //   id: loan.get('id'),
  //   interestRate: loan.get('interestRate'),
  //   principal: loan.get('principal'),
  //   loanAccount: loan.get('loanAccount'),
  //   basis: loan.get('basis'),
  //   date: loan.get('startingDate'),
  //   notes: loan.get('notes'),
  //   guarantor: loan.get('guarantor'),
  //   tags: loan.get('tags'),
  // }));
};

export const insertLoan = async (
  interestRate: number,
  principal: number,
  loanAccount: string,
  basis: LoanBasis,
  date?: string,
  notes?: string,
  guarantor?: string,
  tags?: string[],
) => {
  const loanAccountInstance = await findLoanAccountById(loanAccount);
  let guarantorAccountInstance;

  if (guarantor) {
    guarantorAccountInstance = await findGuarantorById(guarantor);
  }

  const loan = await new LoanModel({
    interestRate,
    principal,
    loanAccount: loanAccountInstance._id,
    basis,
    startingDate: date,
    notes,
    guarantor: guarantorAccountInstance?._id,
    tags,
  }).save();

  return {
    ...loan.toObject({ virtuals: true }),
    loanAccount: loanAccountInstance,
    guarantor: guarantorAccountInstance,
  };
};
