import {
  MutationResolvers,
  QueryResolvers,
} from '../../generated/graphql-types';
import { fetchLoans, insertLoan } from '../../models/loan/loan';

const queryResolvers: QueryResolvers = {
  getLoansList: () => {
    return fetchLoans();
  },
};

const mutationResolvers: MutationResolvers = {
  createLoan: async (
    parent,
    {
      interestRate,
      principal,
      loanAccount,
      basis,
      duration,
      date,
      notes,
      guarantor,
    },
  ) => {
    const loan = await insertLoan(
      interestRate,
      principal,
      loanAccount,
      basis,
      date,
      notes,
      guarantor,
    );

    return loan.toObject();
  },
};

export const loanResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
