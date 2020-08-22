const createHistory = require("history").createBrowserHistory;

export function navigateToAndRefresh(history, url) {
    history.push(url);
    const historyBack = createHistory();
    historyBack.go(0);
}

export function goToHomePage(history) {
    history.push("/");
}

export function goToCategory(history, categoryData) {
    history.push(`/category/${categoryData.id}`);
}
