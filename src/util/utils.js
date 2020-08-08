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

