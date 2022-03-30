import {
  QueryResolvers,
  TransactionMode,
  TransactionType,
} from '../../generated/graphql-types';

const queryResolvers: QueryResolvers = {
  getTransactionList: () => {
    console.log('transaction list resolver');
    return [
      {
        id: 'abcd_some_uuid',
        description: 'This is the first mocked transaction',
        type: TransactionType.Credit,
        mode: TransactionMode.Neft,
      },
    ];
  },
};

export const transactionResolver = {
  Query: queryResolvers,
};
