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
import {
  calculateSimpleInterest,
  calculateSimpleInterestPerYear,
} from './loan-details';
import { convertLoanModelToplain } from './loan-utils';

export const computeAbsoluteReturnsForLoans = (
  loans: LoanWithAccountAndGuarantor[],
) => {
  return 18;
};

export const computeAvgInterestRate = (
  loans: LoanWithAccountAndGuarantor[],
) => {
  const netPrincipal = loans.reduce(
    (prevValue: number, currValue: LoanWithAccountAndGuarantor) => {
      prevValue = prevValue + currValue.principal;
      return prevValue;
    },
    0,
  );

  let sum = 0;
  let totalInterestAmount = 0;
  loans.forEach(loan => {
    sum += loan.principal;
    totalInterestAmount += loan.principal * loan.interestRate;
  });

  return totalInterestAmount / netPrincipal;
};

export const computeExpectedPostClosureXIRR = () => 0;

export const computeNetXIRR = () => {
  return 0;
};

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
    netXIRR: computeNetXIRR(),
    expectedPostClosureXIRR: computeExpectedPostClosureXIRR(),
    absoluteReturns: computeAbsoluteReturnsForLoans(loans),
    averageInterestRate: computeAvgInterestRate(loans),
  };
};
