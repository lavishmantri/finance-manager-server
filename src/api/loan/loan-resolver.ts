import {
  Loan,
  MutationResolvers,
  QueryResolvers,
} from '../../generated/graphql-types';
import { fetchLoanById, fetchLoans, insertLoan } from '../../models/loan/loan';
import { getLoanDetails } from '../../services/loan/loan-details';
import { computeLoanAggregations } from '../../services/loan/loan-aggregations';

const queryResolvers: QueryResolvers = {
  getLoansList: async () => {
    const loans = await fetchLoans();
    console.log('getLoansList resolver  ', loans);

    const ls = loans.map(l => ({
      ...l,
      id: l.id.toString(),
      date: l.startingDate,
      guarantor: l.guarantor
        ? {
            name: l.guarantor?.name,
            id: l.guarantor?.id.toString(),
          }
        : undefined,
    }));

    return {
      loans: ls,
    };
  },
  getLoansListAggregationDetails: async () => {
    const loans = await fetchLoans();
    const ls = loans.map(l => ({
      ...l,
      id: l.id.toString(),
      date: l.startingDate,
      guarantor: l.guarantor
        ? {
            name: l.guarantor?.name,
            id: l.guarantor?.id.toString(),
          }
        : undefined,
    }));
    return computeLoanAggregations(loans);
  },
  getLoanDetails: async (parent, { loanId }) => {
    return getLoanDetails(loanId);
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
      tags,
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
      tags,
    );

    console.log('Loan created:: ', loan);
    return {
      ...loan,
      id: loan.id.toString(),
      guarantor: loan.guarantor
        ? {
            id: loan.guarantor?.id,
            name: loan.guarantor?.name,
          }
        : undefined,
    };
  },
};

export const loanResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
