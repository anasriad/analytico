import Papa from "papaparse";

export const getCSVHeaders = (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            preview: 1, 
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const headers = results.meta.fields;
                if (headers) {
                    resolve(headers);
                } else {
                    reject("No headers found.");
                }
            },
            error: (error) => reject(error),
        });
    });
};
