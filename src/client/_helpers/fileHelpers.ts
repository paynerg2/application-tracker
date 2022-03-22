/**
 * Helper function for converting an image URL to a the format used to store the image in the database.
 * @param url URL of the image to read in
 * @param callback Function to use the result, i.e. to update a state value once the onloadend event fires.
 */
export const toDataURL = (url: string, callback: Function) => {
    return new Promise<Function>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(callback(reader.result));
            };

            reader.readAsDataURL(xhr.response);
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
};

/**
 * Helper function for converting a local image to the format used to store the image in the database.
 * @param file File loaded from the local system
 * @param callback Function to use the result, i.e. to update a state value once the onloadend event fires.
 * @returns
 */
export const localFileToDataURL = (file: Blob, callback: Function) => {
    return new Promise<Function>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(callback(reader.result));
        };
        reader.readAsDataURL(file);
    });
};
