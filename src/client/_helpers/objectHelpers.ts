export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}

export const isEmpty = (obj: any): boolean => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
