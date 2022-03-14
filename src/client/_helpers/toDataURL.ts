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

export const localFileToDataURL = (file: Blob, callback: Function) => {
    return new Promise<Function>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(callback(reader.result));
        };
        reader.readAsDataURL(file);
    });
};
