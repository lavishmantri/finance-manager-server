import uuid from 'uuid';
import {
  MutationResolvers,
  QueryResolvers,
} from '../../../generated/graphql-types';
import {
  fetchLoanAccounts,
  insertLoanAccount,
} from '../../../models/account/loan-account/loan-account';

const loanAccountQueryResolver: QueryResolvers = {
  getLoanAccounts: async () => {
    console.log('get loan accounts resolver');

    const loanAccounts = await fetchLoanAccounts();

    return loanAccounts;
  },
};

const loanAccountMutationResolver: MutationResolvers = {
  addLoanAccount: async (parent, { name, description }) => {
    let loan;
    try {
      loan = await insertLoanAccount(name, description);
    } catch (e) {
      throw e;
    }

    console.log('Loan account resolved  ', loan);

    return loan;
  },
};

export const loanAccountResolver = {
  Query: loanAccountQueryResolver,
  Mutation: loanAccountMutationResolver,
};
