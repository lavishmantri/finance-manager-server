import { MutationResolvers } from '../../generated/graphql-types';
import {
  calculateSimpleInterest,
  calculateSimpleInterestByMonthlyRate,
} from '../../services/loan/loan-details';

export const mutationResolvers: MutationResolvers = {
  getSimpleInterest: async (
    parent,
    { interestRate, principal, start, end },
  ) => {
    return {
      amount: calculateSimpleInterest(interestRate, principal, start, end),
    };
  },

  getInterestByMonthlyRate: async (
    parent,
    { interestRate, principal, start, end },
  ) => {
    return {
      amount: calculateSimpleInterestByMonthlyRate(
        interestRate,
        principal,
        start,
        end,
      ),
    };
  },
};

export const calculatorsResolver = {
  Mutation: mutationResolvers,
};
