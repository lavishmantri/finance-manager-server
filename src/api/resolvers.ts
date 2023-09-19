import merge from 'lodash/merge';
import { transactionResolver } from './transaction/transaction-resolver';
import { uploadResolver } from './upload/upload-resolver';
import { loanAccountResolver } from './account/loan-account/loan-account-resolver';
import { loanResolver } from './loan/loan-resolver';
import { loanTransactionResolver } from './loan/loan-transaction/loan-transaction-resolver';
import { dateResolver, intStringResolver } from './common/date-resolver';
import { calculatorsResolver } from './calculators/calculator-resolvers';
import { workbookResolver } from './workbook/workbook-resolver';
import { sheetResolver } from './workbook/sheet/sheet-resolver';

export const resolvers = merge(
  transactionResolver,
  uploadResolver,
  loanAccountResolver,
  loanResolver,
  loanTransactionResolver,
  dateResolver,
  calculatorsResolver,
  workbookResolver,
  sheetResolver,
  intStringResolver,
);
