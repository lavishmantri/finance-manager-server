import { DateTime, Interval } from 'luxon';
import {
  fetchLoanById,
  LoanWithAccountAndGuarantor,
  LoanWithRelations,
} from '../../models/loan/loan';
import { Decimal } from 'decimal.js';
import { Loan } from '../../generated/graphql-types';

/**
 *
 * @param interestRate - yearly interest rate
 * @param principal
 * @param from
 * @param till
 * @returns
 */
export const calculateSimpleInterest = (
  interestRate: number,
  principal: number,
  start: Date,
  end: Date,
): number => {
  const interval = Interval.fromDateTimes(start, end);
  const intervalDays = interval.length('days');
  const interestRateByDay = new Decimal(interestRate).dividedBy(365);

  return interestRateByDay
    .mul(principal)
    .mul(intervalDays)
    .dividedBy(100)
    .toNumber();
};

/**
 *
 * @param interestRate - monthly interest rate
 * @param principal - amount of loan
 * @param start - start date
 * @param end - end Date
 * @returns - interest amount
 */
export const calculateSimpleInterestByMonthlyRate = (
  interestRate: number,
  principal: number,
  start: Date,
  end: Date,
) => {
  const interval = Interval.fromDateTimes(start, end);
  const intervalDays = interval.length('days');
  const interestRateByDay = new Decimal(interestRate).dividedBy(30);

  return interestRateByDay
    .mul(principal)
    .mul(intervalDays)
    .dividedBy(100)
    .toNumber();
};

const convertLoanModelToplain = (loan: LoanWithAccountAndGuarantor): Loan => {
  return {
    ...loan,
    id: loan.id.toString(),
    guarantor: loan.guarantor
      ? {
          id: loan.guarantor?.id,
          name: loan.guarantor?.name,
        }
      : undefined,
  };
};

const calculateInterestEarnedByLoan = (loan: Loan) => {
  return calculateSimpleInterest(loan.interestRate, loan.principal, new Date(loan.date), new Date())
}

export const getLoanDetails = async (loanId: string) => {
  const loan = await fetchLoanById(loanId);

  return {
    loan: convertLoanModelToplain(loan),
    interestEarned: calculateSimpleInterest(loan.)
  };
};
