import { Loan } from '../../generated/graphql-types';
import { LoanWithAccountAndGuarantor } from '../../models/loan/loan';

export const convertLoanModelToplain = (
  loan: LoanWithAccountAndGuarantor,
): Loan => {
  return {
    ...loan,
    id: loan.id.toString(),
    date: loan.startingDate,
    guarantor: loan.guarantor
      ? {
          id: loan.guarantor?.id,
          name: loan.guarantor?.name,
        }
      : undefined,
  };
};
