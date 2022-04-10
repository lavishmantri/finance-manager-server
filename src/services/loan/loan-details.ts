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

  // We will have to consider 30 day per month in order to calculate monthly rate interest
  // TODO:: calculate interest per month, then add pro-rated rate for last month days
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
    date: loan.startingDate,
    guarantor: loan.guarantor
      ? {
          id: loan.guarantor?.id,
          name: loan.guarantor?.name,
        }
      : undefined,
  };
};

const calculateInterestEarnedByLoan = (loan: Loan) => {
  return calculateSimpleInterest(
    loan.interestRate,
    loan.principal,
    new Date(loan.date),
    new Date(),
  );
};

export const getLoanDetails = async (loanId: string) => {
  const loan = await fetchLoanById(loanId);
  const transformedLoan = convertLoanModelToplain(loan);

  return {
    loan: transformedLoan,
    totalInterestEarned: calculateInterestEarnedByLoan(transformedLoan),
    cagr: 1,
    absoluteReturn: 1,
    status: 'ONGOING',
  };
};
