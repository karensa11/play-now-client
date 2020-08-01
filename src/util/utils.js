export function appendLine(text, textToAppend) {
    return text + textToAppend + "\n";
}

export function setTitle(toAppend: string) {
    document.title =
        toAppend ?
            "Play Now | " + toAppend :
            "Play Now";
}
