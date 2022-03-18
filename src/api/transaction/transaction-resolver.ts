import { QueryResolvers } from '../../generated/graphql-types';

const queryResolvers: QueryResolvers = {
  getTransactionList: () => [],
};

export const transactionResolver = {
  Query: queryResolvers,
};
