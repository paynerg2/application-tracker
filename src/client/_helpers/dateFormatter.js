export const getDateFormattedForInput = date => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date
        .getDate()
        .toString()
        .padStart(2, '0');

    return year + '-' + month + '-' + day;
};

export const getDateTimeFormattedForInput = dateTime => {
    let isoDateString = new Date(dateTime).toISOString();
    return isoDateString.substring(0, isoDateString.length - 1);
};

export const getTimeZoneCorrectedDate = value => {
    let valueAsDate = new Date(value);
    valueAsDate.setMinutes(
        valueAsDate.getMinutes() + valueAsDate.getTimezoneOffset()
    );
    return valueAsDate;
};

export const getDateFormattedForList = value => {
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const valueAsDate = new Date(value);
    return valueAsDate.toLocaleDateString('en-US', options);
};

export const getSimpleFormattedDate = date => {
    if (date) {
        const d = new Date(date);
        return d.toLocaleDateString('en-US');
    }
    return '';
};
