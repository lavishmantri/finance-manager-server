import merge from 'lodash/merge';
import { transactionResolver } from './transaction/transaction-resolver';
import { uploadResolver } from './upload/upload-resolver';
import { loanAccountResolver } from './account/loan-account/loan-account-resolver';
import { loanResolver } from './loan/loan-resolver';
import { dateResolver } from './common/date-resolver';
import { calculatorsResolver } from './calculators/calculator-resolvers';

export const resolvers = merge(
  transactionResolver,
  uploadResolver,
  loanAccountResolver,
  loanResolver,
  dateResolver,
  calculatorsResolver,
);
