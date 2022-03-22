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
 * Helper function designed to convert a frequency map into the format expected
 * as input for Google Charts.
 * @param data Data should be the same the return type of getFrequencyFromArray.
 * An object of the form {[string] : number}
 * @returns An array whose entires are length 2 arrays of the form ["key", "value"]
 */
export const formatFrequencyMapForCharting = <T extends string | number | symbol>(
    data: Record<T, number>
) => {
    let frequencyData = [];
    for (const [key, value] of Object.entries(data)) {
        frequencyData.push([key, value as number]);
    }
    return frequencyData;
};

/**
 * Helper function for transforming an array of values into frequency data ready to be used in a Google Chart
 * @param arr An array of elements with values suitable to be object keys
 * @returns An array whose entires are length 2 arrays of the form ["key", "value"]
 */
export const getFrequencyMapForCharting = <T extends string | number | symbol>(arr: T[]) => {
    const frequencyMap = getFrequencyFromArray(arr);
    return formatFrequencyMapForCharting(frequencyMap);
};
