/**
 *
 * @param array
 * @returns The last element of the input array
 */
export const getLastArrayElement = <T extends unknown>(array: T[]) => {
    // Slice reduces the array to just the last element, whose content is
    // then selected by indexing.
    return array.slice(-1)[0];
};
