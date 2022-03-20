import { QueryResolvers } from '../../generated/graphql-types';

const queryResolvers: QueryResolvers = {
  getTransactionList: () => {
    console.log('transaction list resolver');
    return [];
  },
};

export const transactionResolver = {
  Query: queryResolvers,
};
