import uuid from 'uuid';
import {
  APIStatus,
  MutationResolvers,
  QueryResolvers,
} from '../../../generated/graphql-types';
import {
  deleteLoanAccount,
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

  deleteLoanAccount: async (parent, { id }) => {
    let apiSuccess;

    try {
      apiSuccess = await deleteLoanAccount(id);
    } catch (e) {
      throw e;
    }

    return {
      status: apiSuccess ? APIStatus.SUCCESS : APIStatus.FAILURE,
    };
  },
};

export const loanAccountResolver = {
  Query: loanAccountQueryResolver,
  Mutation: loanAccountMutationResolver,
};
