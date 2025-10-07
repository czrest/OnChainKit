


export const convertSnakeToCamelCase = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertSnakeToCamelCase(item));
    }

    if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
            const camelCaseKey = toCamelCase(key);
            acc[camelCaseKey] = convertSnakeToCamelCase(obj[key]);
            return acc;
        }, {});
    }

    return obj;
};

const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
