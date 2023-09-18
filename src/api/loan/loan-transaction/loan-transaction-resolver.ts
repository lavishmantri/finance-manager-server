import {
  APIStatus,
  LoanTransaction,
  MutationResolvers,
  QueryResolvers,
} from '../../../generated/graphql-types';
import {
  fetchLoanTransactions,
  insertLoanTransaction,
  LoanTransaction as LoanTransactionModel,
} from '../../../models/transaction/loan-transaction/loan-transaction';

const convertLoanTransactionDocument = (
  loanTransaction: LoanTransactionModel,
): LoanTransaction => {
  return {
    id: loanTransaction.id.toString(),
    loanId: loanTransaction.loanId.toString(),
    amount: loanTransaction.amount,
    type: loanTransaction.type,
    date: loanTransaction.date,
    notes: loanTransaction.notes,
  };
};

const convertLoanTransactionDocuments = (
  loanTransactions: LoanTransactionModel[],
): LoanTransaction[] => {
  return loanTransactions.map(convertLoanTransactionDocument);
};

const queryResolvers: QueryResolvers = {
  getLoanTransactions: async (parent, { loanId }) => {
    const loanTransactionDocuments = await fetchLoanTransactions(loanId);
    return convertLoanTransactionDocuments(loanTransactionDocuments);
  },
};

const mutationResolvers: MutationResolvers = {
  createLoanTransaction: async (
    parent,
    { loanId, amount, type, notes, date },
  ) => {
    const loanTransaction = await insertLoanTransaction(
      loanId,
      amount,
      date,
      type,
      notes,
    );

    console.log('LoanTransaction created: ', loanTransaction);
    return {
      status: APIStatus.SUCCESS,
      loanTransaction: convertLoanTransactionDocument(loanTransaction),
    };
  },
};

export const loanTransactionResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
