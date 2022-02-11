export const getPaddedMonth = (date) => {
    return (1 + date.getMonth()).toString().padStart(2, '0');
};

export const getMonthName = (date) => {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return months[date.getMonth()];
};

export const getPaddedDay = (date) => {
    return date.getDate().toString().padStart(2, '0');
};

export const getDateFormattedForInput = (date) => {
    let year = date.getFullYear();
    let month = getPaddedMonth(date);
    let day = getPaddedDay(date);

    return year + '-' + month + '-' + day;
};

export const getDateFormattedForDatetimeLocalInput = (date) =>
    new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000)
        .toISOString()
        .slice(0, 19);

export const getTime = (dateTime) => {
    // Returns correctly formatted time, removing any leading zeros
    // Trim to remove leading space first
    let time = getDateFormattedForList(dateTime).split(',')[2].trim().replace(/^0+/, '');
    return time;
};

export const getDateTimeFormattedForInput = (dateTime) => {
    var date = new Date(dateTime);
    // Slice to remove trailing Z & make compatible with datetime-local
    // HTML5 element
    var isoDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, -1);
    return isoDate;
};

export const getTimeZoneCorrectedDate = (value) => {
    let valueAsDate = new Date(value);
    valueAsDate.setMinutes(valueAsDate.getMinutes() + valueAsDate.getTimezoneOffset());
    return valueAsDate;
};

export const getDateFormattedForList = (value) => {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const valueAsDate = new Date(value);
    return valueAsDate.toLocaleDateString('en-US', options);
};

export const getSimpleFormattedDate = (date) => {
    if (date) {
        const d = new Date(date);
        return d.toLocaleDateString('en-US');
    }
    return '';
};
