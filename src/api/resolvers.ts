import merge from 'lodash/merge';
import { transactionResolver } from './transaction/transaction-resolver';
import { uploadResolver } from './upload/upload-resolver';

export const resolvers = merge(transactionResolver, uploadResolver);
