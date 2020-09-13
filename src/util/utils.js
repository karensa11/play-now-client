

export function appendLine(text, textToAppend) {
    return text + textToAppend + "\n";
}
export function appendText(text, textToAppend) {
    return text + " " + textToAppend;
}

export function setTitle(toAppend) {
    document.title =
        toAppend ?
            toAppend + " | Play Now" :
            "Play Now";
}

export function validateValueWithRegex(regex, value) {
    return regex.test(value);
}

export function calculateLikesRate(gameData) {
    return gameData.reviews === 0 ? 0 : Math.round(gameData.likes / gameData.reviews * 100);
}
