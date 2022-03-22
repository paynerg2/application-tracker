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
