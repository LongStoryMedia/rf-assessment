import moment from 'moment';
/**
* A student loan that accrues interest over time.
* pr
*/
export interface Loan {
    /** The current decimal principal of the balance in USD. */
    principal: string;
    /**
    * APR interest rate for loan.
    *
    * Expressed per-unit (e.g: 6.3% is 0.063).
    */
    interestRate: string;
    /**
    * Minimum payment required monthly for the loan.
    *
    * This establishes the term left in the loan.
    */
    minimumPayment: string;
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
    const loanAndPrincipals = loans.map((loan) => ({
        loan: loan,
        principal: [{
            date: currentDate.valueOf(),
            principal: parseFloat(loan.principal),
        }],
    }));
    // Prioritize payments by interest rate.
    loanAndPrincipals.sort((left, right) => {
        return (latestPrincipal(left).principal
            - latestPrincipal(right).principal);
    });
    const currentDate = moment().add(1, 'month');
    // Iterate while loans have balance.
    while (hasBalance(loanAndPrincipals)) {
        // Add new principal value to modify below.
        for (const loanAndPrincipal of loanAndPrincipals) {
            loanAndPrincipal.principal.push({
                date: currentDate.valueOf(),
                principal: latestPrincipal(loanAndPrincipal).principal,
            });
        }
        accrueInterest(loanAndPrincipals);
        let residualPayment = monthlyPayment;
        // Make minimum required payments.
        for (const loanAndPrincipal of loanAndPrincipals) {
            const minPayment = Math.min(
                residualPayment,
                parseFloat(loanAndPrincipal.loan.minimumPayment));
            residualPayment -= minPayment;
            latestPrincipal(loanAndPrincipal).principal -= minPayment;
        }
        // Pay remaining monthly payment to the highest interest rate loans.
        for (const loanAndPrincipal of loanAndPrincipals) {
            const extraPayment = Math.min(
                residualPayment, latestPrincipal(loanAndPrincipal).principal);
            residualPayment -= extraPayment;
            latestPrincipal(loanAndPrincipal).principal -= extraPayment;
        }
        currentDate.add(1, 'month');
    }
    return loanAndPrincipals;
}
/**
* Convenience to check if any loan has a principal more than $0.
*/
function hasBalance(loanAndPrincipals: LoanAndPrincipal[]): boolean {
    for (let loanAndPrincipal of loanAndPrincipals) {
        const last = loanAndPrincipal.principal.length - 1;
        if (loanAndPrincipal.principal[last].principal > 0) {
            return true;
        }
    }
    return false;
}
/**
* Convenience to retrieve last principal pair in the array of principals.
*/
function latestPrincipal(loanAndPrincipal: LoanAndPrincipal): DateAndPrincipal {
    return loanAndPrincipal.principal[loanAndPrincipal.principal.length - 1];
}
/**
* Adds one month of interest to the principals for each loan.
*
* @param loanAndPrincipals Loan and principal pairs to accrue interest on.
*/
function accrueInterest(loanAndPrincipals: LoanAndPrincipal[]) {
    for (const loanAndPrincipal of loanAndPrincipals) {
        latestPrincipal(loanAndPrincipal).principal *=
            1.0 + parseFloat(loanAndPrincipal.loan.interestRate) / 12;
    }
}