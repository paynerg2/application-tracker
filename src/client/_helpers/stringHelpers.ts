/**
 * Helper function for use with useWindow hook to get a numeric value from the returned window size
 * @param size A value in pixels (e.g. 100px)
 * @returns The numeric value of the pixels. (e.g 100)
 */
export const pixelStringToNumber = (size: string): number => {
    const _size = size.replace('px', '');
    return parseInt(_size);
};
