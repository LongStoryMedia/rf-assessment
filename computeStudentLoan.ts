import moment, { min, Moment } from 'moment';
/**
* A student loan that accrues interest over time.
* pr
*/
export interface Loan {
    /** The current decimal principal of the balance in USD. */
    principal: number;
    /**
    * APR interest rate for loan.
    *
    * Expressed per-unit (e.g: 6.3% is 0.063).
    */
    interestRate: number;
    /**
    * Minimum payment required monthly for the loan.
    *
    * This establishes the term left in the loan.
    */
    minimumPayment: number;
}
/**
* A principal at a given point in time.
*/
export interface DateAndPrincipal {
    /**
    * Unix epoch milliseconds for when a transaction is effectively
    * registered at.
    *
    * Might be binned to date in some cases.
    */
    date: number;
    /**
    * Amount transacted at dateCreated.
    *
    * Might be a summation in binning cases.
    *
    * Represented as a string to have consistent currency representation.
    */
    principal: number;
}
/**
* A pair of a loan and the principal values calculated over time.
*/
export interface LoanAndPrincipal {
    /**
    * Loan these principals are valid for.
    */
    loan: Loan;
    /**
    * Series of principal values over time.
    */
    principal: DateAndPrincipal[];
}

/**
* Given a series of loans, computes the principal over time.
*
* Optimizes payments prioritizing any excess payments to the highest
* interest rate loan.
*
* @param loans The loans to pay down.
* @param monthlyPayment The total payment available to distribute
* across loans.
*/
export function loanPrincipalsOverTime(
    loans: Loan[], monthlyPayment: number): LoanAndPrincipal[] {
    if (loans.length === 0) {
        return [];
    }
    const currentDate = moment();

    return loans.map((loan) => iteratWithBalance({
            loan,
            principal: [{
                date: currentDate.valueOf(),
                principal: loan.principal,
            }],
        }, monthlyPayment, currentDate));
}

/**
 * projects loans over time
 * @param  {LoanAndPrincipal} loanAndPrincipal 
 * @param  {number} residualPayment 
 * @return {LoanAndPrincipal} 
 */
const iteratWithBalance = (loanAndPrincipal: LoanAndPrincipal, residualPayment: number, date: Moment): LoanAndPrincipal => {
    // Iterate while loans have balance.
    const latest = latestPrincipal(loanAndPrincipal).principal;

    if (latest > 0) {
        const minPayment = Math.min(residualPayment, loanAndPrincipal.loan.minimumPayment);
        residualPayment -= minPayment;
        const extraPayment = Math.min(residualPayment, latest)
        residualPayment -= extraPayment;
        const principalWithInterest = latest * (1.0 + loanAndPrincipal.loan.interestRate / 12)
        const principalMinusMin = principalWithInterest - minPayment;
        const principal = principalMinusMin - extraPayment;
        loanAndPrincipal.principal.push({
            date: date.valueOf(),
            principal
        });
        date.add(1, 'month');
        loanAndPrincipal = iteratWithBalance(loanAndPrincipal, residualPayment, date);
    }

    return loanAndPrincipal
}

/**
* Convenience to retrieve last principal pair in the array of principals.
*/
function latestPrincipal(loanAndPrincipal: LoanAndPrincipal): DateAndPrincipal {
    return loanAndPrincipal.principal[loanAndPrincipal.principal.length - 1];
}
