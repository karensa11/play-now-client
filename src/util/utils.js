const createHistory = require("history").createBrowserHistory;

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

export function navigateToAndRefresh(history, url) {
    history.push(url);
    const historyBack = createHistory();
    historyBack.go(0);
}

export function extractRetrieveResultsFromFirestore(querySnapshot) {
    const result = [];
    querySnapshot.forEach(item => result.push(item.data()));
    return result;
}
