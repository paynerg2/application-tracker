/**
 *
 * @param word
 * @returns The given word, with the first letter capitalized.
 */
export const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
};
