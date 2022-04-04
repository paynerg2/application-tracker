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

export const addDays = (date: string | Date, days: number) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

type Order = 'ascending' | 'descending';
export const compareDates = (first: Date, second: Date, order: Order = 'descending') => {
    const firstDate = new Date(first);
    const secondDate = new Date(second);

    return order === 'descending'
        ? secondDate.getTime() - firstDate.getTime()
        : firstDate.getTime() - secondDate.getTime();
};
