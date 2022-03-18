import merge from 'lodash/merge';
import { transactionResolver } from './transaction/transaction-resolver';

export const resolvers = merge(transactionResolver);
