export const addDays = (date, days) => {
    const d = new Date(date);
    return d.setDate(d.getDate() + days);
};

export const getDates = (startDate, stopDate = new Date()) => {
    let dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
};

export const initCounts = arr => {
    let count = {};
    const input = arr.map(a => new Date(a));
    const minDate = new Date(Math.min.apply(null, input));
    const dateArray = getDates(minDate);

    for (let i = 0; i < dateArray.length; i++) {
        const entry = dateArray[i].toLocaleDateString('en-US');
        count[entry] = 0;
    }
    return count;
};

export const getFrequencyFromArray = (arr, initialCounts = {}) => {
    let counts = initialCounts;
    for (let i = 0; i < arr.length; i++) {
        let entry = arr[i];
        counts[entry] = counts[entry] ? counts[entry] + 1 : 1;
    }
    return counts;
};
