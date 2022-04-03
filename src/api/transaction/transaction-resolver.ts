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
        type: TransactionType.CREDIT,
        mode: TransactionMode.NEFT,
      },
    ];
  },
};

export const transactionResolver = {
  Query: queryResolvers,
};
