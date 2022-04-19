/**
 * Helper function to format JS date objects into the necessary format for HTML
 * input[type="date"] (datetime-local string)
 * @param date
 * @returns String of the form 'YYYY-MM-DDTHH:MM:SS'
 */
export const getDateFormattedForDatetimeLocalInput = (date: Date) =>
    new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
        .toISOString()
        .slice(0, 19);

/**
 * Helper function to add a given number of days to a date object.
 * @param date
 * @param days Number of days to add. Can be negative to subtract days.
 * @returns  New date object shifted by the given number of days.
 */
export const addDays = (date: string | Date, days: number): Date => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

type Order = 'ascending' | 'descending';
/**
 * Comparison function for sorting by date.
 * @param first
 * @param second
 * @param order 'descending' or 'ascending'
 * @returns A number, to be used in a sorting function. Positive result indicates the second date is 'larger.'
 */
export const compareDates = (first: Date, second: Date, order: Order = 'descending') => {
    const firstDate = new Date(first);
    const secondDate = new Date(second);

    return order === 'descending'
        ? secondDate.getTime() - firstDate.getTime()
        : firstDate.getTime() - secondDate.getTime();
};

/**
 * Formats a short date string
 * @param date
 * @returns Short date string (e.g. Jan 22)
 */
export const getShortDate = (date: Date) => {
    const _date = new Date(date);
    const month = _date.toLocaleDateString('default', { month: 'short' });
    const day = _date.getDate();

    return `${month} ${day}`;
};
