import {
  Loan,
  LoanComputedDetails,
  LoanDetailsResponse,
  LoanListAggregationDetails,
} from '../../generated/graphql-types';
import {
  fetchLoanById,
  LoanWithAccountAndGuarantor,
  LoanWithRelations,
} from '../../models/loan/loan';
import { convertLoanModelToplain } from './loan-utils';

export const computeAbsoluteReturnsForLoans = (
  loans: LoanWithAccountAndGuarantor[],
) => {
  return 18;
};

export const computeExpectedPostClosureCAGR = (
  loans: LoanWithAccountAndGuarantor[],
) => {
  return 15;
};

export const computeNetCAGR = () => 0;

export const computeLoanAggregations = (
  loans: LoanWithAccountAndGuarantor[],
): LoanListAggregationDetails => {
  const totalPrincipalInvested = loans.reduce(
    (sum: number, currentLoan: LoanWithAccountAndGuarantor) => {
      const transformedLoan = convertLoanModelToplain(currentLoan);
      sum = sum + transformedLoan.principal;
      return sum;
    },
    0,
  );

  return {
    totalPrincipalInvested,
    netCAGR: computeNetCAGR(),
    expectedPostClosureCAGR: computeExpectedPostClosureCAGR(loans),
    absoluteReturns: computeAbsoluteReturnsForLoans(loans),
  };
};
