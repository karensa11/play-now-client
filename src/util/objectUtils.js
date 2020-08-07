export function objectNotEmpty(object) {
    let result = false;
    Object.keys(object).forEach((key) => {
        if (object[key]) {
            result = true;
        }
    });
    return result;
}

export function stringEmpty(string) {
    return !string || string === "";
}

export function stringNotEmpty(string) {
    return string && string !== "";
}

export function eitherStringIsEmpty(strings) {
    let isEmpty = false;
    strings.forEach(string => {
        if(stringEmpty(string)) {
            isEmpty = true;
        }
    });
    return isEmpty;
}

export function createIndexArr(start, end) {
    const result = [];
    for(let i = start;i < end;i++) {
        result.push(i);
    }
    return result;
}