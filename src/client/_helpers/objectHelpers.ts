/**
 * Determines if a specific key is in a given object
 * @param object
 * @param key
 * @returns {boolean}
 */
export function hasKey<O>(object: O, key: PropertyKey): key is keyof O {
    return key in object;
}

/**
 * Helper function to quickly check if an object is empty, so that {} can be intuitively
 * evaluated as truthy or falsy.
 * @param obj
 * @returns
 */
export const isEmpty = (obj: object): boolean => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
