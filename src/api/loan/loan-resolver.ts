import {
  Loan,
  MutationResolvers,
  QueryResolvers,
} from '../../generated/graphql-types';
import { fetchLoanById, fetchLoans, insertLoan } from '../../models/loan/loan';

const queryResolvers: QueryResolvers = {
  getLoansList: async () => {
    const loans = await fetchLoans();
    console.log('getLoansList resolver  ', loans);

    // return loans;
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

    // console.log('loans list resolver transformed:: ', ls);

    return ls;
  },
  getLoanDetails: async (parent, { loanId }) => {
    const loan = await fetchLoanById(loanId);
    return {
      loan: {
        ...loan,
        id: loan.id.toString(),
        date: loan.startingDate,
        guarantor: loan.guarantor
          ? {
              name: loan.guarantor?.name,
              id: loan.guarantor?.id.toString(),
            }
          : undefined,
      },
      totalInterestEarned: 1,
      cagr: 1,
      absoluteReturn: 1,
      status: 'READy',
    };
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
      guarantor: {
        id: loan.guarantor?.id,
        name: loan.guarantor?.name,
      },
    };
  },
};

export const loanResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
