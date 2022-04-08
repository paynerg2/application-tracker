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

/**
 * Mimics the Lodash _.merge() function, merging the properties of a set of objects.
 * @param object Base object to merge with
 * @param sources List of other objects to merge with the base object
 * @returns Object with the combined properties of each source.
 */
export const merge = <O extends object>(object: O, ...sources: O[]): O => {
    for (let source of sources) {
        for (let key in source) {
            if (source[key] == null) continue;
            object[key] = replaceValue(object[key], source[key]);
        }
    }
    return object;
};

/**
 * Replaces the value of a property
 * @param value
 * @param newValue
 * @returns
 */

const replaceValue = (value: any, newValue: any): any => {
    if (Array.isArray(value) && Array.isArray(newValue)) {
        return newValue.map((val, i) => {
            return replaceValue(value[i], val);
        });
    } else if (isObject(value) && isObject(newValue)) {
        return merge(value, newValue);
    }
    return newValue;
};

/**
 * Checks that the input is an object.
 * @param object
 * @returns
 */

const isObject = (object: any): boolean => {
    return object && object.constructor === 'Object';
};
