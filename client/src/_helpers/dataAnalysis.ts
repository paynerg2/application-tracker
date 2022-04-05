/**
 * A helper function intended for use in the ApplicationFilter component and stats page.
 * Used to determine the number of applications with each main skill listed.
 * @param arr An array of elements with values suitable to be object keys
 * @param initialCounts
 * @returns An object with keys consisting of the array values, mapping to the number of times that value occurred in the array.
 */
export const getFrequencyFromArray = <T extends string | number | symbol>(
    arr: T[],
    initialCounts: Record<T, number> = {} as Record<T, number>
) => {
    let counts = initialCounts;
    for (let i = 0; i < arr.length; i++) {
        let entry = arr[i];
        counts[entry] = counts[entry] ? counts[entry] + 1 : 1;
    }
    return counts;
};

/**
 * Formats a frequency map into the data format required for a Nivo pie chart.
 * @param data
 * @returns An array of objects of the form {id, label, value}
 */
export const formatFrequencyMapForPieChart = <T extends string | number | symbol>(
    data: Record<T, number>
) => {
    let frequencyData = [];
    for (const [key, value] of Object.entries(data)) {
        frequencyData.push({
            id: key,
            label: key,
            value: value as number,
        });
    }
    return frequencyData;
};

/**
 * Formats an array of dates into the data format required for a Nivo calendar/timerange chart.
 * @param dates
 * @returns An array of objects of the format {day, value}
 */
export const getCalendarDataFromDates = (dates: Date[]) => {
    const dateFrequencies = getFrequencyFromArray(dates.map((d) => d.toLocaleDateString('en-Us')));
    let calendarData = [];
    for (const [key, value] of Object.entries(dateFrequencies)) {
        calendarData.push({
            // format: yyyy-mm-dd
            day: new Date(key).toISOString().slice(0, 10),
            value: value,
        });
    }
    return calendarData;
};
