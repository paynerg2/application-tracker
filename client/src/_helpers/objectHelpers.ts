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

export const merge = <O extends object>(object: O, ...sources: O[]): O => {
    for (let source of sources) {
        for (let key in source) {
            if (source[key] == null) continue;
            object[key] = replaceValue(object[key], source[key]);
        }
    }
    return object;
};

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

const isObject = (object: any) => {
    return object && object.constructor === 'Object';
};
